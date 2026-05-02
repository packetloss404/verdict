import sql from '@/lib/sql';
import { runStructured } from '@/lib/anthropic';
import { gauntletSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { idea } = await request.json();
    if (!idea) {
      return Response.json({ error: 'idea is required' }, { status: 400 });
    }

    const prompt = `You are an AI system called "The Gauntlet."
Stress-test this startup/product idea from four adversarial perspectives, then synthesize a final decision.

Roles:
1. Investor — market, ROI, moat
2. Competitor — how to attack and beat this
3. Customer — why people won't buy
4. Builder — execution difficulty and hidden complexity
5. The Judge — final synthesis

RULES: Be concise and sharp. No generic advice. No repetition across sections. Prioritize realism.

INPUT IDEA: ${idea}

Return structured output with all five perspectives.`;

    const gauntlet = await runStructured({
      prompt,
      schema: gauntletSchema,
      schemaName: 'gauntlet_evaluation',
    });

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
    console.error('Evaluate error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history =
      await sql`SELECT * FROM evaluations ORDER BY created_at DESC LIMIT 10`;
    return Response.json(history);
  } catch (error) {
    console.error('History error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
