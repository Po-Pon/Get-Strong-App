const express = require("express");
const pool = require("../config");
const bcrypt = require ('bcrypt');

router = express.Router();

router.post("/register", async function (req, res, next){

    // User send form data to backend
    console.log(req.body)
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm

    try {
        res.send("dasdsadsa")
    } catch (error) {
        next(error);
    }
    finally{
    }
})

exports.router = router;