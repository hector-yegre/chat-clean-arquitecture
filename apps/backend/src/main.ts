import dotenv from "dotenv";
import http from 'http'
import { connectMongo } from "./infrastructure/db/mongo";
import { createServer } from "./presentation/server";
import { initSocketServer } from "./presentation/sockets/socketServer";


dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  
  await connectMongo();
  const app = createServer();
  const httpServer = http.createServer(app) // crea,ops e; servodpr sobre express
  
  initSocketServer(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

};

start();
