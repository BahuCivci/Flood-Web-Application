// External Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
// Internal Import
const userModel = require("../Models/user.js");
const sendMail = require("../Utils/sendMail.js");

// User Register
const userRegister = (userType) => {
  return async (req, res) => {
    const email = req.body.email.toLowerCase();
    console.log(email);
    try {
      // Check if user already exist just for email
      const existUser = await userModel.findOne({
        email,
      });
      if (!existUser) {
        const hashedPass = await bcrypt.hash(req.body.password, 5);
        const newUser = await userModel({
          ...req.body,
          email,
          password: hashedPass,
        });
        await newUser.save();
        sendMail(req.body.name, req.body.email, "signup");
        const token = jwt.sign(
          {
            name: newUser.name,
            email: newUser.email,
            userID: newUser._id,
          },
          process.env.JWT_TOKEN
        );
        res.status(200).json({
          token: token,
          msg: "Succesfully Registered and Logged In",
        });
      } else {
        res.status(409).json({
          msg: "Already Registered. Please Log in",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Server Error",
        err: err,
      });
    }
  };
};

// User Login
const userLogin = (userType) => {
  return async (req, res) => {
    const email = req.body.email.toLowerCase();
    // console.log(req.bsody)
    try {
      const existUser = await userModel.findOne({
        email,
      });
      if (existUser) {
        const isValidPass = await bcrypt.compare(
          req.body.password,
          existUser.password
        );
        if (isValidPass) {
          const token = jwt.sign(
            {
              name: existUser.name,
              email: existUser.email,
              userID: existUser._id,
            },
            process.env.JWT_TOKEN
          );
          res.status(200).json({
            token: token,
            msg: "Succesfully Logged In",
          });
        } else {
          res.status(401).json({
            msg: "Invalid Email or Password",
          });
        }
      } else {
        res.status(400).json({
          msg: "User Not Found",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Update Specific User Location
const updateSpecificUserLocation = (userType) => {
  return async (req, res) => {
    const userID = req.body.userID;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          location: {
            type: "Point",
            coordinates: ["51.379146", "-1.185549"],
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        msg: "Succesfully Updated",
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Server Error",
        err: err,
      });
    }
  };
};

// Update user Location
const updateUserLocation = (userType) => {
  return async (req, res) => {
    const userID = req.userID;
    const location = req.body.location;
    try {
      await userModel.findByIdAndUpdate(
        userID,
        {
          location: {
            type: "Point",
            coordinates: [location.latitude, location.longitude],
            // coordinates: [location.lat, location.lng],
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        msg: "Location Updated",
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Update user WorkLocation
const updateUserWorkLocation = (userType) => {
  return async (req, res) => {
    const userID = req.userID;
    const workLocation = req.body.workLocation;
    try {
      await userModel.findByIdAndUpdate(
        userID,
        {
          workLocation: workLocation,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        msg: "Work Location Updated",
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Get work location
const getWorkLocation = (userType) => {
  return async (req, res) => {
    const userID = req.userID;
    try {
      const user = await userModel.findById(userID);
      res.status(200).json({
        msg: "Work Location",
        workLocation: user.workLocation,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Get Subscription
const getSubscription = (userType) => {
  return async (req, res) => {
    const userID = req.userID;
    try {
      const user = await userModel.findById(userID);
      res.status(200).json({
        msg: "Subscription",
        subscription: user.subscription,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Subscribe for Notifications
const subscribeForNotifications = (userType) => {
  return async (req, res) => {
    const userID = req.userID;
    const subscription = req.body.subscription;
    console.log(subscription);
    try {
      const user = await userModel.findByIdAndUpdate(
        userID,
        {
          subscription: subscription,
        },
        {
          new: true,
        }
      );
      if (user.subscription) {
        res.status(200).json({
          msg: "Successfully Subscribed",
          subscription: user.subscription,
        });
      } else {
        res.status(200).json({
          msg: "Successfully unsubscribed",
          subscription: user.subscription,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// Update all documents of a user
const updateAllDocuments = (userType) => {
  return async (req, res) => {
    try {
      await userModel.updateMany(
        {},
        {
          $set: {
            subscription: false,
          },
        }
      );
      res.status(200).json({
        msg: "Successfully Updated",
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

module.exports = {
  userRegister,
  userLogin,
  updateUserLocation,
  updateSpecificUserLocation,
  updateUserWorkLocation,
  getWorkLocation,
  subscribeForNotifications,
  getSubscription,
  updateAllDocuments,
};
