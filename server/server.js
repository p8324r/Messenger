const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { admin } = require('./firebaseconfig');
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","CONNECT","DELETE","PUT","OPTIONS","HEAD"]
    }
});  

io.on('connection',(socket)=>{

    socket.on('send',(data)=>{
        
        console.log(data);
        console.log(data.msg);
        console.log(data.communicateTo);
        console.log(data.communicateFrom);
        console.log(data.timestamp);
        if(data.communicateTo === 'All'){
            socket.broadcast.emit("recieve_message__all",{'msg':data.msg,'time':data.timestamp,'from':data.communicateFrom});
        }
        else{
            socket.broadcast.emit(`${data.communicateTo}__recieve_message__`,{'msg':data.msg,'time':data.timestamp,'from':data.communicateFrom});
        }
    })
    

    

})

server.listen(5000,()=>{
    console.log("Server is running on PORT 5000");
});