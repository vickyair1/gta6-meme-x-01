// gta6-meme-x-01 — "Post a GTA 6 meme on X" (Node 22, standard library only).
//
// The entry is the X post itself: the meme (meme.png, made in the session that
// built this repository) is posted on X from a public account with make.fun /
// @makefunai and the entrant's play code in its text, and POST.json names the
// post's address. This program validates POST.json — it must name a real X
// post URL — then copies it to the output directory, which is all the gate
// needs from it: the house reads the post from X and judges the post's first
// picture and its text. Nothing this program writes about the post is judged.
//
// Locally:  mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8'));

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  throw new Error('POST.json must contain a JSON object with a url field');
}
if (typeof post.url !== 'string' || !post.url.startsWith('https://x.com/')) {
  throw new Error(
    `POST.json url must be a string starting with https://x.com/, got: ${JSON.stringify(post.url)}`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
