import { Conversation } from "../../../domain/entities/Conversation";
import { UserRole } from "apps/backend/src/domain/enums/UserRole";
import { ConversationRepository } from "apps/backend/src/domain/repositories/ConversationRepository";

interface CreateConversationInput {
  creatorId: string;
  participantIds: string[]; // sin incluir al creador
  isGroup: boolean;
  name?: string;
}

interface Participants {
    userId: string;
    role: UserRole;
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
            } 
        */

        //consturimos participantes

        const participants = [
            { userId: input.creatorId, role: 'ADMIN' as UserRole },
            ...input.participantIds.map(id => ({ userId: id, role: 'USER' as UserRole }) )
        ]
        const conversation = new Conversation({
            isGroup: input.isGroup,
            name:input.name ?? (input.isGroup ? 'New Group' : 'private'),
            participants: participants as Participants[],
        })

        const newConversation = await this.conversationRepository.save(conversation);

        return newConversation;
    }
}