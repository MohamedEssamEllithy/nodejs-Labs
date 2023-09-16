let users = [
  {
    name: "Mohamed",
    age: 25,
    id: 1,
  },
  {
    name: "Ali",
    age: 22,
    id: 2,
  },
  {
    name: "Emad",
    age: 29,
    id: 3,
  },
  {
    name: "Hadir",
    age: 35,
    id: 4,
  },
];
let posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
    author: "Mohamed",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
    author: "Ali",
  },
  {
    id: 3,
    title: "Third Post",
    content: "This is the content of the third post.",
    author: "Emad",
  },
  {
    id: 4,
    title: "fourth Post",
    content: "This is the content of the fourth post.",
    author: "Hadir",
  },
];

const express = require("express");
const app = express();
app.use(express.json());
// GET All users
app.get("/",(req,res)=>{
    res.json(users)
})

// adduser 

app.post("/", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json({massage:"adduser",users});
});

// update user
app.patch("/",(req,res)=>{
    const userToUpdate = users.find((user) => user.id === req.body.id);
        if (userToUpdate) {
          userToUpdate.name = req.body.name;
          userToUpdate.age = req.body.age;
           res.json({massage:"update",users});
        }else{
            res.json({massage:"user not found"});
        }
});

// GET all users sorted by name
app.get("/sorteduser",(req,res)=>{
 
users.sort((user1,user2)=>{
    if (user2.name > user1.name){
        return -1;
    }else if(user2.name < user1.name){
        return 1;
    }else{
        return 0;
    }
})
res.json({massage:"sorteduser",users})
})

// delete user 
app.delete("/",(req,res)=>{
     const usersLength =users.length;
    users = users.filter((user) => user.id !== req.body.id);
    console.log(users)
      if (users.length === usersLength) {
            res.send("the user not exict");
        } else {
            
            res.json({massage:"user-deleted",users});
        }
            
})

// search user bt ID
app.post("/searchonuser",(req,res)=>{
    const search = users.find((user) => user.id === req.body.id);

    if (search) {
      users.forEach((user) => {
        if (req.body.id == user.id) {
          res.json({massage:"user is",user});
        }
      });
    } else {
      res.send("User not found");
    }
})

// posts
// GET All posts
app.get("/posts",(req,res)=>{
    res.json(posts);
})

// addpost 

app.post("/addpost", (req, res) => {
  console.log(req.body);
  posts.push(req.body);
  res.json({ massage: "addpost", posts });
});

// update posts
app.patch("/updatepost",(req,res)=>{
    const postToUpdate = posts.find((post) => post.id === req.body.id);
        if (postToUpdate) {
          postToUpdate.name = req.body.name;
          postToUpdate.age = req.body.age;
           res.json({ massage: "update", posts});
        }else{
            res.json({massage:"post not found"});
        }
});

// GET all posts sorted by name
app.get("/sortedpost",(req,res)=>{
 
posts.sort((post1,post2)=>{
    if (post2.id > post1.id){
        return -1;
    }else if (post2.id < post1.id) {
      return 1;
    } else {
      return 0;
    }
})
res.json({massage:"sortedpost",posts})
})

// delete post
app.delete("/delpost",(req,res)=>{
     const postsLength =posts.length;
    posts = posts.filter((post) => post.id !== req.body.id);
      if (posts.length === postsLength) {
        res.send("the post not exict");
      } else {
        res.json({ massage: "post-deleted", posts });
      }
            
})

// search post by ID
app.post("/searchonpost",(req,res)=>{
    const search = posts.find((post) => post.id === req.body.id);

    if (search) {
      posts.forEach((post) => {
        if (req.body.id == post.id) {
          res.json({massage:"post is",post});
        }
      });
    } else {
      res.send("post not found");
    }
})


app.listen(4000);
