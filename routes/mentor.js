//Create a mentor
import express from "express";
import { ObjectId } from "mongodb";
import {client} from "../app.js"
const router=express.Router();
//API to assign a mentor
router.post("/", async(req,res)=>{
    try{
    const mentor=req.body;
    const mv= await client
    .db("Students").
     collection("mentor")
     .insertMany(mentor)
     res.send("Mentor created successfully")
     db.close();
    }
    catch{
       
res.status(500).send({error:"Error inserting mentor into database"})
    }
    })
    
    //API to Select one mentor and Add multiple Students:
 router.post("/students", async(req, res) => {
    const mentorId = req.body.mentorId;
    const studentIds = req.body.studentIds;
    const mv=await client
    .db("Students").collection("student").updateMany(
      { _id: { $in: studentIds.map((id) => ObjectId(id)) } },
      { $set: { mentorId: mentorId } },
      (err, result) => {
        if (err) {
          res.status(500).send({ error: "Error updating student mentor" });
        } else {
          res.send("Students assigned to mentor Successfully");
        }
      }
    );

  });


 //API to show all students for a particular mentor:
 router.get("/:mentorId/students", async(req, res) => {
    const mentorId = req.params.mentorId;
    const mv=await client
    .db("Students").collection("student")
      .find({ mentorId: mentorId })
      .toArray((err, students) => {
        if (err) {
          res.status(500).send({ error: "Error fetching students for mentor" });
        } else {
          res.send(students);
        }
      });
  });
  export default router;