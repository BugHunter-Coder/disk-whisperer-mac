# MeshMemory Guide

## Structure
- `brain/manifest.json` — project stack, conventions, session count
- `nodes/<feature>.node.json` — per-feature memory (what was built, patterns, warnings)
- `deltas/current.delta.json` — handoff packet for the next agent
- `deltas/history/` — archived deltas from past sessions
- `adr/` — Architecture Decision Records (ADR-001-*.md)

## Node Schema
```json
{
  "id": "auth",
  "summary": "what this feature does",
  "files": ["src/auth/..."],
  "patterns": ["JWT with RS256", "refresh token rotation"],
  "dependencies": ["db"],
  "warnings": ["token secret must never be logged"],
  "lastUpdated": "ISO timestamp",
  "cycleCount": 3
}
```

## Delta Schema
```json
{
  "sessionId": "ISO timestamp",
  "agentNumber": 2,
  "completed": ["Built POST /auth/login", "Added refresh token"],
  "inProgress": ["Email verification flow — 60% done"],
  "nextAgentShouldDo": ["Complete email verification", "Add rate limiting"],
  "handoffNote": "Plain English note for the next agent.",
  "filesChanged": ["src/auth/login.ts", "src/auth/refresh.ts"]
}
```

## Agent Rules
1. On session start: read manifest + current.delta.json before touching source files
2. During session: update relevant nodes as you build
3. On session end: archive current.delta.json to history/, write new current.delta.json
4. Write ADRs for any significant architectural decision debated
