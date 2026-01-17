import {Request,Response,NextFunction} from 'express'
import { UserRole } from '../../domain/enums/UserRole';

export const requireRole = (role:UserRole) =>{
    
    return (req: Request, res: Response, next: NextFunction)  => {
        if(!req.user ){
            return res.status(401).json({
                message:"No Autorizado"
            });
        }

        if(req.user.role !== role){
            return res.status(403).json({
                message:"No tiene permisos"
            });
        }
        next();
    }
}