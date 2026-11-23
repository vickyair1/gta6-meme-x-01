// gta6-meme-x-01 — "Post a GTA 6 meme on X" (Node 22, standard library only).
//
// The entry is the X post itself: the meme (meme.png, made in the session that
// built this repository) is posted on X from a public account with make.fun /
// @makefunai and the entrant's play code in its text, and POST.json names the
// post's address. This program copies POST.json to the output directory, which
// is all the gate needs from it: the house reads the post from X and judges
// the post's first picture and its text. Nothing this program writes about the
// post is judged.
//
// Locally:  mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
