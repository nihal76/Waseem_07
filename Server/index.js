const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const Register = require('./routes/Auth')
const Login = require('./routes/Login')
const Blogs = require('./routes/blogs')
const Users = require('./routes/Usernames')

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => console.log('connected'))
.catch(() => console.log('error'))


app.use(cors())
app.use('/Files',express.static(path.join(__dirname, "Files")));
app.use("/Profile", express.static(path.join(__dirname, "Profile")))

console.log(__dirname)
app.use(express.json())

// middlewares for handling request for routes
app.use('/api/auth/register', Register)
app.use('/api/auth/login', Login)
app.use('/api/blogs', Blogs)
app.use('/api/users', Users)
app.listen(3000)