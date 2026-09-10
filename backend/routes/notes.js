const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all notes data using: Get "/api/notes/fetchallnotes" Login required
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
    try{
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Error occurred")
    }
})

//ROUTE 2: Add a new note using: Post "/api/notes/addnotes" Login required
router.post('/addnotes', fetchuser,
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description', 'Please write at least 5 characters').isLength({ min: 5 }),async (req,res)=>{

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
   const notes =await Notes.create({
        title: req.body.title,
        description: req.body.description, 
        tag:  req.body.tag,
        user: req.user.id
     })
    res.json(notes)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Error occurred")
    }

})

//ROUTE 3: Update an existing note using: Put "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser,async (req,res)=>{
    
    const{title,description,tag}= req.body
try{
    const newNote = {}
     if(title){
        newNote.title = title
     }
      if(description){
        newNote.description = description
     }
      if(tag){
        newNote.tag = tag
     }

     let note = await Notes.findById(req.params.id)
     if(!note){
        return res.status(404).send("Not found")
    }
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

     note =await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
}
 catch(error){
        console.log(error.message)
        res.status(500).send("Error occurred")
    }
})


//ROUTE 4: Delete an existing note using: Delete "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser,async (req,res)=>{

try{
     let note = await Notes.findById(req.params.id)
     if(!note){
        return res.status(404).send("Not found")
    }
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")

    }

     note =await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note})
}
 catch(error){
        console.log(error.message)
        res.status(500).send("Error occurred")
    }
})


module.exports= router