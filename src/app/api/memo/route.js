import sql from "@/app/api/utils/sql";

// AI call happens on the frontend — this just saves the result
export async function POST(request) {
  try {
    const { evaluationId, memo } = await request.json();
    if (!memo) {
      return Response.json({ error: "memo is required" }, { status: 400 });
    }
    if (evaluationId) {
      await sql`UPDATE evaluations SET memo_result = ${JSON.stringify(memo)} WHERE id = ${evaluationId}`;
    }
    return Response.json(memo);
  } catch (error) {
    console.error("Save memo error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
