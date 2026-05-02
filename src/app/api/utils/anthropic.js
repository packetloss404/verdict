import Anthropic from '@anthropic-ai/sdk';

let client = null;
function getClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';

export async function runStructured({ prompt, schema, schemaName, maxTokens = 4096 }) {
  const tool = {
    name: schemaName,
    description: `Return ${schemaName} as structured JSON.`,
    input_schema: schema,
  };

  const res = await getClient().messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    tools: [tool],
    tool_choice: { type: 'tool', name: schemaName },
    messages: [{ role: 'user', content: prompt }],
  });

  const toolUse = res.content.find((block) => block.type === 'tool_use');
  if (!toolUse) {
    throw new Error('Anthropic response missing tool_use block');
  }
  return toolUse.input;
}
