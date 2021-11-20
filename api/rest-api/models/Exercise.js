const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    namecode:{
        type:String
    },
    name:{
        type:String,
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);