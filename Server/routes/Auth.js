const express = require('express')
const UserSchema = require('../models/Users')
const Blogs = require('../models/Blogs')
const Users = require('../models/Users')
const router = express.Router()

router.post('/', async (req,res) => {
  // check if user is already registered through username
  const username = await UserSchema.findOne({username : req.body.username})
  console.log(username)
  if(! username){  /* if not registred */
      const user = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      
      });
      try {
        const response = await user.save();
        res.status(201).send("Registered! pls login");
      } catch (error) {
        res.status(400).send(error);
      }
  }
  else{
    res.send('User already exist, kindly login!')
  }

})

// logout
router.delete('/logout/:username', async (req,res) => {
  const username = req.params.username
  const findUser = await Users.findOne({username : username})
  // first delete all the blogs of that user 
  const deleted = await Blogs.deleteMany({userId : findUser._id})
  console.log('logout ', deleted)
  // delete user account
 const user = await Users.findByIdAndDelete(findUser._id)
 res.send({msg : 'User has been logged out, please create account'})
})

module.exports = router