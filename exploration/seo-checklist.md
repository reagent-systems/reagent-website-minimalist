# SEO Checklist for Minimalist SvelteKit Site

## 1. Meta Tags & Titles
- Ensure each page has a unique, descriptive `<title>`.
- Add a relevant `<meta name="description" ...>` for each page.
- Add Open Graph and Twitter meta tags for better social sharing previews.

## 2. Semantic HTML
- Use semantic tags: `<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`.
- Use heading hierarchy properly (`<h1>`, `<h2>`, etc.)—only one `<h1>` per page, describing the main topic.

## 3. Accessible & Descriptive Content
- Use alt text for all images (even decorative SVGs).
- Ensure link text is descriptive (avoid “click here”).
- Use ARIA labels where appropriate.

## 4. Performance Optimization
- Optimize images (use modern formats like WebP, compress SVGs).
- Use SvelteKit’s built-in code splitting and lazy loading.
- Minimize CSS and JS bundles (Tailwind is already a good choice).

## 5. Structured Data
- Add JSON-LD structured data for organization, articles, breadcrumbs, etc.
- Example for an organization:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reagent Systems",
    "url": "https://yourdomain.com"
  }
  </script>
  ```

## 6. Sitemap & Robots.txt
- Keep sitemap.xml and robots.txt up to date as you add new pages.

## 7. Internal Linking
- Link between related pages (e.g., from the main page to content pages and vice versa).
- Use breadcrumb navigation if your site structure gets deeper.

## 8. Mobile Friendliness
- Test on multiple devices.
- Use [Google’s Mobile-Friendly Test](https://search.google.com/test/mobile-friendly).

## 9. Page Speed
- Use [Google PageSpeed Insights](https://pagespeed.web.dev/) to identify bottlenecks.
- Optimize font loading (use `font-display: swap` for custom fonts).

## 10. Content Quality
- Write clear, concise, and original content.
- Use keywords naturally—don’t stuff them.
- Add FAQs or Q&A sections if relevant.

## 11. Canonical URLs
- Add `<link rel="canonical" href="..." />` to each page to avoid duplicate content issues.

## 12. Analytics & Search Console
- Add Google Analytics (or Plausible, Fathom, etc.) to monitor traffic.
- Register your site with Google Search Console and submit your sitemap.

## 13. Favicon & Manifest
- Add a favicon and a web app manifest for better browser and mobile integration.

## 14. 404 Page
- Create a custom, helpful 404 page with links back to main sections. 