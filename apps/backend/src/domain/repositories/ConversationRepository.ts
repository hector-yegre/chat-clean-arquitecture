import { Conversation } from "../entities/Conversation";

export interface ConversationRepository {
    save(conversation:Conversation): Promise<void>
    findById(id:string): Promise<Conversation | null>
    findAllByUserId(userId:string): Promise<Conversation[] | []>
    addMessage(conversationId:string, senderId:string, content:string): Promise<void>
    deleteConversation(conversationId:string): Promise<void>
}