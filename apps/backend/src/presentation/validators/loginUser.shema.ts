import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginUserDTO = z.infer<typeof loginUserSchema>;
