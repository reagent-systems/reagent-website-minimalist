<script lang="ts">
	import '../app.css';
	import AuthButton from '$lib/AuthButton.svelte';

	let { children } = $props();
</script>

<style>
.logo-container {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 100;
}

.logo-link {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo {
  height: 40px;
  width: auto;
}

.auth-container {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 100;
}

@media (max-width: 768px) {
  .logo-container {
    display: none;
  }
  
  .auth-container {
    top: 1rem;
    right: 1rem;
  }
}
</style>

<div class="logo-container">
  <a href="/" class="logo-link" aria-label="Reagent Systems - Home">
    <img src="/reagent-2-full.png" alt="Reagent Systems" class="logo" />
  </a>
</div>

<div class="auth-container">
  <AuthButton />
</div>

{@render children()}
