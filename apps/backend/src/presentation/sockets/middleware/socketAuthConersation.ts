import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { UserRole } from "apps/backend/src/domain/enums/UserRole";


interface Payload {
    id:string,
    email:string,
    role:UserRole
}
export const socketIsRolConversation = (socket:Socket, next:(err?:Error) => void)=>{
    try {
        const token = socket.handshake.auth?.token;
        if(!token){
            return next(new Error("No existe tojen"))
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as Payload

        socket.data.user = payload // guardamos el usuario conectado
        next();
        
    } catch (error) {
        next(new Error("Token invalido"));

    }
}