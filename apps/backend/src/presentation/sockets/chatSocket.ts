import { Server,Socket } from "socket.io";
import { SendMessage } from "../../application/use-case/conversation/sendMessage";
import { MongoConversationRepository } from "../../infrastructure/repositories/MongoConversationRepository";


export const RegisterChatSocket = (io:Server) => {

    const conversationRepo = new MongoConversationRepository();
    const sendMessageUseCase = new SendMessage(conversationRepo);

    io.on('chat-message', async (socket:Socket, msg:{conversationId:string, content:string} ) => {
        try {

            await sendMessageUseCase.execute({
                conversationId: msg.conversationId,
                emisorId: socket.data.user.id,
                content: msg.content,
            });

            io.to(msg.conversationId).emit('chat-message',{
                user: socket.data.user.email,
                message: msg.content,
            });
            
        } catch (error:any) {
            socket.emit("error-message", error.message);
        }
    });

}