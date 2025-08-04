<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { goto } from '$app/navigation';
import { io, Socket } from 'socket.io-client';
import { user, firebaseApp } from '$lib/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, serverTimestamp, increment } from 'firebase/firestore';

let fadeIn = false;
let socket: Socket | null = null;
let connected = false;
let messages: Array<{type: 'agent' | 'user', content: string, timestamp: Date, isMarkdown?: boolean, renderedContent?: string}> = [];
let currentMessage = '';
let isAgentRunning = false;
let isWaitingForInput = false;
let connectionError = '';
let sessionId = '';
let sessionStartTime: Date | null = null;
let totalSteps = 0;
let filesCreated = 0;
let currentUser: any = null;
let introMessages = [
  "SimpleAgent is designed with the belief that AI agents don't need to be complex to be useful.",
  "By focusing on a small set of core operations and using function calling for all interactions, SimpleAgent remains easy to understand, modify, and extend.",
  "While providing advanced features like dynamic tool loading, loop detection, and intelligent execution management.",
  "📚 [View Documentation](/simple-agent/docs)"
];
let introMessageIndex = 0;
let showingIntro = true;

// Use Firebase from auth.ts (no config duplication!)
const db = getFirestore(firebaseApp);

// Subscribe to user state
user.subscribe(u => {
  currentUser = u;
});

function handleBack() {
  goto('/agent');
}

function showIntroMessages() {
  if (introMessageIndex < introMessages.length) {
    addMessage('agent', introMessages[introMessageIndex]);
    introMessageIndex++;
    
    if (introMessageIndex < introMessages.length) {
      setTimeout(showIntroMessages, 1000);
    } else {
      showingIntro = false;
    }
  }
}

// Generate anonymous ID for tracking
function generateAnonymousId(): string {
  return 'anon_' + Math.random().toString(36).substr(2, 16);
}

// Generate client ID from IP (simplified)
function generateClientId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Log anonymous usage
async function logAnonymousUsage(instruction: string) {
  try {
    const anonymousId = localStorage.getItem('anonymous_id') || generateAnonymousId();
    localStorage.setItem('anonymous_id', anonymousId);
    
    await addDoc(collection(db, 'anonymous_usage'), {
      anonymous_id: anonymousId,
      client_id: generateClientId(),
      instruction_preview: instruction.substring(0, 50),
      ip_address: 'unknown', // Would need server-side IP detection
      timestamp: serverTimestamp(),
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error('Failed to log anonymous usage:', error);
  }
}

// Log usage event with comprehensive data structure
async function logUsageEvent(eventType: string, data: any = {}) {
  try {
    const isAnonymous = !currentUser;
    await addDoc(collection(db, 'usage_logs'), {
      data: {
        step_number: totalSteps,
        session_id: sessionId,
        user_agent: navigator.userAgent,
        timestamp_local: new Date().toISOString(),
        ...data
      },
      event_type: eventType,
      is_anonymous: isAnonymous,
      session_id: sessionId,
      timestamp: serverTimestamp(),
      user_uid: currentUser?.uid || 'anonymous'
    });
    console.log(`📊 Logged ${eventType} event to usage_logs`);
  } catch (error) {
    console.error('Failed to log usage event:', error);
  }
}

// Start user session tracking
async function startSessionTracking() {
  if (!currentUser) return;
  
  try {
    sessionStartTime = new Date();
    const sessionDoc = await addDoc(collection(db, 'user_sessions'), {
      user_uid: currentUser.uid,
      session_id: sessionId,
      start_time: serverTimestamp(),
      last_activity: serverTimestamp(),
      end_time: null,
      agent_sessions: 0,
      total_steps: 0,
      files_created: 0
    });
    
    // Update user's last session
    if (currentUser.uid) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        last_session_date: serverTimestamp(),
        total_sessions: increment(1)
      });
    }
  } catch (error) {
    console.error('Failed to start session tracking:', error);
  }
}

// Update session activity
async function updateSessionActivity() {
  if (!currentUser || !sessionId) return;
  
  try {
    const sessionQuery = collection(db, 'user_sessions');
    // Would need to find the specific session doc to update
    // This is simplified - in practice you'd store the doc ID
  } catch (error) {
    console.error('Failed to update session:', error);
  }
}

