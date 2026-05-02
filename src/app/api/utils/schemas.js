export const gauntletSchema = {
  type: 'object',
  properties: {
    investor: {
      type: 'object',
      properties: {
        verdict: { type: 'string' },
        market: { type: 'string' },
        model: { type: 'string' },
        moat: { type: 'string' },
        biggest_risk: { type: 'string' },
      },
      required: ['verdict', 'market', 'model', 'moat', 'biggest_risk'],
      additionalProperties: false,
    },
    competitor: {
      type: 'object',
      properties: {
        kill_strategies: { type: 'array', items: { type: 'string' } },
        weak_points: { type: 'array', items: { type: 'string' } },
        why_you_lose: { type: 'string' },
      },
      required: ['kill_strategies', 'weak_points', 'why_you_lose'],
      additionalProperties: false,
    },
    customer: {
      type: 'object',
      properties: {
        why_not_buy: { type: 'array', items: { type: 'string' } },
        feels_off: { type: 'string' },
        dealbreaker: { type: 'string' },
      },
      required: ['why_not_buy', 'feels_off', 'dealbreaker'],
      additionalProperties: false,
    },
    builder: {
      type: 'object',
      properties: {
        traps: { type: 'array', items: { type: 'string' } },
        technical: { type: 'string' },
        operational: { type: 'string' },
        time_to_mvp: { type: 'string' },
        hidden_costs: { type: 'string' },
      },
      required: ['traps', 'technical', 'operational', 'time_to_mvp', 'hidden_costs'],
      additionalProperties: false,
    },
    judge: {
      type: 'object',
      properties: {
        gauntlet_result: { type: 'string' },
        final_verdict: { type: 'string' },
        pattern: { type: 'string' },
        compound_risks: { type: 'array', items: { type: 'string' } },
        fix_first: { type: 'string' },
        best_pivot: { type: 'string' },
        why_could_work: { type: 'string' },
        kill_shot: { type: 'string' },
        confidence: { type: 'integer' },
      },
      required: [
        'gauntlet_result',
        'final_verdict',
        'pattern',
        'compound_risks',
        'fix_first',
        'best_pivot',
        'why_could_work',
        'kill_shot',
        'confidence',
      ],
      additionalProperties: false,
    },
  },
  required: ['investor', 'competitor', 'customer', 'builder', 'judge'],
  additionalProperties: false,
};

export const followupSchema = {
  type: 'object',
  properties: {
    missed: {
      type: 'object',
      properties: {
        risks: { type: 'array', items: { type: 'string' } },
        missing_insight: { type: 'string' },
      },
      required: ['risks', 'missing_insight'],
      additionalProperties: false,
    },
    failure_acceleration: {
      type: 'object',
      properties: {
        first_crack: { type: 'string' },
        cascade_effect: { type: 'string' },
        point_of_no_return: { type: 'string' },
      },
      required: ['first_crack', 'cascade_effect', 'point_of_no_return'],
      additionalProperties: false,
    },
    decision_pressure: {
      type: 'object',
      properties: {
        proceed: { type: 'string' },
        why: { type: 'array', items: { type: 'string' } },
      },
      required: ['proceed', 'why'],
      additionalProperties: false,
    },
    eighty_twenty: {
      type: 'object',
      properties: { core_lever: { type: 'string' } },
      required: ['core_lever'],
      additionalProperties: false,
    },
    reframe: {
      type: 'object',
      properties: {
        better_framing: { type: 'string' },
        who_its_really_for: { type: 'string' },
        what_its_actually_solving: { type: 'string' },
      },
      required: ['better_framing', 'who_its_really_for', 'what_its_actually_solving'],
      additionalProperties: false,
    },
    final_call: {
      type: 'object',
      properties: {
        updated_verdict: { type: 'string' },
        what_changed: { type: 'array', items: { type: 'string' } },
        uncomfortable_truth: { type: 'string' },
        if_you_ignore: { type: 'string' },
        one_sentence: { type: 'string' },
      },
      required: [
        'updated_verdict',
        'what_changed',
        'uncomfortable_truth',
        'if_you_ignore',
        'one_sentence',
      ],
      additionalProperties: false,
    },
  },
  required: [
    'missed',
    'failure_acceleration',
    'decision_pressure',
    'eighty_twenty',
    'reframe',
    'final_call',
  ],
  additionalProperties: false,
};

export const memoSchema = {
  type: 'object',
  properties: {
    decision: { type: 'string' },
    conviction: { type: 'string' },
    why_wins_or_loses: { type: 'string' },
    the_bet: { type: 'string' },
    the_risk: { type: 'string' },
    non_obvious_insight: { type: 'string' },
    next_move: { type: 'string' },
    time_horizon: { type: 'string' },
    final_word: { type: 'string' },
  },
  required: [
    'decision',
    'conviction',
    'why_wins_or_loses',
    'the_bet',
    'the_risk',
    'non_obvious_insight',
    'next_move',
    'time_horizon',
    'final_word',
  ],
  additionalProperties: false,
};
