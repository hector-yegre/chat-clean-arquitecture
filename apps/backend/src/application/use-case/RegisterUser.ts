

import { User } from "../../domain/entities/User";
import { UserRole } from "../../domain/enums/UserRole";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { hasPassword } from "../../shared/hash";

export class RegisterUser {
    constructor(private userRepo: UserRepository){}
    
    async execute( name:string,email:string, password:string,role:UserRole): Promise<User> {

        const existUser = await this.userRepo.findByEmail(email);
        
        if(existUser){
            throw new Error('Usuario ya registrado..');
        }

        const passwordHash = await hasPassword(password);
        
        const user = new User({name,email,passwordHash,role});
        
        await this.userRepo.save(user);
        
        return user;
    }

}