const mongoose = require("mongoose");

const ModeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        max:50,
    },
    image:{
        type:String
    },
    level:{
        type:Number,
        enum: [1,2,3],
    },
    list:{
        type:Array,
        default:[],
    },
    time:{
        type:Number,
    },
    workout:{
        type:Number,
    }
});

module.exports = mongoose.model("Mode", ModeSchema);