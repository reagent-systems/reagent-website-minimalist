# Navigation Page Template: App, Data, Model, Repeat, Agent

This template describes the layout and styling conventions for navigation pages (App, Data, Model, Repeat, Agent).

---

## Layout
- **Full screen** (`min-h-screen`) with a black background and white text.
- **Font:**
  - Big words use Helvetica (`font-helvetica`).
  - Small words use Courier New (`font-courier`).
- **Main container:**
  - Vertically and horizontally centered content using flex.
  - Big words are stacked vertically, each in their own container for future linking.
  - Small words (bottom nav) are horizontally spaced and centered at the bottom.

## Big Words (Main Navigation)
- Each big word is a link to its respective route.
- **Font:** Helvetica, large size (`text-[6vw]`), `font-normal`.
- **Alignment:**
  - Data, Model: left-aligned.
  - Agent, App, Repeat: right-aligned.
  - Use margin and text alignment for fine-tuning.
- **Hover effect:**
  - Moves right by 4px (`translateX(4px)`) on hover.
  - All other big words darken when one is hovered.
  - Smooth transitions for color and movement.
- **Exit transition:**
  - On click, all content slides left off-screen, then navigates to the new route.
- **Fade-in:**
  - Content fades in on page load.

## Small Words (Bottom Navigation)
- Each small word is a link (or placeholder) with animated underline on hover (`underline-animate`).
- **Font:** Courier New, `text-lg`.
- **Layout:** Centered, spaced horizontally (`space-x-16`), at the bottom with padding (`pb-24`).

## Responsiveness
- Layout and spacing are responsive and look good on all screen sizes.

---

## Example Structure

```svelte
<div class="min-h-screen flex flex-col justify-between bg-black text-white font-helvetica">
  <div class="flex-1 flex flex-col items-center justify-center fade-in" class:visible={fadeIn} class:slide-left={sliding}>
    <div class="flex flex-col big-words group" style="gap:0;">
      <a href="/data" class="text-[6vw] font-normal text-left leading-none bigword font-helvetica" ...>Data</a>
      <a href="/model" class="text-[6vw] font-normal text-left leading-none bigword font-helvetica" ...>Model</a>
      <a href="/agent" class="text-[6vw] font-normal text-right leading-none bigword font-helvetica" ...>Agent</a>
      <a href="/app" class="text-[6vw] font-normal text-right leading-none bigword font-helvetica" ...>App</a>
      <a href="/repeat" class="text-[6vw] font-normal text-right leading-none bigword font-helvetica" ...>Repeat</a>
    </div>
  </div>
  <div class="w-full flex justify-center pb-24 fade-in" class:visible={fadeIn} class:slide-left={sliding}>
    <div class="flex space-x-16">
      <a href="#" class="text-lg underline-animate font-courier">Pitch</a>
      <a href="#" class="text-lg underline-animate font-courier">Waitlist</a>
      <a href="#" class="text-lg underline-animate font-courier">Team</a>
      <a href="#" class="text-lg underline-animate font-courier">Social</a>
      <a href="#" class="text-lg underline-animate font-courier">Discord</a>
    </div>
  </div>
</div>
```

---

## Notes
- Use the same transition and fade-in logic for all navigation pages.
- Fine-tune alignment and spacing for each big word as needed.
- All navigation and interactivity should be consistent across pages. 