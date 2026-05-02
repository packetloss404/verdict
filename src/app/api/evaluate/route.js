import sql from "@/app/api/utils/sql";

// Just saves the result — AI call happens on the frontend
export async function POST(request) {
  try {
    const { idea, gauntlet } = await request.json();

    if (!idea || !gauntlet) {
      return Response.json(
        { error: "idea and gauntlet are required" },
        { status: 400 },
      );
    }

    const [saved] = await sql`
      INSERT INTO evaluations (
        idea_text,
        verdict,
        why_market,
        why_model,
        why_moat,
        biggest_risk,
        save_improvement,
        viability_score,
        gauntlet_result
      ) VALUES (
        ${idea},
        ${gauntlet.investor.verdict},
        ${gauntlet.investor.market},
        ${gauntlet.investor.model},
        ${gauntlet.investor.moat},
        ${gauntlet.investor.biggest_risk},
        ${gauntlet.judge.fix_first},
        ${gauntlet.judge.confidence},
        ${JSON.stringify(gauntlet)}
      ) RETURNING *
    `;

    return Response.json({ ...saved, gauntlet });
  } catch (error) {
    console.error("Save evaluation error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history =
      await sql`SELECT * FROM evaluations ORDER BY created_at DESC LIMIT 10`;
    return Response.json(history);
  } catch (error) {
    console.error("History error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
