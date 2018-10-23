
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FacultySchema = new Schema({

    Femail:{
        type: String,
        required: true
    },
    Fid:{
        type:String,
        required:true
    },
   Fname:{
       type:String,
       required:true
   },
   Fsubject:{
       type:String,
   },
   Fcontact:{
       type:Number,
       required:true,
   },
   Fposition:{
       type:String,
       required:true
   },
   Flectures:{
       type:Number
   },
   Fclass:{
       type:String
   },
   Fyear:{
        type:Number
   },
   Fpclass:{
       type:String
   },
   Fpsubject:{
       type:String
   },
   Fpyear:{
       type:Number
   }   

})

mongoose.model('addFaculty',FacultySchema);