const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getAllEvents)
  .post(protect, createEvent);

router.route("/:id")
  .get(getEventById);

module.exports = router;