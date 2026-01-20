import { Socket, Server } from "socket.io";
import { CreateConversation } from "../../application/use-case/conversation/createConversation";
import { MongoConversationRepository } from "../../infrastructure/repositories/MongoConversationRepository";

export const registerChatEvents = (socket: Socket, io: Server) => {

  const conversationRepo = new MongoConversationRepository();
  const createConversation = new CreateConversation(conversationRepo);

  socket.on("create-conversation", async (data, callback) => {
    try {
      const userId = socket.data.user.id; // obtenemos el usuario logeado

      const conversation = await createConversation.execute({
        creatorId: userId,
        participantIds: data.participants,
        isGroup: data.isGroup,
        name: data.name,
      });

      socket.join(conversation.id);

      callback({
        success: true,
        conversation,
      });

    } catch (error: any) {
      callback({
        success: false,
        message: error.message,
      });
    }
  });
};
