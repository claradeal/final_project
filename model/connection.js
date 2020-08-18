const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/<collection>", { useNewUrlParser: true }, (error)=>{
    if(!error)
    {
        console.log("Success connected");
    }
    else
    {
        console.log("Error connecting to database")
    }
});

const novel = require("./novel.model");