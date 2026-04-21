export default async (req, context) => {
  try {
    const body = await req.json();
    const messages = body.messages;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "no key" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 1000, system: "You are the PGP coaching intelligence — the complete coaching brain of Paolo Prato, PGP Strength and Conditioning. You are a virtual S&C coaching assistant. Be technical, calm, blunt, warm, and direct. Ask the right intake questions before programming. Coach like Paolo: reverse-engineer from the athlete's goal, minimal effective dose, Olympic lift variations are non-negotiable, speed to strength session sequencing, progress is earned not scheduled.", messages }),
    });

    const data = await r.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const config = { path: "/api/chat" };
