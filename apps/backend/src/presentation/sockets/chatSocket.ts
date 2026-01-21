import { Server,Socket } from "socket.io";
import { SendMessage } from "../../application/use-case/conversation/sendMessage";
import { MongoConversationRepository } from "../../infrastructure/repositories/MongoConversationRepository";


export const RegisterChatSocket = (socket: Socket, io: Server) => {
  
  const conversationRepo = new MongoConversationRepository();
  const sendMessageUseCase = new SendMessage(conversationRepo);

  socket.on('send-message', async (msg: { conversationId: string; content: string }) => {
    try {
      
      await sendMessageUseCase.execute({
        conversationId: msg.conversationId,
        emisorId: socket.data.user.id,
        content: msg.content,
      });

      socket.join(msg.conversationId);

      io.to(msg.conversationId).emit('chat-message', {
        user: socket.data.user.email,
        message: msg.content,
      });

      console.log(`💬 Mensaje enviado por ${socket.data.user.email}: ${msg.content}`);
    } catch (error: any) {
      socket.emit('error-message', error.message);
      console.error('❌ Error enviando mensaje:', error.message);
    }
  });
};