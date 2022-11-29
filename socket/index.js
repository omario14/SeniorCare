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

 const getAccompagnants = ()=>
 { 
    return onlineUsers.filter((user)=>user.roles==="ROLE_ACCOMPAGNANT" );
 };

io.on("connection", (socket) => {
   console.log("HELLLO socket",socket.id)
   socket.on("newUser",(username,roles)=>{
    addNewUser(username,socket.id,roles); 
   
    
   });

   socket.on("sendNotificationMedication",({senderName,content,time,type})=>{
      console.log("receisver",onlineUsers)
    const receiver = getAccompagnants();
    console.log("receiver",receiver)
    if (receiver){

    receiver.map((rec)=>{
      var sid= rec.socketId;
      io.to(rec.socketId).emit("getNotification",{
         sid,
         senderName,
         content,
         time,
         type 
      });
    } )
   }
    
   });  
   socket.on("sendNotification",({senderName,content,time,type})=>{
      console.log("receisver",onlineUsers)
    const receiver = getAccompagnant(socket);
    console.log("receiver",receiver)
    if (receiver){

    receiver.map((rec)=>{
      var sid= rec.socketId;
      io.to(rec.socketId).emit("getNotification",{
         sid,
         senderName,
         content,
         time,
         type 
      });
    } )
   }
    
   });  

  socket.on("disconnect",()=>{ 
   console.log("add",socket.id);
    removeUser(socket.id); 
    console.log(socket.id);
  });
});

io.listen(5000);