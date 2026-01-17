import {Request} from "express";
import { UserRole } from "../domain/enums/UserRole";

declare global { 
namespace Express { 
  interface Request {
      user?: {
        id: string;
        email: string;
        role?: string
      };
    }
  }
}

export {};