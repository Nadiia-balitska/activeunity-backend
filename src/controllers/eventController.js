const Event = require("../models/Event");

const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      date,
      maxParticipants,
      image,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      location,
      date,
      maxParticipants,
      image,
      organizer: req.user._id,
      participants: [req.user._id],
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email")
      .populate("participants", "name email");

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};