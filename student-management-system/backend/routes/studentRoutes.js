const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/students', controller.getStudents);
router.get('/students/:id', controller.getStudent);
router.post('/students', upload.single('photo'), controller.createStudent);
router.put('/students/:id', controller.updateStudent);
router.delete('/students/:id', controller.deleteStudent);

module.exports = router;
