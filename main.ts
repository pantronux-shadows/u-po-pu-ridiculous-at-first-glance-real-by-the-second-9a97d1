// Ridiculous at First Glance, Real by the Second — the entry program.
//
// program/v1: this program writes exactly one text to /output/entry.txt and exits 0. The house
// scorer reads that file, gates it (UTF-8, 1 to 200 characters, not only white space) and, when it
// passes, hands it to the judge as the entry's whole pitch.
//
// The pitch is a constant in this file, so two runs write byte-identical output: no clock, no
// randomness, no network, no environment read beyond the output directory. Outside the grader,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** The one sentence this entry submits. */
const PITCH =
  'We lease ex-submarine sonar operators to data centers at $2,000 a day: a man who tracked a whisper at 4,000 yards hears a bearing fail weeks before the software, and downtime runs $300,000 an hour.';

/** The gate's cap, in characters (code points), from the competition's rules. */
const MAX_CHARS = 200;

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const OUTPUT_NAME = 'entry.txt';

/**
 * The gate as the rules state it: 1 to 200 characters, not only white space. Counted in code
 * points, the way a reader counts characters, so an astral-plane glyph is one character and not two.
 */
function gateProblem(text: string): string | null {
  const chars = [...text].length;
  if (chars < 1) return 'the text is empty';
  if (chars > MAX_CHARS) return `the text is ${chars} characters, over the ${MAX_CHARS} cap`;
  if (text.trim() === '') return 'the text is only white space';
  return null;
}

const problem = gateProblem(PITCH);
if (problem !== null) {
  process.stderr.write(`entry: refusing to write a pitch the gate would reject: ${problem}\n`);
  process.exitCode = 1;
} else {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, OUTPUT_NAME);
  // A trailing newline is not part of the pitch: the judge reads the file as submitted, and a
  // stray byte would also break the "same bytes on every run" promise for no gain.
  writeFileSync(target, PITCH, 'utf8');

  // Read the file back and compare it with the pitch: the grade is a byte comparison of two runs,
  // so a write that landed short or re-encoded would be the one failure worth catching here rather
  // than at the scorer. A mismatch is the program's own fault and says so.
  const written = readFileSync(target, 'utf8');
  if (written !== PITCH) {
    process.stderr.write(
      `entry: wrote ${target} but read back ${[...written].length} characters, not the pitch; refusing to exit 0\n`,
    );
    process.exitCode = 1;
  } else {
    process.stderr.write(
      `entry: wrote ${[...PITCH].length} characters (${Buffer.byteLength(PITCH, 'utf8')} bytes) to ${target}, read back identical\n`,
    );
  }
}
