<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
let fadeIn = false;

// Python runner state
let pyodide: any = null;
let pythonCode = `# Simple Python Example
import sys
import json

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def greet(name):
    return f"Hello, {name}! Welcome to SimpleAgent Python Runner."

# Calculate first 10 fibonacci numbers
fib_numbers = [fibonacci(i) for i in range(10)]
print("First 10 Fibonacci numbers:", fib_numbers)

# Greet the user
message = greet("SimpleAgent User")
print(message)

# Show Python version
print(f"Python version: {sys.version}")

# Return some data
result = {
    "fibonacci": fib_numbers,
    "message": message,
    "python_version": sys.version
}
print("Result:", json.dumps(result, indent=2))`;

let output = '';
let isLoading = false;
let isPyodideReady = false;

function handleBack() {
  goto('/agent');
}

async function loadPyodide() {
  if (pyodide) return;
  
  isLoading = true;
  try {
    // Load Pyodide from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    script.onload = async () => {
      // @ts-ignore
      pyodide = await loadPyodide();
      isPyodideReady = true;
      isLoading = false;
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    output = 'Error loading Pyodide: ' + error;
    isLoading = false;
  }
}

async function runPython() {
  if (!pyodide) {
    output = 'Pyodide not loaded yet. Please wait...';
    return;
  }

  isLoading = true;
  output = '';
  
  try {
    // Redirect stdout to capture print statements
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
    `);
    
    // Run the user's code
    pyodide.runPython(pythonCode);
    
    // Get the output
    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    output = stdout || 'Code executed successfully (no output)';
  } catch (error) {
    output = 'Error: ' + error;
  } finally {
    isLoading = false;
  }
}

function clearOutput() {
  output = '';
}

onMount(() => {
  setTimeout(() => { fadeIn = true; }, 10);
  loadPyodide();
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

/* Python runner styles */
.python-runner {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
}

.code-editor {
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 4px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 1rem;
  resize: vertical;
  width: 100%;
  min-height: 200px;
}

.code-editor:focus {
  outline: none;
  border-color: #666;
}

.output-area {
  background: #000;
  border: 1px solid #333;
  border-radius: 4px;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 120px;
  max-height: 300px;
  overflow-y: auto;
}

.btn {
  background: #333;
  border: 1px solid #555;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.btn:hover {
  background: #444;
  border-color: #666;
}

.btn:disabled {
  background: #222;
  border-color: #333;
  color: #666;
  cursor: not-allowed;
}

.btn-primary {
  background: #2563eb;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<div class="min-h-screen flex flex-col bg-black text-white font-courier">
  <div class="flex flex-col md:flex-row flex-1 items-center justify-center">
    <div class="flex flex-col justify-center fade-in w-full md:w-1/2 pr-8 md:pr-8" class:visible={fadeIn} style="max-width:600px; margin-left:5vw;">
      <div class="medium-font mb-12" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Agent">Simple-Agent</div>
      <div class="text-lg leading-relaxed w-full text-justify break-words mb-16">
        SimpleAgent is designed with the belief that AI agents don't need to be complex to be useful. By focusing on a small set of core operations and using function calling for all interactions, SimpleAgent remains easy to understand, modify, and extend while providing advanced features like dynamic tool loading, loop detection, and intelligent execution management.
      </div>
    </div>
    
    <!-- Python Runner Container -->
    <div class="w-full md:w-1/2 pr-4 md:pr-8 fade-in" class:visible={fadeIn}>
      <div class="python-runner">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-courier">Python Runner</h3>
          <div class="flex items-center space-x-2">
            {#if isLoading}
              <div class="loading-spinner"></div>
              <span class="text-sm">Loading...</span>
            {:else if isPyodideReady}
              <span class="text-sm text-green-400">Ready</span>
            {:else}
              <span class="text-sm text-yellow-400">Initializing...</span>
            {/if}
          </div>
        </div>
        
        <div class="mb-4">
          <label for="python-code" class="block text-sm mb-2">Python Code:</label>
          <textarea
            id="python-code"
            bind:value={pythonCode}
            class="code-editor"
            placeholder="Enter your Python code here..."
          ></textarea>
        </div>
        
        <div class="flex space-x-2 mb-4">
          <button 
            class="btn btn-primary"
            on:click={runPython}
            disabled={!isPyodideReady || isLoading}
          >
            {#if isLoading}
              <span class="loading-spinner mr-2"></span>
            {/if}
            Run Code
          </button>
          <button 
            class="btn"
            on:click={clearOutput}
            disabled={isLoading}
          >
            Clear Output
          </button>
        </div>
        
        <div class="mb-2">
          <label class="block text-sm mb-2">Output:</label>
          <div class="output-area">
            {output || 'No output yet. Run some Python code!'}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center pb-12 fade-in" class:visible={fadeIn}>
    <a href="https://github.com/reagent-systems/Simple-Agent-Core" class="text-lg underline-animate font-courier" style="color:inherit; text-decoration:none;">
      https://github.com/reagent-systems/Simple-Agent-Core
    </a>
  </div>
</div> 