const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getEventParticipants,
} = require("../controllers/eventController");

const { protect } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");

const {
  createEventValidator,
  updateEventValidator,
} = require("../validators/eventValidators");

const router = express.Router();

router
  .route("/")
  .get(getAllEvents)
  .post(protect, createEventValidator, validateRequest, createEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(protect, updateEventValidator, validateRequest, updateEvent)
  .delete(protect, deleteEvent);

router.post("/:id/join", protect, joinEvent);
router.delete("/:id/leave", protect, leaveEvent);
router.get("/:id/participants", getEventParticipants);

module.exports = router;