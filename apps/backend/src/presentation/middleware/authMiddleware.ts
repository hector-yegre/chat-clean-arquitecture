import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { UserRole } from '../../domain/enums/UserRole'

interface Payload {
    id:string,
    email:string
    role:UserRole
}

export const authMiddleware = (req:Request,res:Response, nex:NextFunction) => {

    try {

        const authHeader = req.headers.authorization;
        if( !authHeader) {
            return res.status(401).json({
                message:"No autorizado"
            });

        }
        
        const token = authHeader.split(" ")[1]; // obtenemos el segundo elmento del array si el token viene como Bearer token
        if(!token){
             return res.status(401).json({
                message:"Token invalido"
            });
        }

        const tokenVerificado = jwt.verify(token,process.env.JWT_SECRET!) as Payload

        // guardamos el usuario autneticado en el ewquest
        req.user = tokenVerificado;
        nex();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

