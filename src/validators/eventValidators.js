const { body } = require("express-validator");

const EVENT_CATEGORIES = require("../constants/eventCategories");

const createEventValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Description must not exceed 2000 characters"),

  body("category")
    .optional()
    .isIn(EVENT_CATEGORIES)
    .withMessage("Invalid event category"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),

  body("maxParticipants")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max participants must be at least 1"),
];

const updateEventValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description must not exceed 2000 characters"),

  body("category")
    .optional()
    .isIn(EVENT_CATEGORIES)
    .withMessage("Invalid event category"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),

  body("maxParticipants")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max participants must be at least 1"),
];

module.exports = {
  createEventValidator,
  updateEventValidator,
};