/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Returns a paginated list of events. Supports search, category and status filtering.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title, description or location
 *         example: Oslo
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [volunteering, education, environment, charity, community, health, culture, other]
 *         description: Filter events by category
 *         example: environment
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [upcoming, completed, cancelled]
 *         description: Filter events by status
 *         example: upcoming
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 3
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new social or volunteer initiative. Requires authentication.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Returns full information about a selected event, including organizer and participants.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update event
 *     description: Updates event data. Only the event organizer or admin can update the event.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete event
 *     description: Deletes an event. Only the event organizer or admin can delete it.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/{id}/join:
 *   post:
 *     summary: Join an event
 *     description: Adds the authenticated user to the event participants list.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Joined event successfully
 *       400:
 *         description: User already joined or event is full
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/{id}/leave:
 *   delete:
 *     summary: Leave an event
 *     description: Removes the authenticated user from the event participants list.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Left event successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/{id}/participants:
 *   get:
 *     summary: Get event participants
 *     description: Returns a list of users who joined the selected event.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Participants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 participants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Event not found
 */