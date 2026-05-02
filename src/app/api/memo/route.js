import sql from '@/app/api/utils/sql';
import { runStructured } from '@/app/api/utils/anthropic';
import { memoSchema } from '@/app/api/utils/schemas';

export async function POST(request) {
  try {
    const { evaluationId, idea, gauntlet, followup } = await request.json();
    if (!idea || !gauntlet || !followup) {
      return Response.json(
        { error: 'idea, gauntlet, and followup are required' },
        { status: 400 },
      );
    }

    const brief = [
      `IDEA: ${idea}`,
      `VERDICT: ${gauntlet.judge.final_verdict} | ${gauntlet.judge.gauntlet_result} | ${gauntlet.judge.confidence}%`,
      `KILL SHOT: ${gauntlet.judge.kill_shot}`,
      `FIX FIRST: ${gauntlet.judge.fix_first}`,
      `BEST PIVOT: ${gauntlet.judge.best_pivot}`,
      `CORE LEVER: ${followup.eighty_twenty.core_lever}`,
      `UNCOMFORTABLE TRUTH: ${followup.final_call.uncomfortable_truth}`,
      `UPDATED VERDICT: ${followup.final_call.updated_verdict}`,
      `ONE SENTENCE: ${followup.final_call.one_sentence}`,
    ].join('\n');

    const prompt = `You are writing a final investment decision memo.
Two rounds of adversarial analysis are complete. Compress everything into a clear, high-stakes decision.
No fluff. No repetition. No hedging. Every word must count.

ALL PRIOR ANALYSIS:
${brief}

The final_word must be memorable, blunt, and specific to THIS idea.
The next_move must be one concrete action — not generic advice.
Return structured output.`;

    const memo = await runStructured({
      prompt,
      schema: memoSchema,
      schemaName: 'investment_memo',
    });

    if (evaluationId) {
      await sql`UPDATE evaluations SET memo_result = ${JSON.stringify(memo)} WHERE id = ${evaluationId}`;
    }
    return Response.json(memo);
  } catch (error) {
    console.error('Memo error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
