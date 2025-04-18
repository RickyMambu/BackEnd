const express = require("express");
const routers = express.Router();
const path = require("path")
const fs = require("fs")
const multer = require("multer")
const upload = multer({dest: 'public'})
const client = require("./mongodb")


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