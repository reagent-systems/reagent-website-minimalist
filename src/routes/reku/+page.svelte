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
.reku-container {
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
.reku-content {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  margin-top: 2rem;
}
.reku-section {
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
}
.reku-section h2 {
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
.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}
.tech-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.3s ease;
}
.tech-card:hover {
  border-color: #fff;
}
.tech-card h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
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
  .reku-container {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .sidebar {
    width: 100%;
    position: static;
  }
  .tech-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .reku-content {
    font-size: 1rem;
    line-height: 1.6;
  }
  .coming-soon {
    font-size: 1.5rem;
  }
}
</style>

<div class="min-h-screen bg-custom text-white">
  <div class="reku-container">
    <div class="sidebar">
      <div class="medium-font font-courier" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Home">Reku</div>
      
      <nav class="sidebar-nav">
        <h3>Contents</h3>
        <ul>
          <li><a on:click={() => scrollToSection('overview')}>Overview</a></li>
          <li><a on:click={() => scrollToSection('transformer-mods')}>Transformer Modifications</a></li>
          <li><a on:click={() => scrollToSection('forward-forward')}>Forward-Forward</a></li>
          <li><a on:click={() => scrollToSection('quantization')}>Quantization</a></li>
          <li><a on:click={() => scrollToSection('adaptive-features')}>Adaptive Features</a></li>
          <li><a on:click={() => scrollToSection('performance')}>Performance</a></li>
        </ul>
      </nav>
    </div>
    
    <div class="main-content">
      <div class="reku-content">
        <div id="overview" class="reku-section">
          <h2>Reku: Revolutionary Model Architecture</h2>
          <p>Reku represents a fundamental breakthrough in language model design, combining the efficiency of extreme quantization with innovative training paradigms. Our novel architecture transcends the limitations of traditional transformer-based models by eliminating backpropagation and enabling deployment across diverse hardware environments.</p>
          
          <div class="highlight-box">
            <p><strong>Core Innovation:</strong> A 1.58-bit FP4 quantized forward-forward based language model that achieves 10-100x cost reductions while maintaining high performance and enabling true edge deployment.</p>
          </div>
          
          <p>Built specifically for function call optimization, Reku addresses the fundamental inefficiencies of current LLM architectures that require tens of billions of dollars in GPU infrastructure for complex task handling.</p>
        </div>

        <div id="transformer-mods" class="reku-section">
          <h2>Modified Transformer Architecture</h2>
          <p>Reku fundamentally reimagines the transformer architecture by replacing traditional components with more efficient alternatives designed for edge deployment and federated learning scenarios.</p>
          
          <div class="subsection">
            <h3>Ternary Weight System</h3>
            <p>Our modified transformer employs ternary weights that compress model parameters to approximately 1.58 bits (log2(3)), achieving extreme compression without sacrificing functional capability. This approach differs significantly from traditional transformers that rely on high-precision weights (FP16/32).</p>
            
            <p>The ternary system uses three discrete states per weight, enabling highly efficient computation on specialized hardware while maintaining the expressive power needed for complex language understanding and generation tasks.</p>
          </div>

          <div class="subsection">
            <h3>Function Call Specialization</h3>
            <p>Unlike general-purpose language models, Reku is specifically optimized for function call sequences. This specialization allows for more efficient parameter usage and enables the model to achieve superior performance on structured tasks while using significantly fewer resources.</p>
          </div>
        </div>

        <div id="forward-forward" class="reku-section">
          <h2>Forward-Forward Training Algorithm</h2>
          <p>Reku implements Hinton's revolutionary forward-forward algorithm, completely eliminating backpropagation from the training process. This paradigm shift enables true parallelization and biologically-inspired learning mechanisms.</p>
          
          <div class="tech-grid">
            <div class="tech-card">
              <h4>Positive Pass</h4>
              <p>The positive forward pass processes successful function call patterns, reinforcing neural pathways that lead to correct executions. This pass strengthens connections that contribute to accurate function prediction and parameter estimation.</p>
            </div>

            <div class="tech-card">
              <h4>Negative Pass</h4>
              <p>The negative forward pass learns from failed execution patterns, helping the model avoid common pitfalls and edge cases. This contrastive learning approach improves robustness without requiring gradient computation.</p>
            </div>
          </div>

          <div class="subsection">
            <h3>Parallelization Benefits</h3>
            <p>By eliminating backpropagation's sequential dependency on gradient computation, the forward-forward algorithm enables massive parallelization of training across distributed devices. This is particularly crucial for federated learning scenarios where devices can contribute to model improvement independently.</p>
          </div>
        </div>

        <div id="quantization" class="reku-section">
          <h2>Advanced Quantization Techniques</h2>
          <p>Reku's quantization strategy combines multiple cutting-edge techniques to achieve unprecedented compression while maintaining model accuracy and functionality.</p>
          
          <div class="subsection">
            <h3>FP4 Precision for Activations</h3>
            <p>While weights use ternary quantization, activations employ 4-bit floating point precision (FP4). This asymmetric approach optimizes for both memory efficiency and computational accuracy, ensuring that information flow through the network maintains sufficient precision for complex reasoning.</p>
          </div>

          <div class="subsection">
            <h3>Oscillation-Reduced Training</h3>
            <p>Our quantization-aware training incorporates oscillation-reduction techniques originally developed for vision transformers. These methods stabilize low-precision computations during training, preventing the instabilities that typically plague extremely quantized models.</p>
          </div>

          <div class="subsection">
            <h3>SVD-Based Optimization</h3>
            <p>Post-training refinement uses Singular Value Decomposition (SVD) to absorb low-rank components and minimize quantization-induced accuracy drops. This mathematical optimization ensures that the model maintains its performance characteristics even under extreme compression.</p>
          </div>
        </div>

        <div id="adaptive-features" class="reku-section">
          <h2>Adaptive Model Features</h2>
          <p>Reku incorporates several adaptive mechanisms that allow it to dynamically optimize performance based on deployment environment and task requirements.</p>
          
          <div class="highlight-box">
            <h3>Dynamic Precision Adjustment</h3>
            <p>The model can adaptively adjust quantization precision based on layer importance and available computational resources, ensuring optimal performance across different hardware platforms.</p>
          </div>

          <div class="subsection">
            <h3>Hardware-Specific Optimization</h3>
            <p>Reku automatically detects and optimizes for specific hardware characteristics, from high-end mobile processors to microcontroller-based systems. This ensures maximum efficiency regardless of deployment target.</p>
          </div>

          <div class="subsection">
            <h3>Contextual Learning</h3>
            <p>The model continuously adapts to application-specific function call patterns, becoming more efficient and accurate for domain-specific tasks while maintaining general capability.</p>
          </div>
        </div>

        <div id="performance" class="reku-section">
          <h2>Performance Characteristics</h2>
          <p>Reku delivers exceptional performance across multiple dimensions, fundamentally changing what's possible with on-device AI deployment.</p>
          
          <div class="subsection">
            <h3>Computational Efficiency</h3>
            <p>Through the combination of ternary weights, FP4 activations, and forward-forward training, Reku achieves 10-100x improvements in computational efficiency compared to traditional transformer architectures while maintaining comparable accuracy on function call tasks.</p>
          </div>

          <div class="subsection">
            <h3>Memory Footprint</h3>
            <p>The extreme quantization enables deployment on devices with limited memory, opening up AI capabilities for embedded systems, IoT devices, and older mobile hardware that couldn't previously support language model inference.</p>
          </div>

          <div class="subsection">
            <h3>Energy Consumption</h3>
            <p>By eliminating the need for cloud connectivity and reducing computational requirements, Reku dramatically improves battery life and reduces energy consumption, making continuous AI assistance practical on mobile platforms.</p>
          </div>
        </div>

        <div class="coming-soon">
          Coming Soon!
        </div>
      </div>
    </div>
  </div>
</div> 