import { Request, Response } from "express";
import { GetProfile } from "../../application/use-case/getProfile";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";

const userRepo = new MongoUserRepository();
const userProfile = new GetProfile(userRepo);


export const profileController = async (req:Request, res:Response) => {
    try {

        const userId = req.user!.id
        const user = await userProfile.execute(userId);

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        }); 
        
    } catch (error:any) {
        return res.status(404).json({ message: error.message });
    }

}