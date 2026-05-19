const express = require('express');
const dentistController = require('../controllers/dentist.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, dentistController.listDentists);
router.get('/:id', authMiddleware, dentistController.getDentistById);
router.post('/', authMiddleware, dentistController.createDentist);
router.put('/:id', authMiddleware, dentistController.updateDentist);
router.delete('/:id', authMiddleware, dentistController.deleteDentist);

module.exports = router;