const express = require("express");
const devpun = require("devpun");
const app = express();
const port = process.env.port || 3000;

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "<deployed URL>"],
//   })
// );

const jokesDB = require("devpun/jokes.json");

app.get("/random", (req, res) => {
  const randomJokes = devpun.random();
  res.json(randomJokes);
});

app.get("/by-category", (req, res) => {
  const JokeCategory = req.query.name;
  if (!JokeCategory) {
    res.sendStatus(400);
    res.sendStatus("request => /by-category?name=<category-name>");
  }
  const JokesByCategory = devpun.list(JokeCategory);
  res.json(JokesByCategory);
  console.log(JokesByCategory);
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.text;
  if (!searchTerm) {
    res.sendStatus(400);
    res.sendStatus("request => /search?text=<search-term>");
  }
  const searchJokes = devpun
    .list()
    .filter((joke) =>
      joke.toLocaleUpperCase().includes(searchTerm.toLocaleLowerCase())
    );
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
