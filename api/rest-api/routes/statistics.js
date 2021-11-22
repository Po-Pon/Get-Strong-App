const router = require("express").Router();
const mongoose = require("mongoose");
const test = require("../models/test");
const User = require("../models/User");


// Get statistics by id
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {} = user._doc;
        
        const New_test = await test.aggregate([
            {
              '$project': {
                'date': {
                  '$dateToString': {
                    'format': '%Y-%m-%d', 
                    'date': '$date'
                  }
                }
              }
            }
          ]);
        
        res.status(200).json(New_test);
        
    }catch(err) {
        console.log(err)
    }
});

module.exports = router;