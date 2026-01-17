import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { socketAuth } from "./socketAuth";



export const initSocketServer = (server:HttpServer) => {
    console.log('Initi de socket');
    
    
    const io = new Server(server,{
        cors:{
            origin: "*"
        }
    });

    io.use(socketAuth);
    
    io.on('connection',(socket)=>{
      
        console.log('usuario conectado:',socket.data.user.email);
    
       socket.on('chat-message',( msg )=>{
            
            io.emit('chat-message',{
                user:socket.data.user.email,
                message: msg,
            });

        });

        socket.on('disconnect', ()=> {
          console.log(" Usuario desconectado");
        });
    });
}