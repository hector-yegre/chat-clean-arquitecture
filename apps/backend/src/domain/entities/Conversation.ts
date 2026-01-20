import { UserRole } from "../enums/UserRole";

interface Participants {
    userId: string;
    role: UserRole;
}


interface Message {
    emisorId: string;
    content: string;
    createdAt: Date;
}

export class Conversation {

    public readonly id: string;
    public readonly isGroup: boolean;
    public readonly name: string;
    public readonly participants: Participants[];
    public readonly messages: Message[];
    public readonly createdAt: Date;

    constructor( params:{
        id?: string;
        isGroup: boolean;
        name: string;
        participants: { userId: string; role: UserRole }[];
        messages?: { emisorId: string; content: string; createdAt: Date }[];
        createdAt?: Date;
    }){
        this.id = params.id ?? crypto.randomUUID(); // de la propia capa de dominio uuid
        this.isGroup = params.isGroup;
        this.name = params.name ?? 'private';
        this.participants = params.participants;
        this.messages = params.messages ?? [];
        this.createdAt = params.createdAt ?? new Date();
    }

    getParticipantIds(): string[] {
        return this.participants.map(participant => participant.userId);
    }

    getConversationName(): string {
        if (this.isGroup) {
            return this.name ?? "Unnamed Group";
        } else {
            return "Direct Message";
        }
    }

}
