import dotenv from "dotenv";
import { connectMongo } from "./infrastructure/db/mongo";
import { createServer } from "./presentation/server";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  
  await connectMongo();
  const app = createServer();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

};

start();
