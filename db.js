// Mongoose is like a bridge between nodejs server and mongodb server//
const mongoose = require("mongoose");
require('dotenv').config()
// const mongoURL = process.env.LOCAL_DB_URL;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("Connction Faild due to follwoing error=>",err);
})

// Get the default connection 
// mongoose maintain a default connection object representing the mongoDb connection 

// const db = mongoose.connection;

// Define event listner for database connection
// db.on("Connected",()=>{
//     console.log("Connected to mongoDB server-->");
// })

// db.on("error",(error)=>{
//     console.log("Mongodb connection error",error);
// })

// db.on("Disconnect",()=>{
//     console.log("MongoDB disconnect");
// })

// Export the databse connection //
// module.exports = db;


