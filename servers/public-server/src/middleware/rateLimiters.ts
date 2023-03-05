import { rateLimit } from "express-rate-limit";

export const rateLimiterAuth = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 minute
  max: 25, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many attempts please try again after some time",
});
