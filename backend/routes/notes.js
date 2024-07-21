const express = require("express");
const router=express.Router()
const fetchuser=require('../middleware/fetchuser')
const Note=require('../models/Notes')
const { body, validationResult } = require('express-validator');
// Route 1: get all notes 

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
   const notes=await Note.find({user:req.user.id})
    res.json(notes)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})

// Route 2: Add notes 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('desciption', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, desciption, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new Note({
            title,
            desciption,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//  Route 3: Update note 
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        
   
    const {title,desciption,tag}=req.body
    const newnote={}
    if(title){newnote.title=title}
    if(desciption){newnote.desciption=desciption}
    if(tag){newnote.tag=tag}

  let note=await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send("not Found")
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})
    res.json(note)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})

// Route 4: Delete notes 
router.delete('/delete/:id',fetchuser,async (req,res)=>{
try {
    

  let note=await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send("not Found")
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Not has been deleted"})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})
module.exports=router

