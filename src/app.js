const express = require("express");
const pino = require("pino-http");
const config = require("config");
const basicAuth = require("express-basic-auth");

const rateLimit = require("./middlewares/rateLimit");
const validate = require("./middlewares/validate");
const messages = require("./messages");
const shoebox = require("./services/shoebox");

const USERNAME = process.env.USERNAME || "test";
const PASSWORD = process.env.PASSWORD || "abc123";

// Auth setup
auth = basicAuth({
  users: {
    [USERNAME]: PASSWORD,
  },
});

// Express setup
const app = express();
const logger = pino();
app.use(auth);
app.use(express.json());
app.use(logger);
app.disable("x-powered-by");
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
      return res.status(200).send({ message: messages.happyResponseMessage() });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: messages.sadResponseMessage() });
    }
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));
