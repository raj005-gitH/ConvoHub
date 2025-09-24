const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));

/* async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
 */

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected to Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}


//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find(); //async function    
    res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    try {
        await newChat.save();
        res.redirect("/chats");
    } catch(err) {
        if(err.name === "ValidationError") {
            res.render("new.ejs", { error : err.message, from, to, msg});
        } else {
            console.log(err);
            res.send("Something went wrong");
        }
    }
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//Update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg : newMsg } = req.body;

    try {
        let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {
          msg : newMsg ,
          updated_at: new Date()
        },
        { runValidators: true, new : true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
    } catch(err) {
        console.log(err);
        res.send("Error updating chat");
    }
});

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    //console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(PORT, () => {
    console.log("server is listening on port 8080");
});