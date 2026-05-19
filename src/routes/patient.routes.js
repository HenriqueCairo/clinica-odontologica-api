const express = require('express');
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, patientController.listPatients);
router.get('/:id', authMiddleware, patientController.getPatientById);
router.post('/', authMiddleware, patientController.createPatient);
router.put('/:id', authMiddleware, patientController.updatePatient);
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;