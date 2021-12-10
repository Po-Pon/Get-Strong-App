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

// get data
router.get("/AllUserData/:id", async (req, res) => {
  try{
      const user = await User.findById(req.params.id);
      
      res.status(200).json(user);
  }catch(err) {
      console.log(err)
  }
});

// Update statistics user
router.put("/:id", async (req, res) => {
  try {
    
    const pon = await User.updateOne(
      { _id : req.params.id},
      { $push: {"statistics": {
          date: new Date,
          burn: req.body.burn,
          exercise: req.body.mode
      }}
    }
  );

    res.status(200).json(pon);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;