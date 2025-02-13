const express = require('express')
const multer = require('multer')
const path = require('path')
const Users = require('../models/Users')
const router = express.Router()

// for handlinhg file uploads for user profile picture
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Profile/");
  },
  filename: (req, file, cb) => {
 
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req,res) => {
  let response = await Users.find({})
  console.log('usernames ', response)
  response = response.map((user) => ({
     ...user.toObject(),
     profilePicture: `/Profile/${user.profilePicture}`
   }));
  res.status(200).json(response)
})
// specific user
router.get('/:username', async (req,res) => {
  const username = req.params.username
 const specificUser = await Users.findOne({username})
 const response = {
   ...specificUser.toObject(),
   profilePicture: `/Profile/${result.profilePicture}`,
 };
 console.log(response)
 res.send(response)
})

router.put('/update/:username', upload.single('file'),async (req,res) => {
   console.log(req.body)
   console.log(req.file)
   const {username, email, password} = req.body
       let user = await Users.findOne({username : req.params.username})
       console.log('user , ', user)
        const tobeUpdated = {
          ...req.body
        };
        // if profile is updated
        if(req.file){
           tobeUpdated.profilePicture = req.file.filename
        }

       console.log('tobeupdated ', tobeUpdated)
        const result = await Users.findByIdAndUpdate(user._id, tobeUpdated, {new : true})
      const response = {
        ...result.toObject(),
        'profilePicture' : `/Profile/${result.profilePicture}`
      }
  res.send(response)
})

module.exports = router