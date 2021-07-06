const express = require("express");
const pino = require("pino-http");
const config = require("config");

const rateLimit = require("./middlewares/rateLimit");
const validate = require("./middlewares/validate");

// Express setup
const app = express();
const logger = pino();
app.use(express.json());
app.use(logger);
const port = process.env.PORT || 8080;

/**
 * Standardized headers for all requests
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Howdy!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
