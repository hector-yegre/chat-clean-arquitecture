
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetProfile {
    constructor(private userRepo: UserRepository){}
    
    async execute(userId:string): Promise<User> {
        const user = await this.userRepo.findById(userId);
        if(!user){
            throw new Error('Usuario no econtrado');
        }
        return user;
    }

}