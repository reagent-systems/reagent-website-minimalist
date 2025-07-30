<script lang="ts">
	import '../app.css';

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

@media (max-width: 768px) {
  .logo-container {
    top: 1rem;
    left: 1rem;
  }
  
  .logo {
    height: 32px;
  }
}
</style>

<div class="logo-container">
  <a href="/" class="logo-link" aria-label="Reagent Systems - Home">
    <img src="/reagent-2-full.png" alt="Reagent Systems" class="logo" />
  </a>
</div>

{@render children()}
