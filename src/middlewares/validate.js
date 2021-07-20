function validateShoeboxEntry(req, res, next) {
  const body = req.body;
  if (!body) {
    return res.status(400).send("Validation failed");
  }

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

  next();
}

module.exports = {
  validateShoeboxEntry,
};
