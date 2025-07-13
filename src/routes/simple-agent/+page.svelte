<script lang="ts">
import { onMount } from 'svelte';
let fadeIn = false;

onMount(() => {
  setTimeout(() => { fadeIn = true; }, 10);
});
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
</style>

<div class="min-h-screen flex flex-row items-center justify-center bg-black text-white font-courier">
  <div class="flex flex-col justify-center fade-in" class:visible={fadeIn} style="flex:1; max-width:600px; margin-left:5vw;">
    <div class="text-4xl mb-12">Simple-Agent</div>
    <div class="text-lg leading-relaxed whitespace-pre-line mb-16">
      SimpleAgent is designed with the belief that AI agents don't need to be
      complex to be useful. By focusing on a small set of core operations and
      using function calling for all interactions, SimpleAgent remains easy to
      understand, modify, and extend while providing advanced features like
      dynamic tool loading, loop detection, and intelligent execution management.
    </div>
    <a href="https://github.com/reagent-systems/Simple-Agent-Core" class="text-lg underline-animate font-courier" style="color:inherit; text-decoration:none; margin-top:2rem;">
      https://github.com/reagent-systems/Simple-Agent-Core
    </a>
  </div>
  <div style="flex:1;" />
</div> 