const express = require('express');
const User = require('../model/User');
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('../jwt')

router.post('/signup', async(req, res)=> {
    try {
        const data = req.body;
        const newUser = new User(data)
        const response = await newUser.save()
        // const payload = {
        //     id: response.id
        // }
        // // console.log('payload is : ',payload)
        // const token = generateToken(payload)
        // console.log('Registered Successfully, why')
        res.status(200).json({message: "Registered Successfully", response: response, token: token})
    } catch (error) {
        res.status(500).json({message: "Email is already registered, try with new email"})
    }
})

router.post('/login', async(req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(404).json({message: "Incorrect Email"})
        }

        if(!(await user.comparePassword(password))){
            return res.status(404).json({message: "Incorrect Password"})
        }

        const payload = {
            id: user.id
        }
        const token = generateToken(payload)

        // console.log('Login successfully')
        return res.status(200).json({message: "login Successfully", token: token})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;