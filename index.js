const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat  = require("./models/chat.js")

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

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

//Index route
app.get("/chat", async (req, res) => {
    const allChats = await chat.find(); // fetch all chat documents
    res.render("index.ejs", { chat: allChats });
});

//New chat Route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})

//Create new chat route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle form submission for new chat
app.post('/chat', (req, res) => {
    let { from, to, msg } = req.body;
    let newchatcreate = new chat({
        from: from,
        to: to,
        msg: msg,
        create_at: new Date()
    });
    newchatcreate.save()
    .then(() => {
        console.log("New chat created successfully");
    })
    res.redirect("/chat");
});
//Edit chat route
app.get("/chat/:id/edit", async (req, res) => {
    const chatId = req.params.id;
    const chatToEdit = await chat.findById(chatId);
    res.render("edit.ejs", { chat: chatToEdit });
})

//Update chat route
app.post("/chat/:id", async (req, res) => {
    let { from, to, msg } = req.body;
    let chatId = req.params.id;
    await chat.findByIdAndUpdate(chatId, {
        from: from,
        to: to,
        msg: msg
        // Do not update create_at here; optionally add updated_at if needed
    });
    res.redirect("/chat");
});
app.get("/",(req,res)=>{
    res.send("Welcome to WhatsApp Chat API ");
})
