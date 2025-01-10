const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

// Configure the storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Initialize multer with the specified storage configuration
const upload = multer({ storage: storage }).array('avatars', 3);

exports.uploadPhotos = (req, res, next) => {
    upload(req, res, async (err) => {
        console.log("uploadPhotos called");  

        if (err) {
            console.error("Upload error:", err.message);
            return res.status(500).send({ error: err.message });
        }

        if (!req.files || req.files.length === 0) {
            console.log("No files uploaded");
            return res.status(400).send('No files uploaded');
        }

        try {
            const verified_jwt = jwt.verify(req.cookies.token, process.env.SECRET_STR);
            console.log("JWT verified");
            if (!verified_jwt) {
                console.log("JWT verification failed");
                return res.redirect('/login');
            }

            const { username } = verified_jwt;
            const user = await User.findOne({ username });
            if (!user) {
                console.log("User not found");
                return res.status(404).send('User not found');
            }

            user.profilePic = req.files.map(file => file.path);
            await user.save();
            console.log("User updated with files, calling next");
            next();  // Critical to call to continue to finishSignup
        } catch (error) {
            console.error("Caught error in uploadPhotos:", error);
            res.status(500).send({ error: 'Error from image upload' });
        }
    });
};
