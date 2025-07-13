import { marked } from 'marked';

export async function load() {
  const repo = 'reagent-systems/dither';
  const repoUrl = `https://github.com/${repo}`;
  const res = await fetch('https://raw.githubusercontent.com/reagent-systems/dither/main/README.md');
  if (!res.ok) {
    return { title: 'Dither', html: '<p>Failed to fetch README from GitHub.</p>', link: repoUrl };
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
  return { title, html, link: repoUrl };
} 