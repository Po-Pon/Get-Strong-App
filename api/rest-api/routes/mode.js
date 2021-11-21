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
        });

        const New_Mode = await newMode.save();
        res.status(200).json(New_Mode);

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Get all mode
router.get("/mode", async (req, res) => {
    try{
        const allMode = await Mode.find();
        res.status(200).json(allMode);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Get mode by level
router.get("/mode/:level", async (req, res) => {
    try {
        
        const mode = await Mode.find({level:req.params.level});
        res.status(200).json(mode);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;