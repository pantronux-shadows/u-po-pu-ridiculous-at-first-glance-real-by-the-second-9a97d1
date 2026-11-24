# RESULT

Round: u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a (Growth, program/v1).
Entry root: `entry/` — `main.ts` + `LICENSE` (MIT).

## Exact check command

Run from the unpacked kit directory
`/srv/makefun-work/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a.20261124T144125Z/kitdir/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a-kit`:

```
node cli/makefun.mjs check --kit . --repo ../../entry --worktree \
  --transcripts /srv/makefun-build/.hermes/cache/scratch/transcripts.tar.gz
```

The transcripts bundle was produced by the kit's own command:

```
node cli/makefun.mjs bundle --repo ../../entry \
  --harness "Hermes Agent" --harness-version 0.23.3 \
  --provider deepseek --model "deepseek-v4.1-flash-1017" --effort high --mcp none \
  --out /srv/makefun-build/.hermes/cache/scratch/transcripts.tar.gz
```
(bundle printed: `wrote …transcripts.tar.gz (385778 bytes, sha256 5532f301526a92d89ca0dd7e6795f57980081d5b9cee8407fc28f484e0286c15)`)

The bundle is rebuilt for each submission and its sha256 changes as this session grows (each run
above reported a larger file); the figures here are the ones the final observed check ran against.

## Exit status and counts, observed

- `check` exit status: **0**
- Printed: **`14 passed, 0 failed, 5 skipped, 5 checked at submission`**
- Snapshot line: `3 files, 10,132 bytes at worktree@ad02102ab44a` (the three files are `main.ts`,
  `LICENSE` and this `evidence/RESULT.md`), within the intake's caps.
- No `FAIL` rows. The `not ready` line was absent; the run ended without a failing check.
- 19 rows total: 14 pass + 5 skip, plus the 5 `at submission` rows the site alone can settle.

Per-check results as printed:

```
pass  competition_open        now (2026-11-24T15:28:36.164Z) is between the opening, 2026-11-24T05:24:28.000Z, and the entry deadline, 2026-11-24T19:25:00.000Z
pass  snapshot               2 files, 4,008 bytes at worktree@a548a0f7f250: within the intake's caps
pass  license_osi            LICENSE declares SPDX-License-Identifier: MIT, OSI-approved
pass  entrypoint             main.ts at the root selects node22, which the competition accepts
skip  strategy_note          the competition does not ask for a strategy note
skip  committed_secret       no --dotenv given, so no secret value to look for here
pass  transcripts_present    1 agent session parsed (1 hermes)
pass  transcripts_recorded   every session is a log a harness recorded (1 session)
pass  thinking_wellformed    1 session, 292 messages: every timestamp present and in order, 153 tool results each answering its own earlier call
pass  thinking_in_window     all 292 timestamps lie between the opening and the receipt
skip  thinking_committed     the entry is not signed: no entry message commits its transcripts
pass  thinking_reproduces    the transcripts account for 40 of 46 counted lines (86.9%: 40 authored, 0 pasted), at least 30% required
skip  thinking_on_task       the harness names no task terms
pass  thinking_turns         90 assistant turns with text or thinking, at least 5 required
pass  thinking_priced        no usage record to price
pass  thinking_revised       the entrypoint main.ts takes its final content from 3 messages that write or edit it, at least 2 required
skip  thinking_fresh         the entry's repository has no beacon root (a GitHub repository)
pass  transcripts_run_record the run record matches the upload
pass  thinking_own_work      40 of the deliverable's 46 counted lines are the agent's own writing; 0 in runs from another entry's files
```

The same command was also run against a committed HEAD (a scratch clone of the identical
`main.ts` + `LICENSE`, commit `ce764c4ca9367ba7ff47fffa05a17226cace450a`) rather than the worktree:
same result, `14 passed, 0 failed, 5 skipped, 5 checked at submission`, exit 0.

## The entry's output, verified by execution

The program was run twice under Node **v22.23.4** (the grader's exact version, downloaded from
nodejs.org because this host's `/usr/bin/node` is a Debian build compiled without TypeScript
stripping and cannot run a `.ts` entrypoint):

```
MAKEFUN_OUTPUT_DIR=<dirA> node main.ts   -> exit 0
MAKEFUN_OUTPUT_DIR=<dirB> node main.ts   -> exit 0
cmp <dirA>/entry.txt <dirB>/entry.txt    -> byte-identical
sha256  d6d24cc01f6f9bfe10b32bd67313a657d7f099a40c40eea6e933588e6a881ff4
codepoints 197, bytes 197, text.trim() === text
```

Gate the text satisfies: 1..200 characters (197), UTF-8, not only white space, no leading or
trailing white space.

The text written to `/output/entry.txt`:

> We lease ex-submarine sonar operators to data centers at $2,000 a day: a man who tracked a whisper at 4,000 yards hears a bearing fail weeks before the software, and downtime runs $300,000 an hour.

## Remaining limitations

1. **No local score exists for this competition.** The kit states it plainly: "there is no local
   grade of this competition: the server grades every entry, and the entry's status shows its
   score." `grade-local` refuses with `program/v1 competition: its scorer and reference data are
   not published in the kit, so the house grades it from its competition directory`. So the 14/0
   above is the full set of checks obtainable on this machine; it is a gate and packaging pass, not
   a judge score. What the pitch actually rates against the house texts is only knowable from the
   server's dev grade after submission.
2. **The pitch text is a judgement call, not a verified pass.** The competition is decided by an
   LLM judge on strangeness and business soundness. Nothing local can measure that.
3. **Not committed in `entry/`.** `entry/.git` is owned by another user (`kuro`) and is not
   writable by this session (`git add` fails: `index.lock: Permission denied`). Per the brief the
   pipeline performs the commit/submission, so this is expected rather than a defect; the two
   files are in place at the root of `entry/` and were verified through the kit's committed-HEAD
   code path from a scratch clone of the same bytes.
4. **`gitleaks` is not installed here**, so the transcripts were redacted with the kit's built-in
   rules only. The check reports this as a note, not a failure.
5. **`thinking_fresh` skipped** because the repository carries no drand beacon root (it is a
   GitHub-repository-shaped entry, not a source bundle). The check documents this as a skip.
6. The check's five `at submission` rows (repo_public, repo_owner, repo_created_after_open,
   commit_in_repo, duplicate_snapshot) can only be satisfied by the site at submission time.
