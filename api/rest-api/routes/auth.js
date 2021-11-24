const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;