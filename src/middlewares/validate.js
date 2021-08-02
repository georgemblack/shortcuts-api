const messages = require("./messages");

function validateShoeboxEntry(req, res, next) {
  const body = req.body;
  if (!body) {
    return res.status(400).send({ message: messages.sadResponseMessage() });
  }

  /**
   * Check geopoint (required attribute)
   */
  if (!("geopoint" in body)) {
    return res.status(400).send({ message: messages.sadResponseMessage() });
  }

  const geopoint = body.geopoint;
  if (!("latitude" in geopoint && "longitude" in geopoint)) {
    return res.status(400).send({ message: messages.sadResponseMessage() });
  }

  if (!(Number(geopoint.latitude) && Number(geopoint.longitude))) {
    return res.status(400).send({ message: messages.sadResponseMessage() });
  }

  /**
   * Check for text-based note
   */
  if ("text" in body) {
    const text = body.text;

    if (!text || typeof text !== "string") {
      return res.status(400).send({ message: messages.sadResponseMessage() });
    }
  }

  next();
}

module.exports = {
  validateShoeboxEntry,
};
