const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, appointmentController.listAppointments);

router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

router.post('/', authMiddleware, appointmentController.createAppointment);

router.put('/:id', authMiddleware, appointmentController.updateAppointment);

router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;