const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req,res) =>{
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOne({email:req.body.email});
        if(user){
            res.status(400).json("Email is used");
        }
        else{
            // create new user
            const newUser = await new User({
                email: req.body.email,
                password: hashPassword,
                weight: req.body.weight,
                height: req.body.height,
                age: req.body.age,
                gender: req.body.gender,
                statistics:[{
                    date: new Date(),
                    burn: 100
                }
                ]
            });

            // save user and respond
            const New_User = await newUser.save();
            res.status(200).json(New_User)
        }
        
    } catch(err){
        console.log(err)
    }
});

exports.router = router;