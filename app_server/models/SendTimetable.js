
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema of Time table

const SendTimetableSchema = new Schema({
     Stream:{
        type:String,
        // required: true,
        // unique:true
     },
     section:{
         type:String,
        //  required:true
     },
     Year:{
         type:Number,
        //  required:true
     }
    //  Day:{
    //      type:String,
    //     //  required:true,
    //  },
    //  Subject:{
    //      type:String,
    //     //  re/quired:true
    //  },
    //  Venue:{
    //     type:String,
    //     // required:true
    //  },
   
}); 
const teacherschema = new Schema({
   teachermail: {
       type: String
    }
});
const hodschema = new Schema({
   hodmail: String
});

mongoose.model('teacher',teacherschema);
mongoose.model('hod',hodschema);
mongoose.model('sendTimetables',SendTimetableSchema);