<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

let fadeIn = false;
let sliding = false;
let moving = false;

onMount(() => {
  setTimeout(() => { fadeIn = true; }, 10);
});

async function handleBackNav(e: MouseEvent) {
  e.preventDefault();
  sliding = true;
  await new Promise(r => setTimeout(r, 500));
  window.location.href = '/team';
}

function handleBack() {
  goto('/team');
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
.slide-up {
  transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1);
  transform: translateY(-100vh);
  opacity: 0;
}
.bigword {
  transition: color 0.35s cubic-bezier(0.4,0,0.2,1), filter 0.35s cubic-bezier(0.4,0,0.2,1), text-shadow 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1);
  vertical-align: top;
  line-height: 1;
  backface-visibility: hidden;
  will-change: transform;
}
.bigword.moving {
  transform: translateY(-4px);
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

.bio-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

.bio-section h2 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.5rem;
}

.bio-section p {
  margin-bottom: 1.5rem;
  color: #ccc;
  font-size: 1.1rem;
}

.bio-section strong {
  color: #fff;
  font-weight: bold;
}

.bio-section em {
  color: #999;
  font-style: italic;
}

.role-highlight {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  border-left: 4px solid #4CAF50;
}

.role-highlight h3 {
  color: #4CAF50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.role-highlight p {
  margin: 0.5rem 0;
  color: #ddd;
}

.focus-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.focus-tag {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4CAF50;
  color: #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>

<div class="min-h-screen flex flex-col bg-custom text-white font-courier">
  <div class="flex flex-col md:flex-row flex-1 items-center justify-center">
    <div class="flex flex-col justify-center fade-in w-full md:w-1/2 pr-8 md:pr-8" class:visible={fadeIn} style="max-width:600px; margin-left:5vw;">
      <div class="medium-font mb-12" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Team">Ethan Shelton</div>
      
      <div class="bio-section">
        <div class="role-highlight">
          <h3>Self-Taught Developer & YouTuber</h3>
          <p><strong>Alias:</strong> Spike</p>
          <p><strong>Age:</strong> 25</p>
          <p><strong>Location:</strong> Florida</p>
          <p><strong>Title:</strong> CMO</p>
          <p><strong>Languages:</strong> C#, Python, Web</p>
          <div class="focus-areas">
            <span class="focus-tag">Agents</span>
            <span class="focus-tag">Connected Life</span>
            <span class="focus-tag">Productivity Apps</span>
            <span class="focus-tag">VR</span>
          </div>
        </div>
        
        <p>
          Hello, I'm <strong>Spike</strong>! I've been coding since I was 13, diving into mods, mobile games, VR experiences, websites, AWS, and software development. I thrive on the challenge, the puzzles, and the fun of piecing it all together.
        </p>
        
        <p>
          Currently, I'm focusing on my <strong>vlogging and VR YouTube channels</strong> and crafting my own AI assistant named <strong>KIT</strong>. This is only the beginning to my story of relentless creation.
        </p>
        
        <p>
          <em>When I'm not coding or creating content, you'll find me exploring the latest in VR technology, experimenting with AI agents, or sharing my journey with the world through my channels.</em>
        </p>
      </div>
    </div>
    
    <div class="w-full md:w-1/2 pr-4 md:pr-8 fade-in" class:visible={fadeIn} style="max-width:600px;">
      <div class="text-lg leading-relaxed w-full text-justify break-words">
        <h2>Current Projects</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #4CAF50;">🎥 <strong>YouTube Channels:</strong> Vlogging and VR content creation</li>
          <li style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #4CAF50;">🤖 <strong>KIT AI Assistant:</strong> Personal AI assistant development</li>
          <li style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #4CAF50;">🎮 <strong>VR Experiences:</strong> Immersive technology exploration</li>
          <li style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px solid #4CAF50;">⚡ <strong>Productivity Apps:</strong> Connected life solutions</li>
        </ul>
        
        <h2 style="margin-top: 2rem;">Technical Expertise</h2>
        <div class="focus-areas">
          <span class="focus-tag">C#</span>
          <span class="focus-tag">Python</span>
          <span class="focus-tag">Web Development</span>
          <span class="focus-tag">AWS</span>
          <span class="focus-tag">Mobile Games</span>
          <span class="focus-tag">VR Development</span>
          <span class="focus-tag">AI Agents</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="w-full flex justify-center pb-12 fade-in" class:visible={fadeIn}>
    <a href="/team" class="text-lg underline-animate font-courier" style="color:inherit; text-decoration:none;">
      ← Back to Team
    </a>
  </div>
</div> 