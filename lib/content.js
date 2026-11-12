import fs from 'fs';
import path from 'path';

// Everything people read on the poll page comes from content/poll.md.
// The "## " heading is the page title. Each "### Option N: Name (Hint)" heading becomes one voting option.

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function trimRule(text) {
  return text.replace(/\n-{3,}\s*$/, '').trim();
}

export function getPoll() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'poll.md'), 'utf8');
  const parts = raw.split(/^### /m);
  let intro = trimRule(parts[0]);
  const titleMatch = intro.match(/^##\s+(.*)\n/);
  const title = titleMatch ? titleMatch[1].trim() : 'User story format poll';
  if (titleMatch) intro = intro.slice(titleMatch[0].length).trim();

  const options = parts.slice(1).map((part) => {
    const lineEnd = part.indexOf('\n');
    const heading = part.slice(0, lineEnd).trim();
    const body = trimRule(part.slice(lineEnd + 1));
    const m = heading.match(/^Option\s+\d+:\s*(.*?)\s*\((.*)\)\s*$/);
    const name = m ? m[1] : heading.replace(/^Option\s+\d+:\s*/, '');
    const hint = m ? m[2] : '';
    return { id: slug(name), name, hint, body };
  });
  return { title, intro, options };
}

export function getOptionNames() {
  return getPoll().options.map(({ id, name }) => ({ id, name }));
}
