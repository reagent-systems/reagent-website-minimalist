# Creating a Content Page from a GitHub Link

This guide explains how to add a new content page to your SvelteKit site based on a GitHub repository, and how to link it from the appropriate section of your site.

---

## 1. Receive the GitHub Link
- Example: `https://github.com/reagent-systems/orc`

## 2. Extract Key Content
- Visit the repository and review the README and project description.
- Summarize the project in 2-3 sentences for the page description.
- Note the official repository link for attribution and linking.

## 3. Determine Placement
- If the project is a core agent or app, place the content page at the top level (e.g., `/orc`, `/simple-agent`).
- If it is a sub-feature or belongs to a specific section, place it under the relevant route (e.g., `/agent/feature-x`).

## 4. Create the Content Page
- Use the established content page style:
  - Left-aligned heading in Courier New.
  - Justified description text.
  - Fade-in effect on load.
  - Centered, animated underline link to the GitHub repo at the bottom.
  - Heading is clickable and returns to the parent section (e.g., `/agent`).
- Example file: `src/routes/orc/+page.svelte`

## 5. Update Navigation Links
- Find the section (e.g., `/agent`) where the new content page should be linked.
- Add or update the small words (links) to include the new page, pointing to the correct route (e.g., `/orc`).
- Ensure the link uses the same animated underline and font style as other links.

## 6. Test Navigation
- Click the new link from the parent section to ensure it routes to the new content page.
- Click the heading on the content page to ensure it returns to the parent section.

## 7. Consistency
- Ensure all new content pages follow the same layout, font, and transition conventions as existing pages.

---

## Example Workflow
1. **User provides a GitHub link** (e.g., for ORC).
2. **Assistant extracts summary and repo link** from the README.
3. **Assistant creates `/orc` content page** with heading, description, and GitHub link.
4. **Assistant updates `/agent` page** to link to `/orc` in the small words section.
5. **User can now navigate from `/agent` to `/orc` and back, with consistent style and transitions.

---

This process ensures that adding new content pages from GitHub projects is fast, consistent, and always integrated into your site's navigation. 