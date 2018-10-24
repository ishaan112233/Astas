

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for sections

const sectionsSchema = new Schema({
    Section:{
        type:String
    },
    Stream:{
        type:String
    },
    Students:{
        type:String

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Schema of requirements of each section

const sectionsSchema = new Schema({
    Stream:{
       type:String 

    },
    Year:{
        type:Number
    },

    Faculty:[{
        type:String
    }],
    Subjects:[{
        type:String

    Section:{
        type: String,
    },
    Students:{
        type: String,
    },
    Faculty:[{
        type: String,
    }],
    Subjects:[{
        type: String,

    }],
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
})




mongoose.model('section',sectionsSchema)

mongoose.model('section',sectionsSchema);

