function validateShoeboxEntry(req, res, next) {
  next();
  const body = req.body;
  if (!body) {
    return res.status(400).send("Validation failed");
  }

  if (!("geopoint" in body)) {
    console.log("no geopoint");
    return res.status(400).send("Validation failed");
  }

  const geopoint = body.geopoint;
  if (!("latitude" in geopoint && "longitude" in geopoint)) {
    console.log("no lat/lon");
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
