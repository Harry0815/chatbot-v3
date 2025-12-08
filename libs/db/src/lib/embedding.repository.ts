import { db } from './client';
import { sql } from 'drizzle-orm';
import { embeddingDocument } from './schema/embedded.schema';
import { generateEmbedding } from '@chatbot-v3/openai';

export async function saveEmbedding(content: string, embedding: number[]) {
  await db.execute(
    sql`
      INSERT INTO ${embeddingDocument} (content, embedding)
      VALUES (${content}, ${JSON.stringify(embedding)}::vector)
    `
  );
}

export async function searchSimilarDocuments(query: string, limit = 3): Promise<string[]> {
  const embedding = await generateEmbedding(query);

  const result = await db.execute(
    sql`
      SELECT content
      FROM documents
      ORDER BY embedding <-> ${JSON.stringify(embedding)}::vector
      LIMIT ${limit};
    `
  );

  // PostgreSQL gibt ein Array von Objekten zurück
  return result.rows.map((row ): string => row['content'] as string);
}

export async function embedAndStore(content: string) {
  const vector = await generateEmbedding(content);
  await saveEmbedding(content, vector);
}

