const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookVenueSchema = new Schema({
  section:{
    type:String
  },
  start:{
    type:Date
  },
  end:{
    type:Date
  },
  fromtime:{
    type:String
  },
  endtime:{
    type:String
  }
})


mongoose.model('bookvenues',bookVenueSchema);
