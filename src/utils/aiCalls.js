// All AI calls go directly from the browser to the integration endpoint.
// The backend routes only handle database saves.

const ENDPOINT = "/integrations/chat-gpt/conversationgpt4";

export async function runGauntlet(idea) {
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

Return structured JSON with all five perspectives.`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      json_schema: {
        name: "gauntlet_evaluation",
        schema: {
          type: "object",
          properties: {
            investor: {
              type: "object",
              properties: {
                verdict: { type: "string" },
                market: { type: "string" },
                model: { type: "string" },
                moat: { type: "string" },
                biggest_risk: { type: "string" },
              },
              required: ["verdict", "market", "model", "moat", "biggest_risk"],
              additionalProperties: false,
            },
            competitor: {
              type: "object",
              properties: {
                kill_strategies: { type: "array", items: { type: "string" } },
                weak_points: { type: "array", items: { type: "string" } },
                why_you_lose: { type: "string" },
              },
              required: ["kill_strategies", "weak_points", "why_you_lose"],
              additionalProperties: false,
            },
            customer: {
              type: "object",
              properties: {
                why_not_buy: { type: "array", items: { type: "string" } },
                feels_off: { type: "string" },
                dealbreaker: { type: "string" },
              },
              required: ["why_not_buy", "feels_off", "dealbreaker"],
              additionalProperties: false,
            },
            builder: {
              type: "object",
              properties: {
                traps: { type: "array", items: { type: "string" } },
                technical: { type: "string" },
                operational: { type: "string" },
                time_to_mvp: { type: "string" },
                hidden_costs: { type: "string" },
              },
              required: [
                "traps",
                "technical",
                "operational",
                "time_to_mvp",
                "hidden_costs",
              ],
              additionalProperties: false,
            },
            judge: {
              type: "object",
              properties: {
                gauntlet_result: { type: "string" },
                final_verdict: { type: "string" },
                pattern: { type: "string" },
                compound_risks: { type: "array", items: { type: "string" } },
                fix_first: { type: "string" },
                best_pivot: { type: "string" },
                why_could_work: { type: "string" },
                kill_shot: { type: "string" },
                confidence: { type: "integer" },
              },
              required: [
                "gauntlet_result",
                "final_verdict",
                "pattern",
                "compound_risks",
                "fix_first",
                "best_pivot",
                "why_could_work",
                "kill_shot",
                "confidence",
              ],
              additionalProperties: false,
            },
          },
          required: ["investor", "competitor", "customer", "builder", "judge"],
          additionalProperties: false,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Evaluation failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

export async function runFollowUp(idea, gauntlet) {
  const summary = [
    `INVESTOR: Verdict=${gauntlet.investor.verdict}. Market: ${gauntlet.investor.market}. Moat: ${gauntlet.investor.moat}. Risk: ${gauntlet.investor.biggest_risk}.`,
    `COMPETITOR: Kill: ${gauntlet.competitor.kill_strategies.join(" | ")}. Why you lose: ${gauntlet.competitor.why_you_lose}.`,
    `CUSTOMER: Won't buy: ${gauntlet.customer.why_not_buy.join(" | ")}. Dealbreaker: ${gauntlet.customer.dealbreaker}.`,
    `BUILDER: Traps: ${gauntlet.builder.traps.join(" | ")}. MVP: ${gauntlet.builder.time_to_mvp}. Hidden costs: ${gauntlet.builder.hidden_costs}.`,
    `JUDGE: ${gauntlet.judge.gauntlet_result} / ${gauntlet.judge.final_verdict} / ${gauntlet.judge.confidence}%. Kill shot: ${gauntlet.judge.kill_shot}.`,
  ].join("\n");

  const prompt = `You are an advanced follow-up system for "The Gauntlet."
The initial stress test is done. Do NOT repeat it. Go deeper, expose what was missed, sharpen the decision.

ORIGINAL IDEA: ${idea}

GAUNTLET SUMMARY:
${summary}

RULES: New signal only. No repetition. Concise and sharp. Real stakes.

Return structured JSON covering: missed blind spots, failure acceleration, decision under pressure, 80/20 lever, reframe, final call.`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      json_schema: {
        name: "followup_evaluation",
        schema: {
          type: "object",
          properties: {
            missed: {
              type: "object",
              properties: {
                risks: { type: "array", items: { type: "string" } },
                missing_insight: { type: "string" },
              },
              required: ["risks", "missing_insight"],
              additionalProperties: false,
            },
            failure_acceleration: {
              type: "object",
              properties: {
                first_crack: { type: "string" },
                cascade_effect: { type: "string" },
                point_of_no_return: { type: "string" },
              },
              required: ["first_crack", "cascade_effect", "point_of_no_return"],
              additionalProperties: false,
            },
            decision_pressure: {
              type: "object",
              properties: {
                proceed: { type: "string" },
                why: { type: "array", items: { type: "string" } },
              },
              required: ["proceed", "why"],
              additionalProperties: false,
            },
            eighty_twenty: {
              type: "object",
              properties: { core_lever: { type: "string" } },
              required: ["core_lever"],
              additionalProperties: false,
            },
            reframe: {
              type: "object",
              properties: {
                better_framing: { type: "string" },
                who_its_really_for: { type: "string" },
                what_its_actually_solving: { type: "string" },
              },
              required: [
                "better_framing",
                "who_its_really_for",
                "what_its_actually_solving",
              ],
              additionalProperties: false,
            },
            final_call: {
              type: "object",
              properties: {
                updated_verdict: { type: "string" },
                what_changed: { type: "array", items: { type: "string" } },
                uncomfortable_truth: { type: "string" },
                if_you_ignore: { type: "string" },
                one_sentence: { type: "string" },
              },
              required: [
                "updated_verdict",
                "what_changed",
                "uncomfortable_truth",
                "if_you_ignore",
                "one_sentence",
              ],
              additionalProperties: false,
            },
          },
          required: [
            "missed",
            "failure_acceleration",
            "decision_pressure",
            "eighty_twenty",
            "reframe",
            "final_call",
          ],
          additionalProperties: false,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Follow-up failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

export async function runMemo(idea, gauntlet, followup) {
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
  ].join("\n");

  const prompt = `You are writing a final investment decision memo.
Two rounds of adversarial analysis are complete. Compress everything into a clear, high-stakes decision.
No fluff. No repetition. No hedging. Every word must count.

ALL PRIOR ANALYSIS:
${brief}

The final_word must be memorable, blunt, and specific to THIS idea.
The next_move must be one concrete action — not generic advice.
Return structured JSON.`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      json_schema: {
        name: "investment_memo",
        schema: {
          type: "object",
          properties: {
            decision: { type: "string" },
            conviction: { type: "string" },
            why_wins_or_loses: { type: "string" },
            the_bet: { type: "string" },
            the_risk: { type: "string" },
            non_obvious_insight: { type: "string" },
            next_move: { type: "string" },
            time_horizon: { type: "string" },
            final_word: { type: "string" },
          },
          required: [
            "decision",
            "conviction",
            "why_wins_or_loses",
            "the_bet",
            "the_risk",
            "non_obvious_insight",
            "next_move",
            "time_horizon",
            "final_word",
          ],
          additionalProperties: false,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Memo failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
