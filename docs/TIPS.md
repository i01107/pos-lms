### Token Reduction Tips for your IDE:
1. **Use Rules Files:** If using Cursor or Windsurf, name File 1 `.clinerules` or `.cursorrules` in the project root so it auto-indexes without needing to manually paste it in prompts.
2. **Selective Referencing:** Use `@docs/JSON_SCHEMA.md` or `@LLM_CONTEXT.md` in your IDE chat window only when modifying relevant files.
3. **No Fluff:** The markdown above uses shorthand, direct code blocks, and TS interfaces, which LLMs comprehend much faster and cheaper than paragraphs of explanation.