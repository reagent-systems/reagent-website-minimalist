<script lang="ts">
import { onMount } from 'svelte';
let fadeIn = false;

onMount(() => {
  setTimeout(() => { fadeIn = true; }, 10);
});

function handleBack() {
  window.location.href = '/';
}

// Sample repo data - you can replace with actual repos
const repos = [
  {
    name: "Simple-Agent-Core",
    madeBy: "BentlyBro",
    description: "A lightweight, extensible AI agent framework designed for simplicity and performance. Built with TypeScript and Node.js, featuring dynamic tool loading and intelligent execution management.",
    video: "/simple-agent-core-videos/simple-agent-core-videos.mov",
    link: "https://github.com/reagent-systems/Simple-Agent-Core",
    tech: ["TypeScript", "Node.js", "AI/ML", "WebSockets"]
  },
  {
    name: "Tetra",
    madeBy: "BentlyBro",
    description: "Advanced data processing and analytics platform with real-time streaming capabilities. Designed for high-performance data pipelines and machine learning workflows.",
    image: "/static/reagent-2.png", // Placeholder - replace with actual repo image
    link: "https://github.com/reagent-systems/tetra",
    tech: ["Python", "Apache Kafka", "Docker", "Kubernetes"]
  },
  {
    name: "Spark",
    madeBy: "BentlyBro",
    description: "Real-time collaboration platform for distributed teams. Features live editing, version control, and seamless integration with existing development workflows.",
    image: "/static/reagent-2.png", // Placeholder - replace with actual repo image
    link: "https://github.com/reagent-systems/spark",
    tech: ["React", "WebRTC", "Firebase", "Real-time"]
  }
];
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
.repos-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 8rem;
}
.showcase-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: white;
}
.repo-item {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.repo-item:nth-child(even) {
  flex-direction: row-reverse;
}
.repo-image {
  width: 800px;
  height: 600px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  background: #333;
  flex-shrink: 0;
  flex-grow: 0;
}
.repo-image:hover {
  transform: scale(1.05);
}
.repo-image img,
.repo-image video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  display: block;
  background: #333;
}
.repo-image:hover img,
.repo-image:hover video {
  filter: brightness(1.1);
}
.repo-content {
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
}
.repo-content-inner {
  padding: 2rem;
}
.repo-name {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: white;
}
.repo-made-by {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #999;
  font-style: italic;
}
.repo-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #ccc;
  text-align: justify;
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.tech-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: #ccc;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.repo-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}
.underline-animate {
  position: relative;
}
.underline-animate::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
}
.underline-animate:hover::after, .underline-animate:focus::after {
  width: 100%;
}

@media (max-width: 1024px) {
  .repo-item {
    flex-direction: column !important;
  }
  .repo-image {
    width: 640px;
    height: 480px;
  }
  .repo-content {
    width: 640px;
    height: auto;
  }
  .repo-content-inner {
    padding: 1rem;
  }
  .repos-container {
    padding-top: 6rem;
  }
}

@media (max-width: 768px) {
  .repo-image {
    width: 480px;
    height: 360px;
  }
  .repo-content {
    width: 480px;
    height: auto;
  }
  .repo-name {
    font-size: 1.5rem;
  }
  .repo-description {
    font-size: 0.9rem;
  }
  .tech-stack {
    gap: 0.25rem;
  }
  .tech-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>

<div class="min-h-screen bg-custom text-white font-courier">
  <div class="repos-container fade-in" class:visible={fadeIn}>
    <div class="showcase-title">
      Project Showcase
    </div>
    
    {#each repos as repo, index}
        <div class="repo-item">
          <a href={repo.link} target="_blank" rel="noopener noreferrer" class="repo-image">
            {#if repo.video}
              <video autoplay muted loop playsinline>
                <source src={repo.video} type="video/quicktime">
                <source src={repo.video} type="video/mp4">
                <img src="/static/reagent-2.png" alt={repo.name} />
              </video>
            {:else}
              <img src={repo.image} alt={repo.name} />
            {/if}
          </a>
        <div class="repo-content">
          <div class="repo-content-inner">
            <div class="repo-name">
              {repo.name}
            </div>
                      <div class="repo-made-by">
            Made By: {repo.madeBy}
          </div>
            <div class="repo-description">
              {repo.description}
            </div>
            <div class="tech-stack">
              {#each repo.tech as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
            <div class="repo-link">
              <a href={repo.link} target="_blank" rel="noopener noreferrer" class="underline-animate font-courier" style="color:inherit; text-decoration:none;">
                {repo.link}
              </a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> 