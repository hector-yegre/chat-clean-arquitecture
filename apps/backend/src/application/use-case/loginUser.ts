import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { comparePassword } from "../../shared/hash";

export class LoginUser {
    
    constructor(private userRepo:UserRepository){}
    async execute( email:string, password:string): Promise<{ token:string }>{

        const user = await this.userRepo.findByEmail(email);
        if(!user){
            throw new Error("Email o contrasena incorrectos");
        }

        const valid = await comparePassword(password,user.getPasswordHash());
        if(!valid){
            throw new Error("Email o contrasena incorrectos");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role:user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        return {token};
    }



}