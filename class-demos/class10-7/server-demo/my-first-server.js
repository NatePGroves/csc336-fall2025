// 4 types of HTTP Requests to a server (CRUD):
// GET: reading information from a server
// POST: creating data to a server
// PUT: updating data
// DELETE: deleting data
// Create
// Read
// Update
// Delete

import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, (req, res) => {
    console.log("Server started!");
});

let count = 0;
app.get("/test", (req, res) =>{
    console.log("Someone made a request with a 'test' endpoint");
    count++;
    res.send('Hi there! This is the server speaking!' + count);
});