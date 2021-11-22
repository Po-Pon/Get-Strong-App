const router = require("express").Router();
const mongoose = require("mongoose");
const test = require("../models/test");
const User = require("../models/User");


// Get statistics by id
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {statistics, ...other} = user._doc;
        
        res.status(200).json(statistics);
    }catch(err) {
        console.log(err)
    }
});

module.exports = router;