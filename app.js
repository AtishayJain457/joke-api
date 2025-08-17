const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory jokes database
let jokes = [
  { id: 1, type: "general", text: "Why don’t scientists trust atoms? Because they make up everything!" },
  { id: 2, type: "programming", text: "Why do programmers prefer dark mode? Because light attracts bugs!" },
  { id: 3, type: "dad", text: "I only know 25 letters of the alphabet. I don’t know y." },
  { id: 1, category: "programming", joke: "Why do programmers prefer dark mode? Because light attracts bugs!" },
  { id: 2, category: "general", joke: "Why don’t skeletons fight each other? They don’t have the guts." },
  { id: 3, category: "dad", joke: "I only know 25 letters of the alphabet. I don’t know y." }
];

// ✅ GET all jokes
app.get("/jokes", (req, res) => {
  res.json(jokes);
});

// ✅ POST new joke
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    type: req.body.type,
    text: req.body.text,
  };
  jokes.push(newJoke);
  res.status(201).json(newJoke);
});

// ✅ PUT (update joke by ID)
app.put("/jokes/:id", (req, res) => {
  const jokeId = parseInt(req.params.id);
  const joke = jokes.find(j => j.id === jokeId);

  if (!joke) {
    return res.status(404).json({ message: "Joke not found" });
  }

  // Update fields if provided
  if (req.body.type) joke.type = req.body.type;
  if (req.body.text) joke.text = req.body.text;

  res.json(joke);
});

// ✅ DELETE (remove joke by ID)
app.delete("/jokes/:id", (req, res) => {
  const jokeId = parseInt(req.params.id);
  const index = jokes.findIndex(j => j.id === jokeId);

  if (index === -1) {
    return res.status(404).json({ message: "Joke not found" });
  }

  jokes.splice(index, 1); // remove joke
  res.json({ message: `Joke with id ${jokeId} deleted successfully` });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
