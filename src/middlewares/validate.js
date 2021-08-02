function validateShoeboxEntry(req, res, next) {
  const body = req.body;
  if (!body) {
    return res.status(400).send("Validation failed");
  }

  /**
   * Check geopoint (required attribute)
   */
  if (!("geopoint" in body)) {
    return res.status(400).send("Validation failed");
  }

  const geopoint = body.geopoint;
  if (!("latitude" in geopoint && "longitude" in geopoint)) {
    return res.status(400).send("Validation failed");
  }

  if (!(Number(geopoint.latitude) && Number(geopoint.longitude))) {
    return res.status(400).send("Validation failed");
  }

  /**
   * Check for text-based note
   */
  if ("text" in body) {
    const text = body.text;

    if (!text || typeof text !== "string") {
      return res.status(400).send("Validation failed");
    }
  }

  next();
}

module.exports = {
  validateShoeboxEntry,
};
