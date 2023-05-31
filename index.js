const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({
    successful: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