function connectWebSocket() {
  try {
    // Connect to the Simple-Agent WebSocket server
    const websocketUrl = import.meta.env.VITE_SIMPLE_AGENT_WEBSOCKET_URL || 'https://simple-agent-websocket-88216607026.us-central1.run.app';
    console.log('🔌 Connecting to WebSocket:', websocketUrl);
    socket = io(websocketUrl);
    
    socket.on('connect', () => {
      connected = true;
      connectionError = '';
      console.log('✅ Connected to Simple-Agent WebSocket, socket.id:', socket?.id);
      logUsageEvent('user_connected', {
        socket_id: socket?.id,
        websocket_url: websocketUrl,
        connection_time: new Date().toISOString()
      });
    });
    
    socket.on('disconnect', () => {
      connected = false;
      console.log('❌ Disconnected from Simple-Agent WebSocket');
      logUsageEvent('user_disconnected', {
        session_duration: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0,
        total_messages: messages.length,
        disconnect_time: new Date().toISOString()
      });
    });
    
    socket.on('connected', (data: any) => {
      console.log('🎯 Session established - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      sessionId = data.session_id || socket?.id || generateClientId();
      console.log('📋 Session ID set to:', sessionId);
      startSessionTracking();
      logUsageEvent('session_established', {
        agent_version: data.agent_version,
        api_provider: data.api_provider,
        output_dir: data.output_dir,
        backend_timestamp: data.timestamp,
        session_type: 'simple_agent'
      });
    });
    
    socket.on('agent_started', (data: any) => {
      console.log('🤖 AGENT_STARTED - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      isAgentRunning = true;
      addMessage('agent', '🤖 Agent started processing your request...');
      logUsageEvent('agent_started', {
        instruction: data.instruction,
        instruction_length: data.instruction ? data.instruction.length : 0,
        max_steps: data.max_steps,
        auto_continue: data.auto_continue,
        output_dir: data.output_dir,
        backend_timestamp: data.timestamp
      });
      
      // Update user agent usage count
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        updateDoc(userRef, {
          agent_usage_count: increment(1)
        }).catch(console.error);
      }
    });
    
    socket.on('assistant_message', (data: any) => {
      console.log('💬 ASSISTANT_MESSAGE - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      addMessage('agent', data.content || data.message);
      logUsageEvent('assistant_message_sent', {
        message_content: data.content || data.message,
        message_length: (data.content || data.message || '').length,
        backend_timestamp: data.timestamp,
        message_type: 'assistant_response'
      });
    });
    
    socket.on('tool_call', (data: any) => {
      console.log('🔧 TOOL_CALL - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      const toolName = data.function_name || data.tool_name || 'unknown';
      addMessage('agent', `🔧 Using tool: ${toolName}`);
      
      logUsageEvent('tool_call_executed', {
        tool_name: toolName,
        function_name: data.function_name,
        function_args: data.function_args,
        result_length: data.result ? data.result.length : 0,
        execution_successful: !!data.result,
        tool_type: typeof data.function_args
      });
      
      // Format the result nicely
      if (data.result) {
        try {
          // Use regex to extract search results instead of full JSON parsing
          const resultStr = data.result;
          
          // Check if this looks like search results
          if (resultStr.includes("'results':") && resultStr.includes("'title':")) {
            // Extract the query
            const queryMatch = resultStr.match(/'query':\s*'([^']+)'/);
            const query = queryMatch ? queryMatch[1] : 'search';
            
            // Extract individual results using regex
            const titleMatches = [...resultStr.matchAll(/'title':\s*'([^']+?)'/g)];
            const urlMatches = [...resultStr.matchAll(/'url':\s*'([^']+?)'/g)];
            const snippetMatches = [...resultStr.matchAll(/'snippet':\s*'([^']+?)'/g)];
            
            if (titleMatches.length > 0) {
              addMessage('agent', `🔍 Found ${titleMatches.length} results for "${query}":`);
              
              for (let i = 0; i < titleMatches.length && i < 5; i++) {
                const title = titleMatches[i]?.[1] || 'No title';
                const url = urlMatches[i]?.[1] || 'No URL';
                const snippet = snippetMatches[i]?.[1] || 'No description';
                
                addMessage('agent', `${i + 1}. **${title}**\n🔗 ${url}\n📄 ${snippet}`);
              }
              return; // Exit early if we successfully formatted
            }
          }
          
          // If not search results or extraction failed, show raw
          addMessage('agent', data.result);
        } catch (error) {
          // Fallback to raw if anything fails
          addMessage('agent', data.result);
        }
      }
    });
    
    socket.on('step_summary', (data: any) => {
      console.log('📝 STEP_SUMMARY - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      addMessage('agent', `📝 Step ${data.step_number}: ${data.summary}`);
      totalSteps = data.step_number;
      logUsageEvent('step_executed', { 
        step_number: data.step_number, 
        summary: data.summary,
        confidence: data.confidence,
        execution_time: data.execution_time,
        backend_timestamp: data.timestamp,
        tool_calls_in_step: data.tool_calls || 0,
        files_modified: data.files_modified || 0,
        step_type: data.step_type || 'unknown'
      });
    });
    
    socket.on('waiting_for_input', (data: any) => {
      console.log('⏳ WAITING_FOR_INPUT - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      isWaitingForInput = true;
      addMessage('agent', '⏳ Waiting for your input...');
      logUsageEvent('waiting_for_input', {
        prompt: data.prompt,
        backend_timestamp: data.timestamp,
        current_step: totalSteps,
        pause_reason: 'user_input_required'
      });
    });
    
    socket.on('task_completed', (data: any) => {
      console.log('✅ TASK_COMPLETED - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      isAgentRunning = false;
      addMessage('agent', '✅ Task completed successfully!');
      logUsageEvent('task_completed', { 
        success: true,
        total_steps_completed: totalSteps,
        completion_time: data.completion_time,
        backend_timestamp: data.timestamp,
        session_duration: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0,
        files_created: filesCreated
      });
    });
    
    socket.on('agent_finished', (data: any) => {
      console.log('🏁 AGENT_FINISHED - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      isAgentRunning = false;
      addMessage('agent', '🏁 Agent finished execution');
      logUsageEvent('agent_finished', {
        execution_summary: data.summary,
        total_steps_completed: totalSteps,
        backend_timestamp: data.timestamp,
        session_duration: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0,
        completion_status: 'finished',
        avg_confidence: data.avg_confidence,
        time_elapsed: data.time_elapsed
      });
    });
    
    socket.on('agent_error', (data: any) => {
      console.log('❌ AGENT_ERROR - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      isAgentRunning = false;
      addMessage('agent', `❌ Error: ${data.error}`);
      logUsageEvent('agent_error', {
        error_message: data.error,
        error_type: data.error_type || 'unknown',
        backend_timestamp: data.timestamp,
        current_step: totalSteps,
        session_aborted: true
      });
    });
    
    socket.on('error', (data: any) => {
      console.log('🚨 ERROR - FULL PAYLOAD:', JSON.stringify(data, null, 2));
      connectionError = data.message;
      console.error('WebSocket error:', data);
    });
    
  } catch (error) {
    connectionError = 'Failed to connect to Simple-Agent server';
    console.error('Connection error:', error);
  }
}

// Simple markdown detection and rendering
function detectAndRenderMarkdown(content: string): { isMarkdown: boolean, rendered: string } {
  // Check for common markdown patterns
  const hasMarkdownPatterns = 
    content.includes('**') ||      // Bold
    content.includes('*') ||       // Italic
    content.includes('##') ||      // Headers
    content.includes('- ') ||      // Lists
    content.includes('1. ') ||     // Numbered lists
    content.includes('[') ||       // Links
    content.includes('`') ||       // Code
    content.includes('> ') ||      // Quotes
    content.includes('http');      // URLs

  if (!hasMarkdownPatterns) {
    return { isMarkdown: false, rendered: content };
  }

  let rendered = content
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Markdown links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Plain URLs (http/https)
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br>');

  return { isMarkdown: true, rendered };
}

function addMessage(type: 'agent' | 'user', content: string) {
  const { isMarkdown, rendered } = detectAndRenderMarkdown(content);
  
  messages = [...messages, {
    type,
    content,
    timestamp: new Date(),
    isMarkdown,
    renderedContent: rendered
  }];
  
  // Auto-scroll to bottom
  setTimeout(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, 100);
}

function sendMessage() {
  if (!currentMessage.trim() || !socket || !connected) {
    console.log('❌ Cannot send message - missing requirements:', {
      hasMessage: !!currentMessage.trim(),
      hasSocket: !!socket,
      isConnected: connected
    });
    return;
  }
  
  const message = currentMessage.trim();
  addMessage('user', message);
  
  if (isWaitingForInput) {
    // Send user input during agent execution
    const payload = { input: message };
    console.log('📤 SENDING USER_INPUT:', JSON.stringify(payload, null, 2));
    socket.emit('user_input', payload);
    isWaitingForInput = false;
    
    logUsageEvent('user_input_provided', {
      input_message: message,
      input_length: message.length,
      input_type: 'continuation',
      current_step: totalSteps,
      response_time_seconds: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0
    });
  } else {
    // Start new agent run
    const payload = {
      instruction: message,
      max_steps: 10,
      auto_continue: 0
    };
    console.log('📤 SENDING RUN_AGENT:', JSON.stringify(payload, null, 2));
    socket.emit('run_agent', payload);
    
    // Log the instruction for analytics
    if (!currentUser) {
      logAnonymousUsage(message);
    }
    logUsageEvent('agent_run_started', { 
      instruction: message,
      instruction_length: message.length,
      max_steps: 10,
      auto_continue: 0,
      run_type: 'new_instruction',
      user_type: currentUser ? 'authenticated' : 'anonymous'
    });
  }
  
  currentMessage = '';
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function disconnect() {
  // Log session end before disconnecting
  if (sessionId) {
    logUsageEvent('session_ended', {
      session_duration: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0,
      total_messages: messages.length,
      total_steps_completed: totalSteps,
      files_created: filesCreated,
      end_reason: 'user_disconnect',
      final_status: isAgentRunning ? 'interrupted' : 'completed'
    });
  }
  
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  connected = false;
  messages = [];
  isAgentRunning = false;
  isWaitingForInput = false;
}

onMount(() => {
  setTimeout(() => { fadeIn = true; }, 10);
  connectWebSocket();
  
  // Start intro messages after a short delay
  setTimeout(() => {
    showIntroMessages();
  }, 500);
  
  // Log page access
  logUsageEvent('page_loaded', {
    page_type: 'simple_agent',
    user_type: currentUser ? 'authenticated' : 'anonymous',
    referrer: document.referrer,
    page_load_time: new Date().toISOString(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  });
});

onDestroy(() => {
  disconnect();
});
</script>

<style>
.fade-in {
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1);
}
.fade-in.visible {
  opacity: 1;
}
.font-courier {
  font-family: 'Courier New', Courier, monospace;
}
.medium-font {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.medium-font:hover, .medium-font:focus {
  transform: translateY(-6px);
}
.underline-animate {
  position: relative;
}
.underline-animate::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1), left 0.3s cubic-bezier(0.4,0,0.2,1);
  transform: translateX(-50%);
}
.underline-animate:hover::after, .underline-animate:focus::after {
  width: 100%;
  left: 50%;
}

/* Chat interface styles */
.chat-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  min-height: 0;
}

.message {
  padding: 1rem;
  background: transparent;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  width: 70%;
  max-width: 600px;
}

@media (max-width: 768px) {
  .message {
    width: 85%;
    font-size: 13px;
    padding: 0.75rem;
  }
  
  .chat-input-full {
    padding: 0.75rem;
  }
  
  .input-field-full {
    font-size: 13px;
  }
  
  .send-button-full {
    font-size: 13px;
    padding: 0.5rem 1rem;
  }
  
  .message-content a {
    font-size: 12px;
    padding: 1px 2px;
  }
}

.chat-interface-container {
  height: calc(100vh - 8rem);
}

@media (max-width: 1024px) {
  .chat-interface-container {
    height: calc(100vh - 10rem);
  }
}

@media (max-width: 768px) {
  .chat-interface-container {
    height: calc(100vh - 12rem);
  }
}

@media (max-width: 480px) {
  .chat-interface-container {
    height: calc(100vh - 14rem);
  }
}

.message.user {
  align-self: flex-end;
  margin-left: auto;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: none;
  border-bottom: 1px solid white;
}

.message.agent {
  align-self: flex-start;
  margin-right: auto;
  border-top: 1px solid white;
  border-left: none;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}

.chat-input-full {
  border-top: 1px solid white;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid white;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  width: 100%;
  margin-top: auto;
}

.input-field-full {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  padding: 0;
  outline: none;
  resize: none;
  min-height: 2.5rem;
  max-height: 6rem;
  line-height: 1.4;
}

.input-field-full::placeholder {
  color: #666;
}

.send-button-full {
  background: transparent;
  color: white;
  border: 1px solid white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  align-self: flex-end;
}

.send-button-full:hover:not(:disabled) {
  background: white;
  color: black;
}

.send-button-full:disabled {
  border-color: #666;
  color: #666;
  cursor: not-allowed;
}





.error-message {
  background: #330000;
  border: 1px solid #ff0000;
  color: #ff6666;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #333;
  background: rgba(255, 255, 255, 0.05);
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff0000;
}

.status-indicator.connected {
  background: #00ff00;
}

.status-text {
  flex: 1;
}

.user-indicator {
  color: #ccc;
  font-size: 11px;
}

.welcome-message {
  padding: 2rem;
  border: 1px solid #333;
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.welcome-message h3 {
  margin-bottom: 1rem;
  color: #fff;
}

.welcome-message ul {
  margin: 1rem 0;
  padding-left: 1rem;
}

.welcome-message li {
  margin-bottom: 0.5rem;
  color: #ccc;
}

.welcome-message em {
  color: #999;
  font-style: italic;
}

.message-content {
  margin-bottom: 0.25rem;
}

.message-time {
  font-size: 11px;
  color: #666;
  text-align: right;
}

/* Markdown styling */
.message-content h1, .message-content h2, .message-content h3 {
  margin: 0.5rem 0;
  color: #fff;
}

.message-content h1 {
  font-size: 1.4rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.25rem;
}

.message-content h2 {
  font-size: 1.2rem;
}

.message-content h3 {
  font-size: 1.1rem;
}

.message-content strong {
  font-weight: bold;
  color: #fff;
}

.message-content em {
  font-style: italic;
  color: #ccc;
}

.message-content code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  color: #fff;
}

.message-content pre {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.5rem 0;
  border: 1px solid #333;
}

.message-content pre code {
  background: none;
  padding: 0;
  color: #ccc;
}

.message-content a {
  color: #4CAF50;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  word-break: break-all;
  position: relative;
}

.message-content a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
}

.message-content a:hover::after, .message-content a:focus::after {
  width: 100%;
}

.message-content a:hover {
  color: #66BB6A;
}

.message-content a:visited {
  color: #8BC34A;
}

.message-content ul, .message-content ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.message-content li {
  margin: 0.25rem 0;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  color: #999;
  align-self: flex-start;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots span {
  width: 4px;
  height: 4px;
  background: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

<div class="min-h-screen flex flex-col bg-custom text-white font-courier">
  <!-- Header -->
  <div class="flex flex-col fade-in w-full" class:visible={fadeIn} style="padding: 2rem 0;">
  </div>
  
  <!-- Chat Interface Container -->
  <div class="flex flex-col fade-in w-full chat-interface-container" class:visible={fadeIn} style="padding: 2rem 0 0 0;">
    {#if connectionError}
      <div class="error-message">
        {connectionError}
      </div>
    {/if}
    

    
    <!-- Chat Messages Area -->
    <div class="chat-container flex-1">
      {#if messages.length === 0 && !showingIntro}
        <div class="welcome-message">
          <h3>Welcome to Simple-Agent! 🤖</h3>
          <p>Start by describing a task you'd like me to help with. I can:</p>
          <ul>
            <li>• Help with research and analysis</li>
            <li>• Write and edit documents</li>
            <li>• Solve problems step by step</li>
            <li>• Use tools to accomplish complex tasks</li>
          </ul>
          <p><em>Just type your request below to get started!</em></p>
        </div>
      {/if}
      
      {#each messages as message}
        <div class="message {message.type}">
          <div class="message-content">
            {#if message.isMarkdown && message.renderedContent}
              {@html message.renderedContent}
            {:else}
              {message.content}
            {/if}
          </div>
          <div class="message-time">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      {/each}
      
      {#if isAgentRunning && !isWaitingForInput}
        <div class="typing-indicator">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Agent is thinking...</span>
        </div>
      {/if}
      
      {#if showingIntro && introMessageIndex < introMessages.length}
        <div class="typing-indicator">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Agent is connecting...</span>
        </div>
      {/if}
    </div>
    
    <!-- Full-width Input Area -->
    <div class="chat-input-full" style="flex-shrink: 0;">
      <textarea
        bind:value={currentMessage}
        on:keypress={handleKeyPress}
        placeholder={isWaitingForInput ? "Enter your response..." : "Describe your task..."}
        class="input-field-full"
        disabled={!connected || (isAgentRunning && !isWaitingForInput) || showingIntro}
        rows="2"
      ></textarea>
      <button
        on:click={sendMessage}
        disabled={!connected || !currentMessage.trim() || (isAgentRunning && !isWaitingForInput) || showingIntro}
        class="send-button-full"
      >
        {#if isWaitingForInput}
          Send
        {:else if isAgentRunning}
          Running...
        {:else}
          Start
        {/if}
      </button>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="w-full flex justify-center pb-8 fade-in" class:visible={fadeIn}>
    <a href="https://github.com/reagent-systems/Simple-Agent-Core" class="text-lg underline-animate font-courier" style="color:inherit; text-decoration:none;">
      https://github.com/reagent-systems/Simple-Agent-Core
    </a>
  </div>
</div> 