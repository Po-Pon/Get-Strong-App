const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//update user
router.put("/:id", async (req, res) => {

  try{
    const user = await User.find({
      statistics: { burn:100}
    });

      res.status(200).json(user);
  }catch (err) {
    console.log(err);
      return res.status(500).json(err);
  }

    // if (req.body.userId === req.params.id){

         
        

    // }else{
    //     return res.status(403).json("You can update only your account!");
    // }
});

//get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, statistics, ...other} = user._doc
        
        res.status(200).json(statistics);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;