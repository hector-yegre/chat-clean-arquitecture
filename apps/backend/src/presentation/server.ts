import express from "express";
import userRoutes from "./routes/userRoutes";

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/users", userRoutes);

  return app;
};
