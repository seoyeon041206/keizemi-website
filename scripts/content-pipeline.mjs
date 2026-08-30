import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'content');
const generatedRoot = path.join(contentRoot, 'generated');

async function readCollection(name) {
  const directory = path.join(contentRoot, name);
  const filenames = (await readdir(directory)).filter((filename) => filename.endsWith('.json'));
  const records = await Promise.all(filenames.map(async (filename) => JSON.parse(await readFile(path.join(directory, filename), 'utf8'))));
  return records.sort((left, right) => (left.order ?? 99999) - (right.order ?? 99999) || String(left.id ?? left.slug).localeCompare(String(right.id ?? right.slug), 'ja'));
}

async function buildGeneratedContent() {
  const [seminars, posts, pearlSeminars, faqs] = await Promise.all([
    readCollection('seminars'),
    readCollection('news'),
    readCollection('pearl-seminars'),
    readCollection('faqs'),
  ]);

  await mkdir(generatedRoot, { recursive: true });
  const outputs = {
    'seminars.json': seminars,
    'posts.json': posts.sort((left, right) => String(right.date).localeCompare(String(left.date)) || (right.id ?? 0) - (left.id ?? 0)),
    'pearl-seminars.json': pearlSeminars,
    'faqs.json': faqs,
    'site-index.json': {
      posts: posts.map(({ id, title, date, excerpt, categories }) => ({ id, title, date, excerpt, categories })),
      seminars: seminars.map(({ id, slug, name, professorName, field, status, pearl, dd, languages, description, excerpt, image, url }) => ({
        id,
        slug,
        name,
        professorName,
        field,
        status,
        pearl,
        dd,
        languages,
        description,
        excerpt,
        image,
        url,
      })),
    },
  };

  await Promise.all(Object.entries(outputs).map(([filename, value]) => writeFile(path.join(generatedRoot, filename), `${JSON.stringify(value, null, 2)}\n`, 'utf8')));
}

await buildGeneratedContent();
