
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Schema of Uploaded file

const UploadedVenueSchema = new Schema({
    food:{
        type: String,
        
    },
    block:{
        type: String,
        
    },
    venue:{
        type:String,
        
    },
    type:{
        type:String,
        
    },
    floor:{
        type:String,
        
    },
    venuecapacity:{
        type:String,
        
    },
    projector:{
        type:String,
        
    },
    podium:{
        type:String,
        
    },
    lanports:{
        type:String,
        
    },
    powerports:{
        type:String,
        
    },
    ac:{
        type:String,
        
    },
    whiteboard:{
        type:String,
        
    },
    chalkboard:{
        type:String,
        
    },
    roundtable:{
        type:String,
        
    },
    flexlayout:{
        type:String,
        
    },
    av:{
        type:String,
        
    },
    classtype:{
        type:String,
        
    },
    nearparking:{
        type:String,
        
    },
    nearwashroom:{
        type:String,
        
    },
    nearlift:{
        type:String,
        
    }
});

mongoose.model("venues",UploadedVenueSchema);
