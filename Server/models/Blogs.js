const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId : {
      type : String,
      required : true
  },
   title : {
    type : String,
    required : true,
    min : 3
  },
  img : {
    type: String,
    required : true
  },
  content : {
    type : String,
    required : true
  }
})
module.exports = mongoose.model('blogs', postSchema)