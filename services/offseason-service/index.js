const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4010;

app.get("/", (req, res) => {
  res.json({
    service: "offseason-service",
    module: "wordle",
    status: "ok",
    endpoints: ["/health"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    service: "offseason-service",
    module: "wordle",
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`offseason-service listening on port ${PORT}`);
});
