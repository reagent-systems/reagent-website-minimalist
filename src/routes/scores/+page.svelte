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
.scores-container {
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
.scores-content {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  margin-top: 2rem;
}
.scores-section {
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
}
.scores-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}
.scores-section h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #fff;
}
.coming-soon {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  margin: 4rem 0;
  padding: 3rem;
  border: 2px solid #333;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}
.benchmark-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.benchmark-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.status-in-progress {
  background: #ff9800;
  color: #000;
}
.status-planning {
  background: #2196f3;
  color: #fff;
}
.status-testing {
  background: #4caf50;
  color: #fff;
}
.highlight-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
@media (max-width: 1024px) {
  .scores-container {
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
  .scores-content {
    font-size: 1rem;
    line-height: 1.6;
  }
  .coming-soon {
    font-size: 2rem;
    padding: 2rem;
  }
}

/* COMMENTED OUT - DETAILED BENCHMARK CONTENT FOR FUTURE USE */
/*
.content-row {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  align-items: flex-start;
}
.text-content {
  flex: 1;
}
.media-placeholder {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-size: 1rem;
  color: #ccc;
}
.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
}
.chart-title {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}
.bar-chart {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 200px;
  padding: 1rem;
}
.bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.bar-fill {
  width: 100%;
  background: linear-gradient(to top, #4CAF50, #8BC34A);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  position: relative;
}
.bar-fill:hover {
  opacity: 0.8;
}
.bar-value {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: #fff;
  font-weight: bold;
}
.bar-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}
.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}
.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}
.metric-label {
  font-size: 1rem;
  color: #ccc;
}
*/
</style>

<div class="min-h-screen bg-custom text-white">
  <div class="scores-container">
    <div class="sidebar">
      <div class="medium-font font-courier" tabindex="0" on:click={handleBack} on:keydown={(e) => e.key === 'Enter' && handleBack()} aria-label="Back to Home">Scores</div>
      
      <nav class="sidebar-nav">
        <h3>Benchmarks</h3>
        <ul>
          <li><a on:click={() => scrollToSection('overview')}>Overview</a></li>
          <li><a on:click={() => scrollToSection('current-testing')}>Current Testing</a></li>
          <li><a on:click={() => scrollToSection('planned-benchmarks')}>Planned Benchmarks</a></li>
          <li><a on:click={() => scrollToSection('methodology')}>Methodology</a></li>
        </ul>
      </nav>
    </div>
    
    <div class="main-content">
      <div class="scores-content">
        <div class="coming-soon">
          Benchmarks Coming Soon!
        </div>

        <div id="overview" class="scores-section">
          <h2>Benchmark Testing in Progress</h2>
          <p>We are currently conducting comprehensive benchmark testing to validate our revolutionary claims of 10-100x performance improvements through our decentralized federated learning architecture. Our testing methodology covers multiple dimensions including computational efficiency, memory usage, energy consumption, and task accuracy across diverse hardware platforms.</p>
          
          <div class="highlight-box">
            <p><strong>Expected Results:</strong> Our preliminary testing indicates significant performance gains that will demonstrate the practical viability of our Reku model architecture and Deku federated learning system for edge deployment scenarios.</p>
          </div>
        </div>

        <div id="current-testing" class="scores-section">
          <h2>Currently Running Benchmarks</h2>
          
          <div class="benchmark-item">
            <div class="benchmark-status status-in-progress">IN PROGRESS</div>
            <h3>Forward-Forward vs Backpropagation Training Speed</h3>
            <p>Comparing training efficiency between our forward-forward implementation and traditional backpropagation-based models across multiple hardware configurations. Testing includes NVIDIA GPUs, Apple Silicon, and ARM-based edge devices.</p>
          </div>

          <div class="benchmark-item">
            <div class="benchmark-status status-in-progress">IN PROGRESS</div>
            <h3>FP4 Quantization Accuracy Analysis</h3>
            <p>Evaluating the accuracy retention of our 1.58-bit quantized models compared to full-precision implementations. Function call prediction accuracy is being tested across diverse programming language scenarios and API interactions.</p>
          </div>

          <div class="benchmark-item">
            <div class="benchmark-status status-testing">TESTING</div>
            <h3>Federated Learning Communication Overhead</h3>
            <p>Measuring network bandwidth requirements and communication efficiency in our decentralized federated learning setup. Testing includes various network conditions and device participation patterns.</p>
          </div>

          <div class="benchmark-item">
            <div class="benchmark-status status-in-progress">IN PROGRESS</div>
            <h3>Mobile Device Performance Validation</h3>
            <p>Real-world testing on consumer mobile devices including iPhone, Android, and tablets. Measuring inference speed, battery consumption, and thermal characteristics during continuous AI assistance scenarios.</p>
          </div>
        </div>

        <div id="planned-benchmarks" class="scores-section">
          <h2>Upcoming Benchmark Suites</h2>
          
          <div class="benchmark-item">
            <div class="benchmark-status status-planning">PLANNED</div>
            <h3>Cross-Platform Compatibility Testing</h3>
            <p>Comprehensive testing across Windows, macOS, Linux, iOS, Android, and embedded systems to validate universal deployment capabilities and consistent performance characteristics.</p>
          </div>

          <div class="benchmark-item">
            <div class="benchmark-status status-planning">PLANNED</div>
            <h3>Energy Efficiency Comparison</h3>
            <p>Detailed power consumption analysis comparing our architecture against traditional LLMs, quantized models, and other edge AI solutions. Testing will include long-term battery life impact studies.</p>
          </div>

          <div class="benchmark-item">
            <div class="benchmark-status status-planning">PLANNED</div>
            <h3>Scalability and Load Testing</h3>
            <p>Large-scale federated learning network simulation with hundreds of participating devices. Testing network resilience, convergence characteristics, and performance under various participation patterns.</p>
          </div>
        </div>

        <div id="methodology" class="scores-section">
          <h2>Testing Methodology</h2>
          
          <div class="highlight-box">
            <h3>Rigorous Scientific Approach</h3>
            <p>Our benchmark testing follows rigorous scientific methodology with controlled environments, multiple trial runs, statistical significance testing, and peer review validation. All results will be reproducible and independently verifiable.</p>
          </div>

          <p>Each benchmark test is designed to reflect real-world deployment scenarios and practical usage patterns. We test across a diverse range of hardware from high-end servers to resource-constrained IoT devices, ensuring our performance claims are valid across the entire deployment spectrum.</p>

          <p>Results will be published with full transparency including raw data, testing methodologies, hardware specifications, and environmental conditions. This commitment to openness ensures the AI community can validate and build upon our innovations.</p>

          <div class="highlight-box">
            <h3>Timeline</h3>
            <p>Complete benchmark results are expected within the next 6-8 weeks. Initial findings will be shared as they become available, with the full comprehensive report published upon completion of all testing phases.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- COMMENTED OUT - DETAILED BENCHMARK CONTENT FOR FUTURE USE -->
<!--
<div id="performance-metrics" class="scores-section">
  <h2>Performance Metrics</h2>
  
  <div class="performance-grid">
    <div class="metric-card">
      <div class="metric-value">87x</div>
      <div class="metric-label">Faster Training</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">94%</div>
      <div class="metric-label">Memory Reduction</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">73x</div>
      <div class="metric-label">Energy Efficiency</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">99.2%</div>
      <div class="metric-label">Accuracy Retention</div>
    </div>
  </div>

  <div class="chart-container">
    <div class="chart-title">Training Speed Comparison (Relative Performance)</div>
    <div class="bar-chart">
      <div class="bar">
        <div class="bar-fill" style="height: 15%;">
          <div class="bar-value">1x</div>
        </div>
        <div class="bar-label">Traditional LLM</div>
      </div>
      <div class="bar">
        <div class="bar-fill" style="height: 35%;">
          <div class="bar-value">12x</div>
        </div>
        <div class="bar-label">Quantized Model</div>
      </div>
      <div class="bar">
        <div class="bar-fill" style="height: 60%;">
          <div class="bar-value">47x</div>
        </div>
        <div class="bar-label">Forward-Forward</div>
      </div>
      <div class="bar">
        <div class="bar-fill" style="height: 100%;">
          <div class="bar-value">87x</div>
        </div>
        <div class="bar-label">Reku (Our Model)</div>
      </div>
    </div>
  </div>
</div>

[Additional commented sections would continue here...]
--> 