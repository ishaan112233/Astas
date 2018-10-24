
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
     },
    //  Day:{
    //      type:String,
    //     //  required:true,
    //  },
     Subject:{
         type:String,
        //  re/quired:true
     },
     Venue:{
        type:String,
        // required:true
     },
     id:{
        type: String,
     }
}); 
const teacherschema = new Schema({
   teachermail: {
       type: String
    }
    // password_teacher:{
    //     type: String
    // }
});
const hodschema = new Schema({
   hodmail:{
       type: String
   }
//    password_hod:{
//     type: String
//     }
});
// const moderator = new Schema({
//     email: {
//         type: String
//     },
//     // password: {
//     //     type: String
//     // }
// })
mongoose.model('teacher',teacherschema);
mongoose.model('hod',hodschema);
mongoose.model('sendTimetables',SendTimetableSchema);
// mongoose.model('moderator',moderator);