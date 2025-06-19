import mongoose from "mongoose" ;

// we need :
// 1.create a schema
// 2.model based on that schema

const noteSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    content : {
        type:String,
        required:true
    },

},{timestamps: true} // includes Created at , updated at
) ;

const Note = new mongoose.model("Note",noteSchema) ;

export default Note ; 
