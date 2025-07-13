import { marked } from 'marked';

export async function load() {
  const repo = 'reagent-systems/dither';
  const repoUrl = `https://github.com/${repo}`;
  const res = await fetch('https://raw.githubusercontent.com/reagent-systems/dither/main/README.md');
  if (!res.ok) {
    return { title: 'Dither', html: '<p>Failed to fetch README from GitHub.</p>', link: repoUrl, screenshot: null };
  }
  const markdown = await res.text();
  // Extract the first line as title if it starts with #
  const lines = markdown.split('\n');
  let title = repo.split('/')[1];
  let startIdx = 0;
  if (lines[0].startsWith('# ')) {
    title = lines[0].replace(/^# /, '').trim();
    startIdx = 1;
  }
  // Find and remove the first image (screenshot)
  let screenshot = null;
  let imgIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    const match = lines[i].match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (match) {
      screenshot = match[1];
      imgIdx = i;
      break;
    }
  }
  if (imgIdx !== -1) {
    lines.splice(imgIdx, 1);
  }
  // Remove any trailing license/about/footer sections (optional, simple heuristic)
  let endIdx = lines.length;
  for (let i = lines.length - 1; i > startIdx; i--) {
    if (/^##? /i.test(lines[i]) && lines[i].toLowerCase().includes('license')) {
      endIdx = i;
      break;
    }
  }
  const mainBody = lines.slice(startIdx, endIdx).join('\n').trim();
  const html = marked(mainBody);
  // If screenshot is a relative path, make it absolute to the repo
  if (screenshot && !/^https?:\/\//.test(screenshot)) {
    screenshot = `https://raw.githubusercontent.com/${repo}/main/${screenshot.replace(/^\//, '')}`;
  }
  return { title, html, link: repoUrl, screenshot };
} 