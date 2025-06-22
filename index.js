const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat  = require("./models/chat.js")

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})

main()
.then(()=>{
   console.log("Connection Successfull");
})
.catch(()=> console.log("Connection Failed"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
    from: "1234567890",
    to: "0987654321",
    msg: "Hello, how are you?",
    create_at: new Date()
});
chat1.save()
.then((res)=>{
  console.log(res)
})

app.get("/",(req,res)=>{
    res.send("Welcome to WhatsApp Chat API ");
})
