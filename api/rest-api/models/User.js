const mongoose = require("mongoose");

const UserSchama = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        min: 6,
    },
    profilePicture:{
        type:String,
        default:"profile1.png",
    },
    weight:{
        type:Number,
        default: 0,
    },
    height:{
        type:Number,
        default: 0,
    },
    age: {
        type:Number,
        default: 0,
    },
    gender:{
        type:Number,
        enum: [0,1,2],
        default: 0,
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", UserSchama);