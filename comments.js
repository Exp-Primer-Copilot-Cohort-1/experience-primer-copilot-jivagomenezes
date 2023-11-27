// Create web server

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

// Create a new express application
const app = express();
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  // req.body is a JSON object that will be sent by the client
  const { content } = req.body;
  // Get the comments array for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment
  comments.push({ id: commentId, content });
  // Update the comments array
  commentsByPostId[req.params.id] = comments;

  // Send back the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log("Listening on 4001");
});
