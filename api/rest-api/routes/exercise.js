const router = require('express').Router();
const Exercise = require('../models/Exercise');

// Post a exercise
router.post("/exercise", async (req, res) => {
    try {
        
        const newExercise = await new Exercise({
            namecode: req.body.namecode,
            name: req.body.name,
            image: req.body.image
        });

        const New_Exercise = await newExercise.save();
        res.status(200).json(New_Exercise);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//Get a exercise by name
router.get("/exercise/:name", async (req, res) => {
    try {
        
        const exercise = await Exercise.findOne({namecode:req.params.name});
        res.status(200).json(exercise);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;