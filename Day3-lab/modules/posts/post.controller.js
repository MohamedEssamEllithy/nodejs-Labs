import postModel from "../../db/post.model.js";
import userModel from "../../db/user.model.js";
const addPost = async (req, res) => {
  let { id } = req.body;
  let foundedUser = await userModel.findById(id);
  if (foundedUser) {
    let newPost = await postModel.insertMany({
      ...req.body,
      userId: id,
    });
    res.status(201).json({ masssage: "Post added", newPost });
  } else {
    res.status(400).json({ masssage: "user not found" });
  }
};

const updatePost = async (req, res) => {
  let { id } = req.params;
  try {
    let updatedPost = await postModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    res.json({ massage: "post-update", updatedPost });
  } catch (error) {
    res.json({ massage: "error to update", error });
  }
};

const deletePost = async (req, res) => {
  let { id } = req.params;
  let deleted = await postModel.findByIdAndDelete(id);
  let allPosts = await postModel.find();
  if (deleted) {
    res.status(201).json({ massage: "post-delete", allPosts });
  } else {
    res.status(400).json({ massage: "post not found" });
  }
};

const getAllPost = async (req, res) => {
  let allPost = await postModel.find({}).populate("userId");
  res.json({ allPost });
};
const getSortPosts = async (req, res) => {
  try {
    const allPosts = await postModel
      .find({})
      .populate("userId")
      .sort({ createdAt: -1 });
    res.json({ allPosts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { addPost, getAllPost, updatePost, deletePost, getSortPosts };
