# Content Page Template: Simple-Agent Example

This template describes the layout and styling conventions for content pages, using the `simple-agent` page as a reference.

---

## Layout
- **Full screen** (`min-h-screen`) with a black background and white text.
- **Font:** All text uses Courier New (`font-courier`).
- **Main container:**
  - Responsive flex layout: `flex-col` on mobile, `flex-row` on `md` and up.
  - Left column: main content, max width 600px, with right padding (`pr-8`).
  - Right column: blank (reserved for future content), also with right padding (`pr-8`).
- **Vertical centering:** Both columns are vertically centered (`items-center justify-center flex-1`).

## Heading
- The main heading (e.g., `Simple-Agent`) is in its own div with the `medium-font` class (2rem, Courier New).

## Description
- The description is a single line in the code, but wraps responsively (`break-words`).
- Text is justified (`text-justify`) and full width (`w-full`).
- Use `mb-16` for spacing below the description.

## Bottom Link
- The GitHub (or other) link is in its own container, centered at the bottom (`w-full flex justify-center pb-12`).
- The link uses `underline-animate` for the animated underline hover effect, and `font-courier`.

## Fade-in Effect
- All main containers use the `fade-in` and `fade-in.visible` classes for a smooth opacity transition on page load.

---

## Example Structure

```svelte
<div class="min-h-screen flex flex-col bg-black text-white font-courier">
  <div class="flex flex-col md:flex-row flex-1 items-center justify-center">
    <div class="flex flex-col justify-center fade-in w-full md:w-1/2 pr-8 md:pr-8" class:visible={fadeIn} style="max-width:600px; margin-left:5vw;">
      <div class="medium-font mb-12">Simple-Agent</div>
      <div class="text-lg leading-relaxed w-full text-justify break-words mb-16">
        SimpleAgent is designed with the belief that AI agents don't need to be complex to be useful. By focusing on a small set of core operations and using function calling for all interactions, SimpleAgent remains easy to understand, modify, and extend while providing advanced features like dynamic tool loading, loop detection, and intelligent execution management.
      </div>
    </div>
    <div class="w-full md:w-1/2 pr-8 md:pr-8" />
  </div>
  <div class="w-full flex justify-center pb-12 fade-in" class:visible={fadeIn}>
    <a href="https://github.com/reagent-systems/Simple-Agent-Core" class="text-lg underline-animate font-courier" style="color:inherit; text-decoration:none;">
      https://github.com/reagent-systems/Simple-Agent-Core
    </a>
  </div>
</div>
```

---

## Notes
- Adjust the left and right column content as needed for each content page.
- Always use Courier New for all text on content pages.
- Use the fade-in and underline-animate classes for consistent transitions and link styling. 