const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ActiveUnity API",
      version: "1.0.0",
      description:
        "REST API for ActiveUnity — a web-oriented system for information support and coordination of social and volunteer initiatives.",
    },
    servers: [
      {
        url: "http://localhost:5050/api/v1",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication and current user endpoints",
      },
      {
        name: "Users",
        description: "User profile management endpoints",
      },
      {
        name: "Events",
        description: "Event and initiative management endpoints",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Nadiia",
            },
            email: {
              type: "string",
              format: "email",
              example: "nadiia@test.com",
            },
            password: {
              type: "string",
              example: "12345678",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "nadiia@test.com",
            },
            password: {
              type: "string",
              example: "12345678",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "665f1f1a8a7c9a001234abcd",
            },
            name: {
              type: "string",
              example: "Nadiia",
            },
            email: {
              type: "string",
              example: "nadiia@test.com",
            },
            role: {
              type: "string",
              enum: ["user", "organizer", "admin"],
              example: "user",
            },
            avatar: {
              type: "string",
              example: "https://example.com/avatar.png",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        Event: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665f2a2b8a7c9a001234abcd",
            },
            title: {
              type: "string",
              example: "Community Cleanup",
            },
            description: {
              type: "string",
              example: "Local community cleanup initiative in Oslo.",
            },
            category: {
              type: "string",
              enum: [
                "volunteering",
                "education",
                "environment",
                "charity",
                "community",
                "health",
                "culture",
                "other",
              ],
              example: "environment",
            },
            location: {
              type: "string",
              example: "Oslo",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-01-15T12:00:00.000Z",
            },
            maxParticipants: {
              type: "number",
              example: 30,
            },
            organizer: {
              type: "string",
              example: "665f1f1a8a7c9a001234abcd",
            },
            participants: {
              type: "array",
              items: {
                type: "string",
              },
            },
            image: {
              type: "string",
              example: "https://example.com/event-image.jpg",
            },
            status: {
              type: "string",
              enum: ["upcoming", "completed", "cancelled"],
              example: "upcoming",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateEventRequest: {
          type: "object",
          required: ["title", "description", "location", "date"],
          properties: {
            title: {
              type: "string",
              example: "Community Cleanup",
            },
            description: {
              type: "string",
              example: "Local community cleanup initiative in Oslo.",
            },
            category: {
              type: "string",
              enum: [
                "volunteering",
                "education",
                "environment",
                "charity",
                "community",
                "health",
                "culture",
                "other",
              ],
              example: "environment",
            },
            location: {
              type: "string",
              example: "Oslo",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-01-15T12:00:00.000Z",
            },
            maxParticipants: {
              type: "number",
              example: 30,
            },
            image: {
              type: "string",
              example: "https://example.com/event-image.jpg",
            },
          },
        },
        UpdateEventRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Updated Community Cleanup",
            },
            description: {
              type: "string",
              example: "Updated description for the initiative.",
            },
            category: {
              type: "string",
              enum: [
                "volunteering",
                "education",
                "environment",
                "charity",
                "community",
                "health",
                "culture",
                "other",
              ],
              example: "community",
            },
            location: {
              type: "string",
              example: "Molde",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-02-20T10:00:00.000Z",
            },
            maxParticipants: {
              type: "number",
              example: 50,
            },
            image: {
              type: "string",
              example: "https://example.com/updated-image.jpg",
            },
            status: {
              type: "string",
              enum: ["upcoming", "completed", "cancelled"],
              example: "upcoming",
            },
          },
        },
        UpdateProfileRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Nadiia Balitska",
            },
            avatar: {
              type: "string",
              example: "https://example.com/avatar.png",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./src/docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;