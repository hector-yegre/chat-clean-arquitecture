import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({

    isGroup: { type: Boolean, default: false},
    name: {type:String}, // para grupos 
    participants: [{
        user:{type: mongoose.Types.ObjectId, ref: "User", required:true},
        role:{ type:String, enum:["ADMIN","USER"],required:true}
    }],
    messages:[{
        emisor: {type: mongoose.Types.ObjectId, ref: "User", required: true},
        content:{type:String, required:true},
        createdAt:{type:Date, default: Date.now}
    }],
    createdAt:{type:Date, default: Date.now}
});


export const ConversationModel = mongoose.model("Conversation",conversationSchema)


