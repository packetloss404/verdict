import sql from '@/app/api/utils/sql';
import { runStructured } from '@/app/api/utils/anthropic';
import { followupSchema } from '@/app/api/utils/schemas';

export async function POST(request) {
  try {
    const { evaluationId, idea, gauntlet } = await request.json();
    if (!idea || !gauntlet) {
      return Response.json(
        { error: 'idea and gauntlet are required' },
        { status: 400 },
      );
    }

    const summary = [
      `INVESTOR: Verdict=${gauntlet.investor.verdict}. Market: ${gauntlet.investor.market}. Moat: ${gauntlet.investor.moat}. Risk: ${gauntlet.investor.biggest_risk}.`,
      `COMPETITOR: Kill: ${gauntlet.competitor.kill_strategies.join(' | ')}. Why you lose: ${gauntlet.competitor.why_you_lose}.`,
      `CUSTOMER: Won't buy: ${gauntlet.customer.why_not_buy.join(' | ')}. Dealbreaker: ${gauntlet.customer.dealbreaker}.`,
      `BUILDER: Traps: ${gauntlet.builder.traps.join(' | ')}. MVP: ${gauntlet.builder.time_to_mvp}. Hidden costs: ${gauntlet.builder.hidden_costs}.`,
      `JUDGE: ${gauntlet.judge.gauntlet_result} / ${gauntlet.judge.final_verdict} / ${gauntlet.judge.confidence}%. Kill shot: ${gauntlet.judge.kill_shot}.`,
    ].join('\n');

    const prompt = `You are an advanced follow-up system for "The Gauntlet."
The initial stress test is done. Do NOT repeat it. Go deeper, expose what was missed, sharpen the decision.

ORIGINAL IDEA: ${idea}

GAUNTLET SUMMARY:
${summary}

RULES: New signal only. No repetition. Concise and sharp. Real stakes.

Return structured output covering: missed blind spots, failure acceleration, decision under pressure, 80/20 lever, reframe, final call.`;

    const followup = await runStructured({
      prompt,
      schema: followupSchema,
      schemaName: 'followup_evaluation',
    });

    if (evaluationId) {
      await sql`UPDATE evaluations SET followup_result = ${JSON.stringify(followup)} WHERE id = ${evaluationId}`;
    }
    return Response.json(followup);
  } catch (error) {
    console.error('Followup error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
