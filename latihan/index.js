//Excercise #5

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const {users} = require("./users");

const app = express();


// Middleware
app.use(morgan("dev")); // Logging requests
app.use(express.json()); // Body parser
app.use(cors({ origin: "http://127.0.0.1:5500" })); // CORS handling
app.use(express.static("public")); // Static file access

// Tampilkan semua user
app.get("/users", (req, res) => {
  res.json(users);
});

// Tampilkan user berdasarkan nama 
app.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  res.json(user);
});

// Tambah user baru
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Masukkan data yang akan diubah" });
  }

  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Edit user berdasarkan nama
app.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const { newName } = req.body;
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  if (!newName) {
    return res.status(400).json({ message: "Masukkan data yang akan diubah" });
  }

  user.name = newName;
  res.json(user);
});

// Hapus user berdasarkan nama
app.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const index = users.findIndex((u) => u.name.toLowerCase() === name);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  users.splice(index, 1);
  res.json({ message: "User berhasil dihapus" });
});

// unduh file dari folder assets
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "assets/sample.png");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File tidak ditemukan" });
  }
  res.download(filePath);
});

// unggah file ke folder public
const multer = require("multer");
const upload = multer({ dest: "public/" });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File upload gagal" });
  }
  res.json({ message: "File berhasil diunggah", file: req.file.filename });
});

//  404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});