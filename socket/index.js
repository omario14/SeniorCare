import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin:"http://localhost:3000"
    }
 });

 let onlineUsers = []
 const addNewUser =(username,socketId,roles)=>{
    
    !onlineUsers.some((user)=>user.username===username) &&
    onlineUsers.push({username,socketId,roles});
 }

 const removeUser = (socketId) =>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId!== socketId);
 };

 const getUser = (username)=>
 {
    return onlineUsers.find((user)=>user.username===username);
 };
 const getAccompagnant = (socket)=>
 {
    return onlineUsers.filter((user)=>user.roles==="ROLE_ACCOMPAGNANT" && user.socketId!==socket.id);
 };

io.on("connection", (socket) => {
   socket.on("newUser",(username,roles)=>{
    addNewUser(username,socket.id,roles);
   
    
   });

   socket.on("sendNotification",({senderName,content,type})=>{
      console.log("receisver",onlineUsers)
    const receiver = getAccompagnant(socket);
    console.log("receiver",receiver)
    if (receiver){

    receiver.map((rec)=>{
      io.to(rec.socketId).emit("getNotification",{
         senderName,
         content,
         type 
      });
    } )
   }
    
   });  

  socket.on("disconnect",()=>{
    removeUser(socket.id);
  });
});

io.listen(5000);