import { Conversation } from "apps/backend/src/domain/entities/Conversation";
import { User } from "apps/backend/src/domain/entities/User";
import { UserRole } from "apps/backend/src/domain/enums/UserRole";
import { ConversationRepository } from "apps/backend/src/domain/repositories/ConversationRepository";
import { th } from "zod/v4/locales";

interface CreateConversationInput {
  creatorId: string;
  participantIds: string[]; // sin incluir al creador
  isGroup: boolean;
  name?: string;
}

export class CreateConversation {

    constructor(private conversationRepository: ConversationRepository){}

    async execute(input: CreateConversationInput): Promise<Conversation> {
        
        

        if(!input.isGroup && input.participantIds.length !== 1 ){
            throw new Error("Un chat privado solo puede tener dos usuarios");
        }
/* 
        if(input.isGroup && input.participantIds.length !== 1 ){
            throw new Error("Un chat privado solo puede tener dos usuarios");
        } */

        //consturimos participantes

        const participants = [
            { userId: input.creatorId, role: 'ADMIN' as UserRole },
            ...input.participantIds.map(id => ({ userId: id, role: 'USER' as UserRole }) )
        ]
        const conversation = new Conversation({
            isGroup: input.isGroup,
            name:input.name ?? (input.isGroup ? 'New Group' : 'private'),
            participants: participants,
        })

        await this.conversationRepository.save(conversation);

        return conversation;
    }
}