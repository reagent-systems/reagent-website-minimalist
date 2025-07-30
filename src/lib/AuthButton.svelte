<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user, loading, initAuth, signOutUser } from './auth.js';

  let showDropdown = false;

  onMount(() => {
    initAuth();
  });

  function handleLogin() {
    goto('/login');
  }

  function handleLogout() {
    signOutUser();
    showDropdown = false;
  }

  function toggleDropdown() {
    console.log('Toggle dropdown clicked, current state:', showDropdown);
    showDropdown = !showDropdown;
    console.log('New dropdown state:', showDropdown);
  }

  function closeDropdown() {
    showDropdown = false;
  }

  function handleGoToAgent() {
    goto('/simple-agent');
    closeDropdown();
  }

  function handleSettings() {
    goto('/settings');
    closeDropdown();
  }

  function handleFeedback() {
    goto('/feedback');
    closeDropdown();
  }

  function handleUsage() {
    goto('/usage');
    closeDropdown();
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.auth-container')) {
      showDropdown = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<style>
.auth-container {
  position: relative;
  font-family: 'Courier New', Courier, monospace;
}

.auth-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  padding: 0.5rem 1rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.auth-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: #000;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.auth-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(15, 15, 15, 0.95);
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.5rem 0;
  min-width: 200px;
  backdrop-filter: blur(10px);
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-divider {
  height: 1px;
  background: #333;
  margin: 0.5rem 0;
}

.user-email {
  color: #ccc;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #333;
  margin-bottom: 0.5rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .auth-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .auth-dropdown {
    min-width: 180px;
  }
}
</style>

<div class="auth-container">
  {#if $loading}
    <div class="auth-button">
      <div class="loading-spinner"></div>
    </div>
  {:else if $user}
    <button class="auth-button user-button" on:click={toggleDropdown} type="button">
      <div class="user-avatar">
        {$user.email.charAt(0).toUpperCase()}
      </div>
      <span class="dropdown-arrow" class:open={showDropdown}>▼</span>
    </button>
    
    {#if showDropdown}
      <div class="auth-dropdown">
        <div class="user-email">{$user.email}</div>
        <div class="dropdown-item" on:click={handleGoToAgent} on:keydown={(e) => e.key === 'Enter' && handleGoToAgent()} tabindex="0">
          Go To Agent
        </div>
        <div class="dropdown-item" on:click={handleSettings} on:keydown={(e) => e.key === 'Enter' && handleSettings()} tabindex="0">
          Settings
        </div>
        <div class="dropdown-item" on:click={handleFeedback} on:keydown={(e) => e.key === 'Enter' && handleFeedback()} tabindex="0">
          Feedback
        </div>
        <div class="dropdown-item" on:click={handleUsage} on:keydown={(e) => e.key === 'Enter' && handleUsage()} tabindex="0">
          Usage
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" on:click={handleLogout} on:keydown={(e) => e.key === 'Enter' && handleLogout()} tabindex="0">
          Sign Out
        </div>
      </div>
    {/if}
  {:else}
    <button class="auth-button" on:click={handleLogin}>
      Sign In
    </button>
  {/if}
</div> 