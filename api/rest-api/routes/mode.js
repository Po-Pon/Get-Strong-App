const router = require('express').Router();
const Mode = require("../models/Mode");


router.post("/mode", async (req,res) => {
    try{
        
        const newMode = await new Mode({
            name: req.body.name,
            image: req.body.image,
            level: req.body.level,
            list: req.body.list,
            time: req.body.time,
            workout: req.body.workout,
        })

        const New_Mode = await newMode.save();
        res.status(200).json(New_Mode);

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;