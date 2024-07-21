const mongoose=require('mongoose')
 
const NotesSchema=new mongoose.Schema({

   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
     title:{
        type:String,
        required:true
     },
     desciption:{
        type:String,
        required:true,
        
     },
     tag:{
        type:String,
        default:"General"
        
     },
     date:{
        type:Date,
        default:Date.now
     }
 })

 const Note=mongoose.model('Note',NotesSchema)
 module.exports=Note