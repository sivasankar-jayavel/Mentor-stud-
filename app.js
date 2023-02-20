
import express from "express";
import { MongoClient } from "mongodb";
import mentorRouter from './routes/mentor.js'
import studentRouter from "./routes/student.js"
import * as dotenv from 'dotenv';
dotenv.config()

const app=express()
const port=process.env.port || 8000; //auto assign port or Runn 8000

const url=process.env.DB
const client=new MongoClient(url);

 await client.connect();
 console.log("Mongo is connected")

 app.use(express.json());
 app.get("/", function (request, response) {
    response.send(" Welcome to My Student-Mentor-API 💖");
  });
app.use("/api/mentor",mentorRouter)
app.use("/api/student",studentRouter)
   
app.listen(port,()=>{
    console.log("Now Your Listening on port"+" "+port)
});
export{client};
