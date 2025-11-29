const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running to test Docker 29 Nov, 25!");
});

app.listen(5001, () => {
  console.log("Server running on port 5001!");
});
