import { email, z } from 'zod';


export const registerUserSchema = z.object({
    name: z.string().min(2,"El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email invalido.."),
    password:z.string().min(6, "La contrasena debe tener al menos 6 caracteres")
})


// exportamos el tipo para la estructura de entrada
export type RegisterUserDTO = z.infer<typeof registerUserSchema>