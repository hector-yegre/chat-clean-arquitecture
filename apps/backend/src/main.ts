import dotenv from "dotenv";
import { connectMongo } from "./infrastructure/db/mongo";
import { createServer } from "./presentation/server";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  
  await connectMongo();
  const app = createServer();
  const httpServer = http.createServer(app) // crea,ops e; servodpr sobre express

  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });
  io.use(socketAuth)

 // Middleware de autenticación de Socket.IO
  io.use((socket, next) => {
    const token = socket.handshake.auth.token; // Cliente envía { auth: { token } }
    if (!token) return next(new Error("No token provided"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      socket.data.user = payload; // Guardamos info del usuario en socket.data
      next();
    } catch (err) {
      next(new Error("Token invalido"));
    }
  });

  //evento
  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.data.user.email);

    socket.on("chat-message", (msg) => {
      // Emitimos a todos los sockets conectados
      io.emit("chat-message", { user: socket.data.user.email, message: msg });
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.data.user.email);
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

};

start();
