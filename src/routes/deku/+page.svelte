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
.deku-container {
  max-width: 1400px;
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
.deku-content {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  margin-top: 2rem;
}
.deku-section {
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
}
.deku-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}
.subsection {
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 2px solid #333;
}
.subsection h3 {
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
.coming-soon {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin: 4rem 0;
  padding: 2rem;
  border: 2px solid #333;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}
@media (max-width: 1024px) {
  .deku-container {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .sidebar {
    width: 100%;
    position: static;
  }
}
@media (max-width: 768px) {
  .deku-content {
    font-size: 1rem;
    line-height: 1.6;
  }
  .coming-soon {
    font-size: 1.5rem;
  }
}
</style>

<div class="min-h-screen bg-custom text-white">
  <div class="deku-container">
    <div class="sidebar">
      <div class="medium-font font-courier" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Home">Deku</div>
      
      <nav class="sidebar-nav">
        <h3>Contents</h3>
        <ul>
          <li><a on:click={() => scrollToSection('overview')}>Overview</a></li>
          <li><a on:click={() => scrollToSection('architecture')}>Architecture</a></li>
          <li><a on:click={() => scrollToSection('federated-learning')}>Federated Learning</a></li>
          <li><a on:click={() => scrollToSection('quantization')}>Quantization</a></li>
          <li><a on:click={() => scrollToSection('embedding')}>App Embedding</a></li>
          <li><a on:click={() => scrollToSection('advantages')}>Advantages</a></li>
        </ul>
      </nav>
    </div>
    
    <div class="main-content">
      <div class="deku-content">
        <div id="overview" class="deku-section">
          <h2>Deku: Decentralized Federated Learning Network</h2>
          <p>Deku represents our revolutionary approach to model training through a decentralized federated learning network. This system enables the training of highly efficient, privacy-preserving language models that can be embedded directly into applications without relying on centralized cloud infrastructure.</p>
          
          <div class="highlight-box">
            <p><strong>Our mission:</strong> Train language models far cheaper, faster, and more privately than traditional methods while enabling deployment on edge devices and mobile platforms.</p>
          </div>
          
          <p>By leveraging advanced techniques like Hinton's forward-forward algorithm, FP4 quantization, and ternary weights, Deku eliminates the need for massive GPU data centers while delivering superior performance and privacy guarantees.</p>
        </div>

        <div id="architecture" class="deku-section">
          <h2>Novel Architecture</h2>
          
          <div id="forward-forward" class="subsection">
            <h3>Forward-Forward Algorithm</h3>
            <p>At the core of Deku lies our implementation of Hinton's forward-forward algorithm, which replaces traditional backpropagation with two forward passes of positive and negative information. This approach enables true parallelization of model training and eliminates the computational bottlenecks associated with gradient descent.</p>
            
            <p>The forward-forward method processes function call sequences through dual passes, allowing the model to learn from both successful and failed execution patterns. This biologically-inspired approach not only improves training efficiency but also enables local learning without the need for centralized gradient aggregation.</p>
          </div>

          <div id="quantization" class="subsection">
            <h3>1.58-Bit FP4 Quantization</h3>
            <p>Our quantization strategy achieves extreme model compression through ternary weights (log2(3) ≈ 1.58 bits) combined with FP4 precision for activations. This represents a breakthrough in model efficiency, reducing memory requirements by orders of magnitude while maintaining accuracy.</p>
            
            <p>Key innovations include oscillation-reduced training techniques that stabilize low-precision computations and specialized quantization-aware training protocols designed specifically for federated environments. These methods minimize precision loss while enabling deployment on resource-constrained edge devices.</p>
          </div>
        </div>

        <div id="federated-learning" class="deku-section">
          <h2>Federated Learning Framework</h2>
          <p>Deku's federated learning capabilities enable model training across distributed networks of edge devices while preserving data privacy. Unlike traditional centralized approaches, our system keeps all training data local to individual devices, sharing only model updates through secure aggregation protocols.</p>
          
          <div class="subsection">
            <h3>Privacy-Preserving Training</h3>
            <p>Our federated approach incorporates differential privacy through Gaussian noise injection and secure aggregation mechanisms. This ensures that individual user data remains protected while still enabling collaborative model improvement across the network.</p>
            
            <p>Function call datasets generated by application usage are processed locally, with only anonymized model updates transmitted to the network. This approach eliminates privacy risks associated with centralized data collection while enabling continuous model evolution.</p>
          </div>

          <div class="subsection">
            <h3>Communication Optimization</h3>
            <p>To address communication overhead in federated settings, Deku implements top-k sparsification and FP4 compression, reducing network payload by up to 75%. These optimizations make federated training viable even on bandwidth-constrained mobile networks.</p>
          </div>
        </div>

        <div id="embedding" class="deku-section">
          <h2>Seamless App Integration</h2>
          <p>Deku is designed for easy embedding into applications across any platform. Our lightweight runtime can be integrated into mobile apps, web applications, IoT devices, and even microcontroller-based systems.</p>
          
          <div class="highlight-box">
            <p><strong>Universal Compatibility:</strong> From mobile processors to GPIO-connected hardware modules, Deku adapts to work with any device, automatically determining optimal configuration based on available resources.</p>
          </div>
          
          <p>The embedded system learns from application-specific function calls, continuously improving its performance for domain-specific tasks. This creates a personalized AI experience that evolves with user behavior while maintaining privacy.</p>
          
          <div class="subsection">
            <h3>Hardware Modules</h3>
            <p>Our vision extends to dedicated AI hardware modules that can be soldered directly to PCBs or connected via GPIO interfaces. These modules would enable any device to benefit from AI capabilities without compatibility concerns, as the AI system intelligently adapts to its connected environment.</p>
          </div>
        </div>

        <div id="advantages" class="deku-section">
          <h2>Competitive Advantages</h2>
          <p>Deku offers compelling advantages over traditional cloud-based AI solutions, particularly in mobile and edge computing scenarios where current approaches face significant limitations.</p>
          
          <div class="subsection">
            <h3>Cost & Performance</h3>
            <p>Our approach achieves 10-100x cost reductions compared to centralized GPU clusters while delivering faster response times through local processing. The elimination of cloud API calls removes latency bottlenecks and reduces operational expenses.</p>
          </div>

          <div class="subsection">
            <h3>Privacy & Security</h3>
            <p>By keeping data processing local, applications using Deku eliminate the need for complex authentication and credential handling systems. User data never leaves the device, addressing privacy concerns that limit AI adoption in sensitive applications.</p>
          </div>

          <div class="subsection">
            <h3>Accessibility</h3>
            <p>Deku democratizes AI by removing barriers for small and medium enterprises that lack access to expensive GPU infrastructure. Our federated approach enables participation in cutting-edge AI development regardless of resource constraints.</p>
          </div>
        </div>

        <div class="coming-soon">
          Coming Soon!
        </div>
      </div>
    </div>
  </div>
</div> 