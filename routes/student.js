//Create a mentor
import express from "express";
import { ObjectId } from "mongodb";
import {client} from "../app.js"
const router=express.Router();

//Create a student

router.post("/",async(req,res)=>{
    try{
        const stu=req.body;
        const mv=await client
        .db("Students")
        .collection("student")
        .insertMany(stu)
        res.send("Student created successfully")
        db.close();
    }
    catch{
        res.status(500).send({error:"Error inserting student into database"})
        console.log(err);
    }
})

// API to Assign a student to Mentor:

router.put("/assign", async(req, res) => {
    const studentId = req.body.studentId;
    const mentorId = req.body.mentorId;
    const mv=await client
    .db("Students").collection("student").updateOne(
      { _id: ObjectId(studentId) },
      { $set: { mentorId: mentorId } },
      (err, result) => {
        if (err) {
          res.status(500).send({ error: "Error updating student mentor" });
        } else {
          res.send("Student assigned to mentor Successfuly");
        }
      }
    );
  });


  //API to Assign or Change Mentor for a particular Student
  
  router.put("/mentor",async (req, res) => {
    const studentId = req.body.studentId;
    const mentorId = req.body.mentorId;
    const mv=await client
    .db("Students").collection("student").updateOne(
      { _id: ObjectId(studentId) },
      { $set: { mentorId: mentorId } },
      (err, result) => {
        if (err) {
          res.status(500).send({ error: "Error updating student mentor" });
        } else {
          res.send(result);
        }
      }
    );
  });


  export default router;