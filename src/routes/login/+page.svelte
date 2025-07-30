<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { signInWithEmail, createAccount, signInWithGoogle } from '$lib/auth.js';
  
  let email = '';
  let password = '';
  let isLogin = true;
  let loading = false;
  let error = '';
  let fadeIn = false;

  onMount(() => {
    setTimeout(() => { fadeIn = true; }, 10);
  });

  function toggleMode() {
    isLogin = !isLogin;
    error = '';
    email = '';
    password = '';
  }

  function handleBack() {
    goto('/');
  }

  async function handleSubmit() {
    if (!email || !password) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;
    error = '';

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await createAccount(email, password);
      }
      goto('/');
    } catch (err: any) {
      error = err.message || 'Authentication failed';
    }

    loading = false;
  }

  async function handleGoogleLogin() {
    loading = true;
    error = '';

    try {
      await signInWithGoogle();
      goto('/');
    } catch (err: any) {
      error = err.message || 'Google authentication failed';
    }

    loading = false;
  }
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
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #0F0F0F;
}
.login-box {
  background: #0F0F0F;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
.logo {
  height: 60px;
  width: auto;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.logo:hover {
  transform: scale(1.05);
}
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
}
.form-input {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.15);
}
.form-input::placeholder {
  color: #999;
}
.btn {
  width: 100%;
  padding: 0.75rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}
.btn:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid #333;
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.divider {
  margin: 1.5rem 0;
  text-align: center;
  color: #999;
  position: relative;
}
.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #333;
}
.divider span {
  background: #0F0F0F;
  padding: 0 1rem;
}
.toggle-link {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}
.toggle-link:hover {
  color: #ccc;
}
.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 4px;
}
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
  .login-box {
    padding: 2rem;
  }
  .logo {
    height: 48px;
  }
}
</style>

<div class="login-container fade-in" class:visible={fadeIn}>
  <div class="login-box">
    <div class="logo-container">
      <img 
        src="/reagent-2-full.png" 
        alt="Reagent Systems" 
        class="logo"
        on:click={handleBack}
        on:keydown={(e) => e.key === 'Enter' && handleBack()}
        tabindex="0"
        role="button"
        aria-label="Back to Home"
      />
    </div>

    <h1 class="font-courier" style="color: #fff; margin-bottom: 2rem; font-size: 1.5rem;">
      {isLogin ? 'Sign In' : 'Create Account'}
    </h1>

    {#if error}
      <div class="error-message">
        {error}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="email" class="form-label font-courier">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="your@email.com"
          class="form-input"
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label font-courier">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          class="form-input"
          disabled={loading}
        />
      </div>

      <button type="submit" class="btn" disabled={loading}>
        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
      </button>
    </form>

    <button type="button" class="btn btn-secondary" on:click={handleGoogleLogin} disabled={loading}>
      Continue with Google
    </button>

    <div style="margin-top: 1.5rem; color: #ccc; font-size: 0.9rem;" class="font-courier">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button type="button" class="toggle-link" on:click={toggleMode}>
        {isLogin ? 'Sign up' : 'Sign in'}
      </button>
    </div>
  </div>
</div> 