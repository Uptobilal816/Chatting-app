const mongoose = require("mongoose");
const Chat  = require("./models/chat.js");

main()
.then(()=>{
   console.log("Connection Successfull");
})
.catch(()=> console.log("Connection Failed"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats= [{
    from : "John",
    to : "Doe",
    msg : "Hello Doe",
    create_at: new Date()
}, {
    from : "Doe",
    to : "John",
    msg : "Hi John",
    create_at: new Date()
}, {
    from : "John",
    to : "Doe",
    msg : "How are you?",
    create_at: new Date()
}, {
    from : "Doe",
    to : "John",
    msg : "I am fine, thanks!",
    create_at: new Date()
}]
Chat.insertMany(allchats)