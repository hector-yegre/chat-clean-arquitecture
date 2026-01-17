import { Router, Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { RegisterUser } from '../../application/use-case/RegisterUser'
import { validateSchema } from "../middleware/validateSchema";
import { registerUserSchema } from "../validators/registerUser.schema";
import { loginUserSchema } from "../validators/loginUser.shema";
import { LoginUser } from "../../application/use-case/loginUser";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/requireRoleMiddleware";
import { UserRole } from "../../domain/enums/UserRole";
const router = Router();

//dependencias
const userRepository = new MongoUserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const userController = new UserController(registerUser,loginUser);

// routas de usuarios
router.post('/register',validateSchema(registerUserSchema),userController.register)
router.post('/login',validateSchema(loginUserSchema),userController.login);

router.get("/profile", authMiddleware, (req, res) => {
  return res.json({
    message: "Usuario autenticado",
    user: req.user,
  });
});

// prueba de tura proyejida
router.get('/admin-test',authMiddleware,requireRole(UserRole.ADMIN),(req, res) => {
    res.json({ message: `Hola Admin ${req.user?.email}` });
})

export default router;
