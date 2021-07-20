const express = require("express");
const pino = require("pino-http");
const config = require("config");

const rateLimit = require("./middlewares/rateLimit");
const validate = require("./middlewares/validate");
const shoebox = require("./services/shoebox");

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

app.post(
  "/shoebox/entries",
  rateLimit.rateLimit,
  validate.validateShoeboxEntry,
  async (req, res) => {
    const body = req.body;

    const entry = {
      content: [
        {
          type: "geopoint",
          geopoint: {
            latitude: body.geopoint.latitude,
            longitude: body.geopoint.longitude,
          },
        },
      ],
    };

    try {
      await shoebox.postEntry(entry);
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal error");
    }
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));
