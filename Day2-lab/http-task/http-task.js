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
const httpServer = require("http");
const { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW } = require("tls");
const server = httpServer.createServer(function (req, res) {
  if (req.url == "/users" && req.method == "GET") {
    res.end(JSON.stringify(users));
  } else if (req.url == "/adduser" && req.method == "POST") {
    req.on("data", function (chunk) {
      users.push(JSON.parse(chunk));
      res.end(JSON.stringify(users));
    });
  } else if (req.url == "/sorteduser" && req.method == "GET") {
    users.sort((user1, user2) => {
      if (user1.name < user2.name) {
        return -1;
      }
      if (user1.name > user2.name) {
        return 1;
      }
      return 0;
    });
    res.end(JSON.stringify(users));
  } else if (req.url == "/delete" && req.method == "DELETE") {
    req.on("data", function (chunk) {
      const userId = JSON.parse(chunk).id;
      const usersLength = users.length;
      users = users.filter((user) => user.id !== userId);
      if (users.length === usersLength) {
        res.end("the user not exict");
      } else {
        res.end(JSON.stringify(users));
      }
    });
  } else if (
    req.url == "/update" &&
    (req.method == "PUT" || req.method == "PATCH")
  ) {
    req.on("data", function (chunk) {
      const updatedUser = JSON.parse(chunk);
      const userId = updatedUser.id;
      const userToUpdate = users.find((user) => user.id === userId);
      if (userToUpdate) {
        userToUpdate.name = updatedUser.name;
        userToUpdate.age = updatedUser.age;
        res.end(JSON.stringify(users));
      } else {
        res.end("User not found");
      }
    });
  } else if (req.url == "/search" && req.method == "POST") {
    req.on("data", function (chunk) {
      const userId = JSON.parse(chunk).id;
      const search = users.find((user) => user.id === userId);

      if (search) {
        users.forEach((user) => {
          if (userId == user.id) {
            res.end(JSON.stringify(user));
          }
        });
      } else {
        res.end("User not found");
      }
    });
  }
  if (req.url == "/posts" && req.method == "GET") {
    res.end(JSON.stringify(posts));
  } else if (req.url == "/addpost" && req.method == "POST") {
    req.on("data", function (chunk) {
      posts.push(JSON.parse(chunk));
      res.end(JSON.stringify(posts));
    });
  } else if (req.url == "/sortedposts" && req.method == "GET") {
    posts.sort((post1, post2) => {
      if (post1.id > post2.id) {
        return -1;
      }
      if (post1.id < post2.id) {
        return 1;
      }
      return 0;
    });
    res.end(JSON.stringify(posts));
  } else if (req.url == "/delpost" && req.method == "DELETE") {
    req.on("data", function (chunk) {
      const postID = JSON.parse(chunk).id;
      const postsLength = posts.length;
      posts = posts.filter((post) => post.id !== postID);

      if (posts.length === postsLength) {
        res.end("post not exict");
      } else {
        res.end(JSON.stringify(posts));
      }
    });
  } else if (
    req.url == "/updatepost" &&
    (req.method == "PUT" || req.method == "PATCH")
  ) {
    req.on("data", function (chunk) {
      const updatedPost = JSON.parse(chunk);
      const postId = updatedPost.id;
      let postToUpdate = posts.find((post) => post.id === postId);

      if (postToUpdate) {
        postToUpdate.title = updatedPost.title;
        postToUpdate.content = updatedPost.content;
        postToUpdate.author = updatedPost.author;
        res.end(JSON.stringify(posts));
      } else {
        res.end("User not found");
      }
    });
  } else if (req.url == "/searchposts" && req.method == "POST") {
    req.on("data", function (chunk) {
      const postID = JSON.parse(chunk).id;
      const search = posts.find((post) => post.id === postID);

      if (search) {
        posts.forEach((post) => {
          if (postID == post.id) {
            res.end(JSON.stringify(post));
          }
        });
      } else {
        res.end("User not found");
      }
    });
  }
});
server.listen(3000);
