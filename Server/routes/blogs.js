const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Blogs = require('../models/Blogs')
const Users = require('../models/Users')

// fetch all blogs for homepage
router.get('/all', async (req,res) => {
     let blogs = await Blogs.find().lean()
     console.log(blogs)
     blogs = blogs.map((blog) => {
          return {
            ...blog,
            img: `/Files/${blog.img}`,
          };
     })
     res.json(blogs)
})

// to post blog
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Files/");
  },
  filename: (req, file, cb) => {
 
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

router.post("/upload/:username", upload.single("file"), async(req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
     const {title,content} = req.body
     const {filename} = req.file
     const username = req.params.username
     // the blog which has to be stored in mongodb
    const user = await Users.findOne({username : username})
    console.log('user ', user)
      const blog = {
        userId: user._id,
        title : title,
        content : content,
        img : filename
      };
      console.log('blog ', blog)
     await Blogs.insertOne(blog)
  res.send(`Blog Posted successfully`);
});

// fetch specific user blogs
router.get('/:username', async (req,res) => {
 try {
   const name = req.params.username;
   console.log("params ", req.params.username);
   let user = await Users.findOne({ username: name });
   user = {
     ...user.toObject(),
     profilePicture: `/Profile/${user.profilePicture}`,
   };
   console.log('profile ', user)
   let userBlogs = await Blogs.find({userId : user._id}).lean();
  userBlogs = userBlogs.map((blog) => (
    {...blog,'img' : `/Files/${blog.img}`}
  ))
   // if blogs are present , then send blogs as response
   console.log('userblogs ', userBlogs)
   if (userBlogs) {
     res.status(200).json({user, userBlogs});
   } else {
     res.status(404).json();
   }
 } catch (error) {
    console.log(error)
 }
})

// blog delete
router.delete('/delete/:blogId', async (req,res) => {
   const blogId = req.params.blogId
        const deleted = await Blogs.findByIdAndDelete(blogId)
        console.log('deleted ', deleted)
      res.send()
})

// update blog
router.put("/update/:blogId", upload.single("file"), async (req, res) => {
  const blogId = req.params.blogId;
  console.log(blogId);
  const { title, content } = req.body;
  const tobeUpdated = await Blogs.findById(blogId);
  //  if image has been updated , the destruct the new image or old image
  const filename = req.file
    ? req.file.filename
    : tobeUpdated.img

    console.log(title, content, filename);

  const updatedBlog = {
    ...tobeUpdated.toObject(),
    title: title,
    content: content,
    img: filename,
  };
  const updatedBlogs = await Blogs.findByIdAndUpdate(blogId, updatedBlog, {
    new: true,
  });
  console.log("updated ", updatedBlogs);
  res.status(204).send()
});


module.exports = router