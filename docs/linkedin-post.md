# LinkedIn Post

---

The World Cup is on. I decided to learn something new. So I built a live AI match predictor for WC2026 — and used it as an excuse to properly explore **Spec Driven Development**.

Here's the idea behind SDD: write your data contracts *first*, as executable schemas. Not TypeScript interfaces, not documentation — actual Zod schemas that simultaneously act as:
- the spec (what does a player rating contain?)
- the runtime validator (is the AI's response actually valid?)
- the TypeScript type (no separate interface needed)

One schema, three jobs. The whole codebase stays in sync automatically.

For the project itself — I used the Anthropic (Claude) API to generate per-player ratings (0–10) with reasoning, scoreline predictions, goalscorer probabilities, and tactical analysis from live match data. Football-data.org provides the free-tier match and squad data. When Claude spend approaches my $5 budget cap, the system automatically falls back to Groq (free Llama 3.3 70B inference). I deployed it on Fly.io using Docker, since the AI calls can take 15–20 seconds and Vercel's free tier cuts off at 10s.

The thing that stuck with me: **schema-first thinking forces you to resolve ambiguity before you write logic.** Does `confidence` go 0–1 or 0–100? Does an alternative scoreline include or exclude the primary prediction? Answering these in a Zod schema before touching the UI meant I never had to unpick mismatched assumptions mid-build.

Football's a great vehicle for this kind of learning project. There's a real deadline (the World Cup ends in July), real data to work with, and enough genuine interest to push through the frustrating parts.

Tech stack for anyone curious:
- Next.js 15 + TypeScript
- Claude Sonnet (Anthropic) → Groq fallback
- football-data.org (free tier)
- Fly.io (Docker, persistent volume)
- Zod for SDD schemas

App is live: https://wc26-predictor.fly.dev
Code: github.com/nachikul/WC26_Predictor

What tournaments or events have you used as side-project forcing functions? Would love to hear what others have built around WC2026.

#SoftwareEngineering #MachineLearning #WorldCup2026 #SideProject #TypeScript #AI #SpecDrivenDevelopment #NextJS #Anthropic
