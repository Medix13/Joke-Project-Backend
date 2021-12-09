const express = require("express");
const devpun = require("devpun");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://it-joke.netlify.app"],
  })
);

const jokesDB = require("devpun/jokes.json");

app.get("/random", (req, res) => {
  const randomJokes = devpun.random();
  res.json(randomJokes);
});

app.get("/by-category", (req, res) => {
  const JokeCategory = req.query.name;
  if (!JokeCategory) {
    res.sendStatus(400);
  }
  const JokesByCategory = devpun.list(JokeCategory);
  res.json(JokesByCategory);
  console.log(JokesByCategory);
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.text;
  if (!searchTerm) {
    res.sendStatus(400);
  }
  const searchJokes = devpun
    .list()
    .filter((joke) => joke.toLowerCase().includes(searchTerm.toLowerCase()));
  res.json(searchJokes);
});
app.get("/popular", (req, res) => {
  const popularJokes = jokesDB
    .filter((joke) => joke.rating === 1)
    .map((joke) => joke.text);
  res.json(popularJokes);
});

app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);
