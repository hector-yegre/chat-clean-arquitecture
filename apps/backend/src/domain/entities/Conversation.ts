import { UserRole } from "../enums/UserRole";


export class Conversation {

    public readonly id: string;
    public readonly isGroup: boolean;
    public readonly name?: string;
    public readonly participants: { userId: string; role: UserRole }[];
    public readonly messages: { senderId: string; content: string; createdAt: Date }[];
    public readonly createdAt: Date;

    constructor( params:{
        id?: string;
        isGroup: boolean;
        name?: string;
        participants: { userId: string; role: UserRole }[];
        messages?: { senderId: string; content: string; createdAt: Date }[];
        createdAt?: Date;
    }){
        this.id = params.id ?? crypto.randomUUID(); // de la porpia capa de dominio uuid
        this.isGroup = params.isGroup;
        this.name = params.name;
        this.participants = params.participants;
        this.messages = params.messages ?? [];
        this.createdAt = params.createdAt ?? new Date();
    }

}