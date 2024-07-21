const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
 const JWT_TOKEN="Huzaifa1234"

//Route1:  Create user using post  api/auth/createuser

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })],
    async (req, res) => {
      let success=false
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array() });
        }

      try{
         
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry, email already exists" });
            }

            const salt =await bcrypt.genSaltSync(10);
 
            const secPass=await bcrypt.hash(req.body.password,salt) 
           
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
let data={
    user:{
        id:user.id
    }
}

var token = jwt.sign(data,JWT_TOKEN);
success=true
res.json({success,token})
} catch(err){
    console.error(err.message)
    res.status(500).send("Internal Server Error")
    }


}
);


// Route2: Login user  api/auth/login
 
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blannk').exists()],
    async (req, res) => {
       let success=false
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        let {email,password} = req.body
        try{
            let user=await User.findOne({email})
            if (!user) {
                return res.status(400).json({ error: "Please Login with correct creadentials" });
            }
            const passwordCompre=await bcrypt.compare(password,user.password)
            if(!passwordCompre){
                
                return res.status(400).json({success, error: "Please Login with correct creadentials" });
               
            }

            let data={
                user:{
                    id:user.id
                }
            }
            
            var token = jwt.sign(data,JWT_TOKEN);
        success=true
            res.json({success,token})
        }
        catch(err){
            console.error(err.message)
            res.status(500).send("Internal Server Error")
            }

    })



// Route3: Logged in user detail api/auth/getuser  Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;



