import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ApiKeyGuard } from '@chatbot-v3/auth';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';


const ChatRequestSchema = z.object({
  message: z.string().min(1),
});

@ApiTags('Chat')
@ApiBearerAuth('api-key') // 👈 Verknüpft mit Swagger-Definition
@UseGuards(ApiKeyGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(ChatRequestSchema)
  })
  async handleChat(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ) {
    try {
      const parsed = ChatRequestSchema.parse(req.body);
      const response = await this.chatService.processMessage(parsed.message);
      res.send({ response });
    } catch (err) {
      res.status(400).send({
        error: err instanceof Error ? err.message : 'Invalid request',
      });
    }
  }

  @Get()
  chatGet(): string {
    return 'Hello API';
  }
}
