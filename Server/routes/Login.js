const router = require('express').Router()
const userSchema = require('../models/Users')

router.post('/', async (req,res) => {
  const username = await userSchema.findOne({username : req.body.username})
  if(username){ /*if user exists already */
    if(req.body.password === username.password){
       return res.status(200).send('loginned!')
    }
    res.status(400).send('Invalid password')
  }
  else{
    res.status(404).send(`user doesn't exist`)
  }
})
module.exports = router;

