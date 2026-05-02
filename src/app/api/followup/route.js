import sql from "@/app/api/utils/sql";

// AI call happens on the frontend — this just saves the result
export async function POST(request) {
  try {
    const { evaluationId, followup } = await request.json();
    if (!followup) {
      return Response.json({ error: "followup is required" }, { status: 400 });
    }
    if (evaluationId) {
      await sql`UPDATE evaluations SET followup_result = ${JSON.stringify(followup)} WHERE id = ${evaluationId}`;
    }
    return Response.json(followup);
  } catch (error) {
    console.error("Save followup error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
