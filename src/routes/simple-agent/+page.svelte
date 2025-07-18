<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
let fadeIn = false;

// Python runner state
let pyodide: any = null;
let pythonCode = `# SimpleAgent Python Environment
import sys
import json
from datetime import datetime

print("🐍 Python Environment Initialized")
print("=" * 50)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def prime_check(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# System info
print(f"📅 Current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"🐍 Python version: {sys.version.split()[0]}")
print(f"💻 Platform: Pyodide (Browser-based Python)")
print()

# Demo calculations
print("🔢 Mathematics Demo:")
fib_numbers = [fibonacci(i) for i in range(12)]
print(f"Fibonacci sequence (12 terms): {fib_numbers}")

primes = [n for n in range(2, 50) if prime_check(n)]
print(f"Prime numbers up to 50: {primes}")
print()

# Fun facts
print("✨ Fun Facts:")
print(f"• Sum of first 12 Fibonacci numbers: {sum(fib_numbers)}")
print(f"• Number of primes under 50: {len(primes)}")
print(f"• Golden ratio approximation: {fib_numbers[-1]/fib_numbers[-2]:.6f}")
print()

print("🚀 SimpleAgent is ready for AI-powered automation!")
print("Visit: https://github.com/reagent-systems/Simple-Agent-Core")`;

let output = '';
let isLoading = false;
let isPyodideReady = false;
let loadingError = '';

function handleBack() {
  goto('/agent');
}

async function loadPyodide() {
  if (pyodide || isLoading) return;
  
  isLoading = true;
  loadingError = '';
  
  try {
    // Check if Pyodide is already loaded globally
    if (typeof window !== 'undefined' && (window as any).loadPyodide) {
      console.log('Pyodide script already available, initializing...');
      pyodide = await (window as any).loadPyodide();
      isPyodideReady = true;
      isLoading = false;
      // Auto-run the code
      await runPython();
      return;
    }

    // Check if script is already added
    const existingScript = document.querySelector('script[src*="pyodide.js"]');
    if (existingScript) {
      console.log('Pyodide script already added, waiting for load...');
      // Wait for it to load
      await new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
          if ((window as any).loadPyodide) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
        
        setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error('Timeout waiting for Pyodide script'));
        }, 30000);
      });
      
      pyodide = await (window as any).loadPyodide();
      isPyodideReady = true;
      isLoading = false;
      // Auto-run the code
      await runPython();
      return;
    }
    
    console.log('Loading Pyodide script...');
    // Load Pyodide from CDN
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    
    console.log('Pyodide script loaded, initializing...');
    // Wait a bit for the script to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (!(window as any).loadPyodide) {
      throw new Error('Pyodide loadPyodide function not available');
    }
    
    pyodide = await (window as any).loadPyodide();
    isPyodideReady = true;
    console.log('Pyodide initialized successfully');
    // Auto-run the code
    await runPython();
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    loadingError = 'Failed to load Pyodide: ' + error;
    isPyodideReady = false;
  } finally {
    isLoading = false;
  }
}

async function runPython() {
  if (!pyodide) {
    if (loadingError) {
      output = 'Python environment failed to load.';
    } else {
      output = 'Python environment loading...';
    }
    return;
  }

  const wasLoading = isLoading;
  if (!wasLoading) {
    isLoading = true;
  }
  
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
    if (!wasLoading) {
      isLoading = false;
    }
  }
}

function retryLoad() {
  loadingError = '';
  isPyodideReady = false;
  pyodide = null;
  output = '';
  loadPyodide();
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
  min-height: 300px;
  max-height: 400px;
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
            {:else if loadingError}
              <span class="text-sm text-red-400">Error</span>
              <button class="btn text-xs" on:click={retryLoad}>Retry</button>
            {:else if isPyodideReady}
              <span class="text-sm text-green-400">Ready</span>
            {:else}
              <span class="text-sm text-yellow-400">Initializing...</span>
            {/if}
          </div>
        </div>
        
        {#if loadingError}
          <div class="mb-4 p-3 bg-red-900 border border-red-500 rounded text-red-200 text-sm">
            {loadingError}
          </div>
        {/if}
        
        <div class="output-area">
          {#if isLoading && !output}
            <span class="text-yellow-400">Initializing Python environment...</span>
          {:else}
            {output || 'Loading...'}
          {/if}
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