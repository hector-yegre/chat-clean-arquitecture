
import mongoose from 'mongoose'
import { required } from 'zod/v4/core/util.cjs'



const conversationSchema = new mongoose.Schema({

    idGroup: { type: Boolean, default: false},
    name: {type:String}, // para grupos 
    participants: [{
        user:{type: mongoose.Types.ObjectId, ref: "User", require:true},
        role:{ type:String, enum:["ADMIN","USER"],require:true}
    }],
    messages:[{
        emisor: {type: mongoose.Types.ObjectId, ref: "User", required: true},
        content:{type:String, required:true},
        createAt:{type:Date, default: Date.now}
    }],
    createAt:{type:Date, default: Date.now}
});


export const ConversationModel = mongoose.model("Conversation",conversationSchema)


