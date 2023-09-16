import userModel from "../../db/user.model.js";
import bcrypt from "bcrypt";

// .........Sign UP .....................

const signUp = async (req, res) => {
  try {
    let { email } = req.body;
    let foundeduser = await userModel.findOne({ email: email });
    if (foundeduser) {
      res.status(409).json({ massage: "Already Register" });
    } else {
      let hashedPass = bcrypt.hashSync(req.body.password, 7);
      let addedUser = await userModel.insertMany({
        ...req.body,
        password: hashedPass,
        isDeleted: false,
      });
      res.status(201).json({ massage: "user added", addedUser });
    }
  } catch (error) {
    res.status(400).json({ massage: "error", error });
  }
}; 

// .................update User..............
const updateUser =async (req, res) => {
  let{id}=req.params
  let updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      userName: req.body.userName,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      age:req.body.age
    },
    { new: true }
  );
  res.json({ massage:"user-update", updatedUser });
  
};

// change password
const changePass = async(req,res)=>{
  try {
     let { id } = req.params;
     let foundedUser = await userModel.findById(id);
     if (foundedUser) {
      let hashedPass = bcrypt.hashSync(req.body.password, 7);
       foundedUser.password = hashedPass;
       res.status(201).json({ massage: "password changed", foundedUser });
      }else{
        res.status(400).json({ massage: "user not found" });
      }
    } catch (error) {
    res.json({ massage: "error", error });
  } 
}

// ..............delet User..................
const deleteUser = async(req, res) => {
  let {id}=req.params
  let deletedUser = await userModel.findByIdAndDelete(id)
  res.json({ massage: "user-delete", deletedUser });
  
};

// ....................Get All Users..............
const gatAllUser =async(req,res)=>{
  let allData =await userModel.find()
  res.json({ massage: "all-user", allData });
}

//............. sign In...............
const signIn = async (req, res) => {
  let { email, password } = req.body;
  let foundeduser = await userModel.findOne({ email: email });
  let matchedPass = bcrypt.compareSync(password, foundeduser.password);
  if (!email && !matchedPass) {
    res.json({ error: "Write email and password" });
  }
  try {
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ error: "Invalid email or password." });
    }
    if (!matchedPass) {
      return res.json({ error: "Invalid email or password." });
    }
    res.json({ message: "SignIn Done", user });
  } catch(error) {
    console.error("sign-in Error", error);
  }
};
//5-search for user where his name start with "*X*" and age less than *Y*=> *(X,Y => variables)
const search = async (req, res) => {
  const { userName, age } = req.body;
  try {
    const user = await userModel.find({
      userName: { $regex: `^${userName}`, $options: "i" },
      age: { $lte: parseInt(age) },
    });
    
    if(!user[0] ){
      res.send( "user is not Found" );
    }else{
      res.json({massage:"users is", user });
    }
  } catch (err) {
    res.status(409).json({ err: "error is not Found" });
  }
};

const searchByAge = async (req, res) => {
  const { minAge, maxAge } = req.params;
  try {
    const users = await userModel.find({
      age: { $gte: parseInt(minAge), $lte: parseInt(maxAge) },
    });
    res.json({ users });
  } catch (err) {
    res.status(409).json({ err: "error" });
  }
};


export {
  signUp,
  updateUser,
  deleteUser,
  gatAllUser,
  signIn,
  search,
  searchByAge,
  changePass
};

