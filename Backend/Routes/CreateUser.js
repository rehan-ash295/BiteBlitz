const express = require("express");
const router = express.Router();
const User = require('../Model/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;




router.post("/createUser", check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: hashedPassword

            })

            res.json({
                userCreate: true

            })

        } catch (error) {
            console.log(error.withMessage + "this is error one")
            res.json({
                userCreate: false

            })

        }


    })

router.post("/login", check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });

        }
        try {
            const signeduser = await User.findOne({
                email: req.body.email,
                password: req.body.password

            })
            const token= jwt.sign({id:signeduser._id },secret)
            
            if (signeduser) {

                res.json({
                    success: true,
                    Usertoken: token


                })
               
            }
            else {
                res.json({
                    success: false

                })

            }

        } catch (error) {
            console.log(error.withMessage + "sorry no user found")

        }


    })

module.exports = router