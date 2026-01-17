// src/infrastructure/repositories/MongoUserRepository.ts
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../models/userModel";

export class MongoUserRepository implements UserRepository {
  
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
  }

  async findById(id:string): Promise<User | null> {
    
    const user = await UserModel.findById(id);
    if(!user) return null;
    
    return new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
  }


  async save(user: User): Promise<void> {
    await UserModel.create({
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: user.getPasswordHash(),
      createdAt: user.createdAt,
    });
  }
}
