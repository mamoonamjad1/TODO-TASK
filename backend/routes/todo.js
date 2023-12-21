const express = require('express')
const router = express.Router()
const todModel = require("../model/todo")
const todoModel = require('../model/todo')

router.post("/add", async(req, res) => {
    console.log("Route Hit")
    console.log(req.body); 
    const { name, description, priority, status, dueDate } = req.body;

    try {
        const todo = await todoModel.create({
            name,
            description,
            priority,
            status,
            dueDate,
        });
        console.log(todo)
        res.status(200).send("Added Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/",async(req,res)=>{
    const todos = await todoModel.find()
    res.status(200).send(todos)
})

router.get("/single-todo/:id",async(req,res)=>{
    try{
    const { id } = req.params;
    const todo = await todModel.findById(id)
    res.status(200).send(todo)
    }catch{
        console.log(err)
    }
})



module.exports = router
