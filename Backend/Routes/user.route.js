// External Module
const express = require("express");
// Internal Module
const {
  userRegister,
  userLogin,
  updateUserLocation,
  updateSpecificUserLocation,
  updateUserWorkLocation,
  getWorkLocation,
  subscribeForNotifications,
  getSubscription,
  updateAllDocuments,
} = require("../Controllers/user.controller.js");
const verifyLoginMiddleware = require("../Middlewares/verifyLogin.middleware.js");

// Router Init
const userRoute = express.Router();

// User Register
userRoute.post("/register", userRegister("customer"));

// User Login
userRoute.post("/login", userLogin("customer"));

// updateUserLocation
userRoute.post("/update-location", verifyLoginMiddleware, updateUserLocation());

// Update Work Location
userRoute.post(
  "/update-work-location",
  verifyLoginMiddleware,
  updateUserWorkLocation()
);

// Get Work Location
userRoute.get("/work-location", verifyLoginMiddleware, getWorkLocation());

// GetSubscription
userRoute.get("/get-subscription", verifyLoginMiddleware, getSubscription());

// subscribeForNotifications
userRoute.post(
  "/subscribe-for-notifications",
  verifyLoginMiddleware,
  subscribeForNotifications()
);

// update specific user location
userRoute.post("/update-specific-user-location", updateSpecificUserLocation());

// Update All Documents for subscription
userRoute.get("/update-all-documents", updateAllDocuments());

module.exports = userRoute;
