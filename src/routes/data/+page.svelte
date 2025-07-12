<script lang="ts">
import { onMount } from 'svelte';
let container: HTMLDivElement;
onMount(() => {
  if (container) {
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 10);
  }
});
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-black text-white">
  <div class="flex flex-col items-center" bind:this={container} style="opacity:0;">
    <div class="text-[6vw] font-normal font-helvetica">Data</div>
    <div class="mt-4 text-xl font-courier">Deku</div>
  </div>
</div> 