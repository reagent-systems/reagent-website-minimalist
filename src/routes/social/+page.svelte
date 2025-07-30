<script lang="ts">
  import { onMount } from 'svelte';
  let fadeIn = false;

  onMount(() => {
    setTimeout(() => { fadeIn = true; }, 10);
  });

  function handleBack() {
    window.location.href = '/';
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    const fallback = img.nextElementSibling as HTMLElement;
    img.style.display = 'none';
    if (fallback) {
      fallback.style.display = 'block';
    }
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
.connect-header {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  user-select: none;
}
.connect-header:hover, .connect-header:focus {
  transform: translateY(-6px);
}
.social-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}
.social-header {
  text-align: center;
  margin-bottom: 4rem;
}
.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 600px;
}
.social-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
}
.social-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  transform: translateY(-4px);
}
.social-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem auto;
  display: block;
  object-fit: contain;
}
.social-icon.emoji {
  font-size: 3rem;
  width: auto;
  height: auto;
}
.social-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
}
.social-description {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  line-height: 1.5;
}
.social-url {
  font-size: 0.9rem;
  color: #999;
  word-break: break-all;
}
@media (max-width: 768px) {
  .social-container {
    padding: 2rem 1rem;
  }
  .connect-header {
    font-size: 2rem;
  }
  .social-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .social-card {
    padding: 1.5rem;
  }
  .social-icon {
    width: 50px;
    height: 50px;
  }
  .social-icon.emoji {
    font-size: 2.5rem;
    width: auto;
    height: auto;
  }
  .social-name {
    font-size: 1.3rem;
  }
}
</style>

<div class="min-h-screen bg-custom text-white font-courier">
  <div class="social-container fade-in" class:visible={fadeIn}>
    <div class="social-header">
      <h1 class="connect-header" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Connect With Us - Back to Home">
        Connect With Us
      </h1>
      <p style="font-size: 1.1rem; color: #ccc; line-height: 1.6;">
        Join our community and stay updated with the latest developments in decentralized AI and federated learning.
      </p>
    </div>

    <div class="social-links">
      <a href="https://discord.reagent-systems.com" target="_blank" rel="noopener noreferrer" class="social-card">
        <img src="/Discord-Symbol-White.svg" alt="Discord" class="social-icon" on:error={handleImageError} />
        <div class="social-icon emoji" style="display: none;">💬</div>
        <div class="social-name">Discord</div>
        <div class="social-description">
          Join our Discord community for real-time discussions, development updates, and collaboration opportunities. Connect with developers, researchers, and AI enthusiasts.
        </div>
        <div class="social-url">discord.reagent-systems.com</div>
      </a>

      <a href="https://x.com/Reagent_Systems" target="_blank" rel="noopener noreferrer" class="social-card">
        <img src="/x_logo.svg" alt="X" class="social-icon" on:error={handleImageError} />
        <div class="social-icon emoji" style="display: none;">🐦</div>
        <div class="social-name">X (Twitter)</div>
        <div class="social-description">
          Follow us on X for announcements, technical insights, breakthrough moments, and updates on our revolutionary AI architecture development.
        </div>
        <div class="social-url">@Reagent_Systems</div>
      </a>
    </div>

    <div style="margin-top: 3rem; text-align: center; color: #999; font-size: 0.9rem;">
      <p>Be part of the revolution in decentralized AI</p>
    </div>
  </div>
</div> 