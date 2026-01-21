// MongoConversationRepository.ts
import { ConversationRepository } from "../../domain/repositories/ConversationRepository";
import { Conversation } from "../../domain/entities/Conversation";
import { ConversationModel } from "../models/conversationModel";
import { UserRole } from "../../domain/enums/UserRole";
import mongoose from "mongoose";

export class MongoConversationRepository implements ConversationRepository {
  
  async save(conversation: Conversation): Promise<Conversation> {
    
    const doc = await ConversationModel.create({
      isGroup: conversation.isGroup,
      name: conversation.name,
      participants: conversation.participants.map(participant => ({ 
        user: new mongoose.Types.ObjectId(participant.userId), 
        role: participant.role 
      })),
      createdAt: conversation.createdAt
    });

    return new Conversation({
      id: doc._id.toString(),
      isGroup: doc.isGroup,
      name: conversation.getConversationName(),
      participants: conversation.participants,
      messages: [],
      createdAt: doc.createdAt,
    });
  }

  async findById(id: string): Promise<Conversation | null> {

    const conversation = await ConversationModel.findById(id)
                            .populate("participants.user")
                            .populate("messages.emisor");

    if (!conversation) return null;

    // obtenemos participantes
    const participants = conversation.participants.map( participant => ({ 
            userId: participant.user._id.toString(), 
            role: participant.role as UserRole
    }));

    return new Conversation({
      id: conversation._id.toString(),
      isGroup: conversation.isGroup,
      name: conversation.name ?? 'private',
      participants: participants,
      messages: conversation.messages.map(message => ({ emisorId: message.emisor.toString(), content: message.content, createdAt: message.createdAt })),
      createdAt: conversation.createdAt,
    });
  }

  async findAllByUserId(userId: string): Promise<Conversation[]> {
    
    const usersConversation = await ConversationModel.find({ "participants.user": userId }); // pupulate

    return usersConversation.map( user => new Conversation({
      id: user._id.toString(),
      isGroup: user.isGroup,
      name: user.name ?? 'private',
      participants: user.participants.map((participant:any) => ({ userId: participant.user._id.toString(), role: participant.role })),
      messages: user.messages.map(message => ({ emisorId: message.emisor.toString(), content: message.content, createdAt: message.createdAt })),
      createdAt: user.createdAt,
    }));

  }

  async addMessage(conversationId: string, emisorId: string, content: string): Promise<void> {
    await ConversationModel.findByIdAndUpdate(
      conversationId,
      { $push: 
        { messages: 
          { 
            emisor: new mongoose.Types.ObjectId(emisorId), 
            content, 
            createdAt: new Date() 
          } 
        } 
      }
    );
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await ConversationModel.findByIdAndDelete(conversationId);
  }
}
