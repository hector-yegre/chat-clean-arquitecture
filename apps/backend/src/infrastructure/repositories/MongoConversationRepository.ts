// MongoConversationRepository.ts
import { ConversationRepository } from "../../domain/repositories/ConversationRepository";
import { Conversation } from "../../domain/entities/Conversation";
import { ConversationModel } from "../models/conversationModel";
import { UserRole } from "../../domain/enums/UserRole";

export class MongoConversationRepository implements ConversationRepository {
  
  async save(conversation: Conversation): Promise<void> {
    
    
    const doc = new ConversationModel({
      id: conversation.id,
      isGroup: conversation.isGroup,
      name: conversation.getConversationName(),
      participants: conversation.participants.map( participant => ({
        user: participant.userId,
        role: participant.role
      })),
      messages: conversation.messages.map(m => ({
        sender: m.emisorId,
        content: m.content,
        createdAt: m.createdAt
      })),
      createdAt: conversation.createdAt
    });
    await doc.save();
  }

  async findById(id: string): Promise<Conversation | null> {

    const conversation = await ConversationModel.findById(id)
                            .populate("participants.user")
                            .populate("messages.emisor");

    if (!conversation) return null;

    // obtenemos participantes
    const participants = conversation.participants.map( participant => ({ 
            userId: participant.user.toString(), 
            role: participant.role as UserRole
    }));

    return new Conversation({
      id: conversation._id.toString(),
      isGroup: conversation.isGroup,
      name: conversation.name ?? 'private',
      participants: participants,
      messages: conversation.messages.map(message => ({ emisorId: message.emisor.toString(), content: message.content, createdAt: message.createAt })),
      createdAt: conversation.createAt
    });
  }

  async findAllByUserId(userId: string): Promise<Conversation[]> {
    
    const usersConversation = await ConversationModel.find({ "participants.user": userId }); // pupulate

    return usersConversation.map( user => new Conversation({
      id: user._id.toString(),
      isGroup: user.isGroup,
      name: user.name ?? 'private',
      participants: user.participants.map((participant:any) => ({ userId: participant.user._id.toString(), role: participant.role })),
      messages: user.messages.map(message => ({ emisorId: message.emisor.toString(), content: message.content, createdAt: message.createAt })),
      createdAt: user.createAt,
    }));

  }

  async addMessage(conversationId: string, emisorId: string, content: string): Promise<void> {
    await ConversationModel.findByIdAndUpdate(
      conversationId,
      { $push: { messages: { emisor: emisorId, content, createdAt: new Date() } } }
    );
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await ConversationModel.findByIdAndDelete(conversationId);
  }
}
