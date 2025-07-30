<script lang="ts">
  function handleBack() {
    window.location.href = '/';
  }

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<style>
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
.community-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  gap: 4rem;
}
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  height: fit-content;
}
.sidebar-nav {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
}
.sidebar-nav h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-nav li {
  margin-bottom: 0.75rem;
}
.sidebar-nav a {
  color: #ccc;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: block;
  padding: 0.5rem 0;
  border-left: 2px solid transparent;
  padding-left: 1rem;
}
.sidebar-nav a:hover {
  color: #fff;
  border-left-color: #fff;
}
.main-content {
  flex: 1;
  min-width: 0;
}
.community-content {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  margin-top: 2rem;
}
.community-section {
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
}
.community-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}
.community-section h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #fff;
}
.highlight-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.forum-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}
.forum-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.3s ease;
  font-size: 0.95rem;
}
.forum-card:hover {
  border-color: #fff;
}
.forum-card h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
@media (max-width: 1024px) {
  .community-container {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .sidebar {
    width: 100%;
    position: static;
  }
  .forum-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .community-content {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>

<div class="min-h-screen bg-custom text-white">
  <div class="community-container">
    <div class="sidebar">
      <div class="medium-font font-courier" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Home">Community</div>
      
      <nav class="sidebar-nav">
        <h3>Contents</h3>
        <ul>
          <li><a on:click={() => scrollToSection('discord-hub')}>Discord Hub</a></li>
          <li><a on:click={() => scrollToSection('bulletin-boards')}>Bulletin Boards</a></li>
          <li><a on:click={() => scrollToSection('creative-forum')}>Creative Forum</a></li>
          <li><a on:click={() => scrollToSection('project-forum')}>Project Forum</a></li>
          <li><a on:click={() => scrollToSection('idea-validation')}>Idea Validation</a></li>
          <li><a on:click={() => scrollToSection('getting-started')}>Getting Started</a></li>
        </ul>
      </nav>
    </div>
    
    <div class="main-content">
      <div class="community-content">
        <div id="discord-hub" class="community-section">
          <h2>Discord Hub</h2>
          <p>Our Discord server serves as the central nervous system of our community. It's where real-time conversations happen, where quick questions get immediate answers, and where spontaneous collaborations are born. The server hosts channels for different interests and expertise levels, creating a vibrant ecosystem where developers, researchers, and innovators can connect instantly.</p>
          
          <p>Beyond casual conversation, our Discord community acts as the bridge between our formal bulletin-board systems and the day-to-day pulse of innovation. Members often share breakthrough moments, seek immediate feedback on prototypes, and coordinate collaborative efforts that later mature into full projects on our forum systems.</p>
        </div>

        <div id="bulletin-boards" class="community-section">
          <h2>Bulletin Board Systems</h2>
          <p>At the heart of our community infrastructure lie two specialized bulletin-board systems designed to support the complete lifecycle of innovation. These platforms represent our commitment to structured, thoughtful development while maintaining the accessibility that allows anyone to participate and contribute.</p>
          
          <div class="highlight-box">
            <p><strong>Our dual-forum approach recognizes that great ideas need different types of support at different stages.</strong> From initial creative sparks to polished implementations, we provide dedicated spaces for each phase of the innovation journey.</p>
          </div>

          <div class="forum-grid">
            <div class="forum-card" id="creative-forum">
              <h4>Creative Forum Board</h4>
              <p>This is where imagination runs wild. The Creative Forum Board is designed for exploration, brainstorming, and early-stage concept development. Here, members share raw ideas, experimental thoughts, and "what if" scenarios without the pressure of immediate implementation.</p>
              
              <p>Whether you're proposing a novel AI architecture, imagining new use cases for existing technology, or questioning fundamental assumptions in the field, the Creative Forum provides a supportive environment for intellectual exploration.</p>
            </div>

            <div class="forum-card" id="project-forum">
              <h4>Project Forum Board</h4>
              <p>When ideas are ready to become reality, they graduate to the Project Forum Board. This space focuses on planning, execution, and refinement. Here, concepts transform into actionable roadmaps, prototypes, and eventually polished implementations.</p>
              
              <p>The Project Forum emphasizes collaboration, resource sharing, and structured development. Members can find team members, share technical insights, and track progress through defined milestones.</p>
            </div>
          </div>
        </div>

        <div id="idea-validation" class="community-section">
          <h2>Immediate Validation & Assistance</h2>
          <p>One of the most powerful aspects of our community is the speed at which ideas can be validated and refined. Our forum systems are designed to provide immediate feedback loops that help members understand the potential and practical challenges of their concepts.</p>
          
          <h3>The Validation Process</h3>
          <p>When you post an idea on either forum, you're not just sharing with a passive audience—you're engaging with a community of practitioners who can offer real-world insights. Our members include experienced developers, researchers, and entrepreneurs who can quickly identify both the promise and pitfalls of new concepts.</p>
          
          <p>This immediate validation serves multiple purposes: it helps refine ideas before significant time is invested, it connects similar thinkers who might want to collaborate, and it builds confidence in concepts that show real promise.</p>
          
          <h3>Collaborative Assistance</h3>
          <p>Beyond validation, our community excels at providing practical assistance. Need help with a technical implementation? Looking for feedback on a user interface design? Seeking advice on project management? Our forums connect you with members who have relevant expertise and are eager to help.</p>
        </div>

        <div id="getting-started" class="community-section">
          <h2>Pushing Ideas Forward</h2>
          <p>Our community infrastructure is designed around one core principle: <strong>anyone can push forward with their ideas</strong>. Whether you're a seasoned professional or someone completely new to the field, our systems provide the support structure needed to transform concepts into reality.</p>
          
          <div class="highlight-box">
            <h3>From Concept to Implementation</h3>
            <p>Start in the Creative Forum with your raw idea. Engage with the community to refine and develop the concept. When you're ready to move toward implementation, transition to the Project Forum where you can find collaborators, plan development phases, and track progress toward your goals.</p>
          </div>
          
          <p>The progression from creative exploration to project development isn't just a structural feature—it's a reflection of how innovation actually works. Ideas need space to breathe and evolve before they're ready for the constraints of implementation. Our dual-forum system honors this natural progression while providing tools and community support at every stage.</p>
          
          <p>Join our Discord server to get started with real-time conversations, then dive into our bulletin-board systems when you're ready to develop ideas more formally. The community is here to support your journey from initial spark to finished project.</p>
        </div>
      </div>
    </div>
  </div>
</div> 