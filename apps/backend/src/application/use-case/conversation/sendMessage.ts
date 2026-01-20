import { ConversationRepository } from "../../../domain/repositories/ConversationRepository";


interface SendMessageInput {
  conversationId: string;
  emisorId: string;
  content: string;
}

export class SendMessage {
  constructor(private conversationRepo: ConversationRepository) {}

  async execute(input: SendMessageInput): Promise<void> {

    const conversation = await this.conversationRepo.findById(input.conversationId);

    if (!conversation) {
      throw new Error("conversaion no encontrada");
    }

    const isParticipant = conversation.participants.some(
      p => p.userId === input.emisorId
    );

    if (!isParticipant) {
      throw new Error("No tienes permiso para enviar mensajes");
    }

    await this.conversationRepo.addMessage(
      input.conversationId,
      input.emisorId,
      input.content
    );
  }
}
