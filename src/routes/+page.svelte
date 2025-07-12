<script lang="ts">
import { onMount } from 'svelte';
let highlighted = -1;
let hovered = [false, false, false, false, false];
let moving = [false, false, false, false, false];
let hoverTimeouts: Array<ReturnType<typeof setTimeout> | null> = [null, null, null, null, null];

function highlight(idx: number) {
  highlighted = idx;
  hovered[idx] = true;
  moving[idx] = true;
  clearTimeout(hoverTimeouts[idx]!);
  updateGlow();
}
function clearHighlight(idx: number) {
  highlighted = -1;
  moving[idx] = false;
  // Delay removal for smooth movement
  hoverTimeouts[idx] = setTimeout(() => {
    hovered[idx] = false;
    updateGlow();
  }, 250);
  updateGlow();
}
function updateGlow() {
  const words = document.querySelectorAll('.bigword');
  words.forEach((el, i) => {
    if (hovered[i]) {
      el.classList.add('hovered');
    } else {
      el.classList.remove('hovered');
    }
    if (moving[i]) {
      el.classList.add('moving');
    } else {
      el.classList.remove('moving');
    }
    // No glow logic
  });
}
onMount(updateGlow);
</script>

<style>
.big-words .bigword {
  transition: color 0.35s cubic-bezier(0.4,0,0.2,1), filter 0.35s cubic-bezier(0.4,0,0.2,1), text-shadow 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1);
  vertical-align: top;
  line-height: 1;
  backface-visibility: hidden;
  will-change: transform;
}
.big-words .bigword.moving {
  transform: translateX(4px);
}
.big-words.group:hover .bigword:not(.hovered) {
  color: #222 !important;
  filter: brightness(0.7);
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
</style>

<div class="min-h-screen flex flex-col justify-between bg-black text-white dark:bg-black dark:text-white bg-white text-black transition-colors duration-300">
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="flex flex-col big-words group" style="gap:0;">
      <a href="#" class="text-[6vw] font-normal text-left leading-none bigword"
        style="font-family: Helvetica, Arial, sans-serif;"
        class:moving={moving[0]} class:hovered={hovered[0]}
        on:mouseenter={() => highlight(0)} on:mouseleave={() => clearHighlight(0)}>
        <span>Data</span>
      </a>
      <a href="#" class="text-[6vw] font-normal text-left leading-none bigword"
        style="font-family: Helvetica, Arial, sans-serif; margin-top:-2px;"
        class:moving={moving[1]} class:hovered={hovered[1]}
        on:mouseenter={() => highlight(1)} on:mouseleave={() => clearHighlight(1)}>
        <span>Model</span>
      </a>
      <a href="#" class="text-[6vw] font-normal text-right leading-none bigword"
        style="font-family: Helvetica, Arial, sans-serif; margin-top:-8px;"
        class:moving={moving[2]} class:hovered={hovered[2]}
        on:mouseenter={() => highlight(2)} on:mouseleave={() => clearHighlight(2)}>
        <span>Agent</span>
      </a>
      <a href="#" class="text-[6vw] font-normal text-right leading-none bigword"
        style="font-family: Helvetica, Arial, sans-serif; margin-top:8px;"
        class:moving={moving[3]} class:hovered={hovered[3]}
        on:mouseenter={() => highlight(3)} on:mouseleave={() => clearHighlight(3)}>
        <span>App</span>
      </a>
      <a href="#" class="text-[6vw] font-normal text-right leading-none bigword"
        style="font-family: Helvetica, Arial, sans-serif;"
        class:moving={moving[4]} class:hovered={hovered[4]}
        on:mouseenter={() => highlight(4)} on:mouseleave={() => clearHighlight(4)}>
        <span>Repeat</span>
      </a>
    </div>
  </div>
  <div class="w-full flex justify-center pb-24">
    <div class="flex space-x-16">
      <a href="#" class="text-lg underline-animate" style="font-family: 'Courier New', Courier, monospace;">Pitch</a>
      <a href="#" class="text-lg underline-animate" style="font-family: 'Courier New', Courier, monospace;">Waitlist</a>
      <a href="#" class="text-lg underline-animate" style="font-family: 'Courier New', Courier, monospace;">Team</a>
      <a href="#" class="text-lg underline-animate" style="font-family: 'Courier New', Courier, monospace;">Social</a>
      <a href="#" class="text-lg underline-animate" style="font-family: 'Courier New', Courier, monospace;">Discord</a>
    </div>
  </div>
</div>
