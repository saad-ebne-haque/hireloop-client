<!-- BEGIN:nextjs-agent-rules -->

## Git commit workflow

- When the user asks for a commit message or says "commit" in a prompt, do not run `git commit`, `git push`, or any other commit/push command.
- First inspect and understand the current Git changes in the workspace.
- Generate and return a meaningful, detailed commit message that summarizes the actual changes.
- Prefer a concise subject line with a blank line followed by a bulleted or descriptive body.
- Include affected areas and important implementation or behavior changes; do not invent changes that are not present.
- Do not modify files merely to create the commit message unless the user separately asks for code changes.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
