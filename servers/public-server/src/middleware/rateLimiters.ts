import { rateLimit } from "express-rate-limit";

export const rateLimiterUserUpdate= rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24hrs
  max: 25, // Limit each IP to 25 requests per `window` (here, per 5 minutes)
  message: "Too many attempts please try again after some time",
});

export const rateLimiterAuth = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 5 minutes)
  message: "Too many attempts please try again after some time",
});

export const rateLimiterForAddProduct = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 15, // Limit each IP to 15 requests per `window` (here, per 60 minutes)
  message: "You can request only 15 products to add in 60 minutes of timeframe",
});

export const rateLimiterForUserDetails = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 150, // Limit each IP to 150 requests per `window` (here, per 60 minutes)
  message: "You can request only 150 times.Please try again later.",
});
