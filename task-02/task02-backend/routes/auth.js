const express = require('express');
const router =  express.Router();

const {signup, login, getProfile}= require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
