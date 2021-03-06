const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 30,
  duration: 60,
});

/**
 * Use for most requests
 */
const rateLimit = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip, 1);
    next();
  } catch (err) {
    return res.status(429).send("Too many requests");
  }
};

module.exports = {
  rateLimit,
};
