const Event = require("../models/Event");

const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user._id,
      participants: [req.user._id],
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.category) query.category = req.query.category;
    if (req.query.status) query.status = req.query.status;

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(total / limit),
      total,
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

    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (
      event.organizer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("You are not allowed to update this event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("organizer", "name email");

    res.status(200).json({ success: true, event: updatedEvent });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (
      event.organizer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("You are not allowed to delete this event");
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const joinEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    const alreadyJoined = event.participants.some(
      (participantId) => participantId.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      res.status(400);
      throw new Error("You have already joined this event");
    }

    if (event.participants.length >= event.maxParticipants) {
      res.status(400);
      throw new Error("Event has reached maximum participants");
    }

    event.participants.push(req.user._id);
    await event.save();

    res.status(200).json({
      success: true,
      message: "Joined event successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
};

const leaveEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    event.participants = event.participants.filter(
      (participantId) => participantId.toString() !== req.user._id.toString()
    );

    await event.save();

    res.status(200).json({
      success: true,
      message: "Left event successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
};

const getEventParticipants = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "participants",
      "name email"
    );

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json({
      success: true,
      count: event.participants.length,
      participants: event.participants,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getEventParticipants,
};