import { Injectable } from '@nestjs/common';
import { generateEmbedding } from '@chatbot-v3/openai';
import { saveEmbedding } from '@chatbot-v3/db';

@Injectable()
export class EmbeddingService {
  async createEmbedding(message: string): Promise<void> {
    const response = await generateEmbedding(message);
    await saveEmbedding(message, response);
  }
}
