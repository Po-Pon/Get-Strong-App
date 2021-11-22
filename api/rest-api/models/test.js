const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("test", testSchema);