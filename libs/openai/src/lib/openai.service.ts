import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
dotenv.config();

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env['OPENAI_API_KEY'];

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing in .env');
  }

  const client = new OpenAI();

  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: prompt
  })
  return response.output_text;

  // const body = {
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  // };
  //
  // const response = await fetch(OPENAI_URL, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${apiKey}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  //
  // if (!response.ok) {
  //   const errText = await response.text();
  //   throw new Error(`OpenAI API Error: ${response.status} - ${errText}`);
  // }
  //
  // const data = await response.json();
  //
  // return data.choices?.[0]?.message?.content?.trim() ?? 'No response from OpenAI';
}
