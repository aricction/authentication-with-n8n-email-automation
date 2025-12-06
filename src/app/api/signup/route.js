export async function POST(req) {
  try {
    const body = await req.json();
    console.log("⬅️ Received at /api/signup:", body);

    // Validate email
    if (!body.email) {
      console.log("❌ Email missing", body);
      return Response.json({ message: "Email missing" }, { status: 400 });
    }

    // Send to n8n
    const webhookUrl = "https://aric.app.n8n.cloud/webhook/new-signup";

    console.log("➡️ Sending to n8n:", webhookUrl);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const n8nText = await response.text();
    console.log("🔍 n8n Raw response:", n8nText);

    if (!response.ok) {
      return Response.json(
        {
          message: `n8n error: ${response.status}`,
          n8nResponse: n8nText,
        },
        { status: 500 }
      );
    }

    return Response.json({ message: "Signup data sent to n8n" });
  } catch (error) {
    console.error("🔥 API error:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
