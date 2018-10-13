
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose.createConnection('faculties'); // not working
// Create Schema of Add Faculty
/*mongoose.connect('faculties');

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};   

*/

const FacultySchema = new Schema({

    Femail:{
        type: String,
        unique: true,
        required: true
    },
    Fid:{
        type:String,
        unique:true,
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
       unique:true
   },
   Fposition:{
       type:String,
       required:true
   }   

})

mongoose.model('addFaculty',FacultySchema);