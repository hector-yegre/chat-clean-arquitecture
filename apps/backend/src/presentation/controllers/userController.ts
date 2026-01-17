import { Response,Request } from "express";
import { RegisterUser } from "../../application/use-case/RegisterUser";
import { LoginUser } from "../../application/use-case/loginUser";




export class UserController {

    constructor( 
        private registerUser: RegisterUser,
        private loginUser: LoginUser
    ){}
    
    register = async ( req: Request, res: Response) => {
        try {
            
            const {name,email,password,role} = req.body;
           
            const user = await this.registerUser.execute(name,email,password,role);

            res.status(201).json({
                name: user.name,
                email: user.email,
                role: user.role,
                createAt: user.createdAt

            });
            
        } catch (error : any) {
            res.status(500).json({
                message: error.message ?? "Error inesperado"
            })
        }
    }

    login = async ( req:Request, res:Response) => {

        try {
            
            const {email,password} = req.body;
            if( !this.loginUser ){ 
                throw new Error("Error de inyeccion de dependencia loginUser no inyectado");
            }
    
            const result = await this.loginUser.execute(email,password);
            res.status(200).json(result);
        } catch (error:any) {

            res.status(400).json({
                message: error.message
            })
            
        }

    }
}