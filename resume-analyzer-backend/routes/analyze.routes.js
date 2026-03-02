const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyze } = require('../controllers/analyze.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('resume'), analyze);

module.exports = router;
