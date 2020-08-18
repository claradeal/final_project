// use mongoose to connect Node.js environment with mongodb server

const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/<collection>", { useNewUrlParser: true }, (error)=>{
mongoose.connect("mongodb://localhost:27017/<collection>", { useUnifiedTopology: true, useNewUrlParser: true }, (error)=>{
    if(!error)
    {
        console.log("Success connected");
    }
    else
    {
        console.log("Error connecting to database")
    }
});

// import course model created
const novel = require("./novel.model");