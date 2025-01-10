const express = require('express');
const router = express.Router();
const path = require('path');
const { uploadPhotos } = require('../controllers/imageUpload');
const { finishSignup } = require('./../controllers/onboardingFunc');

router.get('^/$|/onboarding(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'onboarding.html'));
})

router.put('^/$|/onboarding(.html)?', uploadPhotos, finishSignup);

module.exports = router;
