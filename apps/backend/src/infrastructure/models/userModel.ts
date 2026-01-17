import mongoose from "mongoose";
import { UserRole } from "../../domain/enums/UserRole";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role:{
        type:String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    createdAt: { type: Date, default: Date.now },
}) 
// exportamos
export const UserModel = mongoose.model('User',userSchema);