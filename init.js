const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
    from: "raj",
    to: "riya",
    msg: "send me your exam sheets",
    created_at: new Date()
    },
    {
    from: "hritik",
    to: "kajol",
    msg: "teach me JS callbacks",
    created_at: new Date()
    },
    {
    from: "rohan",
    to: "rishit",
    msg: "All the best!",
    created_at: new Date()
    },
    {
    from: "varun",
    to: "alia",
    msg: "How your exams are going?",
    created_at: new Date()
    },
    {
    from: "joy",
    to: "pia",
    msg: "give me the locker keys",
    created_at: new Date()
    },
    {
    from: "ranbir",
    to: "shraddha",
    msg: "I am waiting for you",
    created_at: new Date()
    }
];

Chat.insertMany(allChats);