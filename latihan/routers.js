const express = require("express");
const routers = express.Router();
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const upload = multer({dest: 'public'})
const client = require("./mongodb")
const ObjectId = require("mongodb").ObjectId



//get single user
routers.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan")
    const user = await db.collection("users").findOne({_id: new ObjectId (req.params.id)})
    res.status(200).json({
      status: "success",
      message: "single user",
      data: user
    })
  } catch (error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }
})

//insert user
routers.post("/users", async (req, res) => {
  try {
    const db = client.db("latihan")
    const user = await db.collection("users").insertOne(req.body)
    res.status(200).json({
      status: "success",
      message: "add user",
      data: user
    })
  } catch (error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }
})

//update user
routers.put("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan")
    const user = await db.collection("users").updateOne({_id: new ObjectId (req.params.id)}, {$set: req.body})
    res.status(200).json({
      status: "success",
      message: "update user",
      data: user
    })
  } catch (error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }
})
//delete user
routers.delete("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan")
    const user = await db.collection("users").deleteOne({_id: new ObjectId (req.params.id)})
    res.status(200).json({
      status: "success",
      message: "delete user",
      data: user
    })
  } catch (error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }
})

//get order user (join/aggregate)
routers.get("/users/:id/orders", async (req, res) => {
  try {
    const db = client.db("latihan")
    const user = await db.collection("users").aggregate([
      {
        $match: {_id: new ObjectId (req.params.id)}
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user_id",
          as: "orders"
        }
      }
    ]).toArray()
    res.status(200).json({
      status: "success",
      message: "user orders",
      data: user
    })
  } catch (error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }
})


routers.get("/users", async (req, res) => {
  try{
    const db = client.db("latihan")
    const users = await db.collection("users").find().toArray()
    res.json({
      status: "success",
      message: "list users",
      data: users
    })
  } catch (error){

  }
})
routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file
  if (file){
    const target = path.join(__dirname, "public", file.originalname)
    fs.renameSync(file.path, target)
    res.send("File berhasil diupload")
  }
  else{
    res.send("File gagal diupload")
  }
})

routers.get("/download", (req, res) => {
  const filename = "/th.jpg"
  res.download(path.join(__dirname , filename), "th.jpg")
  // res.sendFile(path.join(__dirname , filename), {
  //   headers: {
  //     "Content-Disposition": 'attachment; filename="th.jpg"'
  //   }
  // })
})
// Routing
routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login page",
    data: {
      username: username,
      password: password,
    },
  });
});
routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);


routers.put("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);
// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;