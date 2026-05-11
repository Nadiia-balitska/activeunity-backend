const User = require("../models/User");
const Event = require("../models/Event");
const asyncHandler = require("../utils/asyncHandler");


const getUserProfile = asyncHandler(async (req, res) => {
    const createdEvents = await Event.find({ organizer: req.user._id }).sort({
      createdAt: -1,
    });

    const joinedEvents = await Event.find({
      participants: req.user._id,
    })
      .populate("organizer", "name email")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        createdAt: req.user.createdAt,
      },
      createdEvents,
      joinedEvents,
    });
  
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const allowedFields = ["name", "avatar"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    });

    const updatedUser = await req.user.save();

    res.status(200).json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      },
    });
 
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};