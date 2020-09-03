// use mongoose to connect Node.js environment with mongodb server
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/<collection>", { useUnifiedTopology: true, useNewUrlParser: true }, (error)=>{
// if(!error)
//     {
//         console.log("Success connected");
//     }
//     else
//     {
//         console.log("Error connecting to database")
//     }
// });

// added chunk below on Sept 3
var url = process.env.DATABASEURL || "mongodb://localhost:27017/final_project"
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (error)=>{
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