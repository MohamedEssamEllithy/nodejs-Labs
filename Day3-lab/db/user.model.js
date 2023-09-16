
//.......................... Create Schema .............................
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  age:Number,
  gender:String,
  phone:String
},{ timestamps:true});

//........................Create Model.................................
const userModel = mongoose.model("User",userSchema) // import in controlled/js

export default userModel
