const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Allow only your website to access
const allowedOrigins = ["https://youranimewebsite.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Secure Anime Data
const animeData = [
  {
    id: 1,
    title: "Attack on Titan",
    cover: "https://yourcdn.com/aot.jpg",
    genre: "Action",
    duration: 24,
    video: "https://yourbackend.com/secure/video1",
  },
];

// Fetch anime list (without video URL)
app.get("/anime", (req, res) => {
  const filteredData = animeData.map(({ video, ...anime }) => anime);
  res.json(filteredData);
});

// Fetch video securely
app.get("/anime/:id/video", (req, res) => {
  const anime = animeData.find((a) => a.id == req.params.id);
  if (!anime) return res.status(404).json({ error: "Anime not found" });

  // Later: Generate expiring links
  res.json({ video: anime.video });
});

// Start server
app.get("/", (req, res) => {
  res.send("Anime API is running securely!");
});

module.exports = app;
