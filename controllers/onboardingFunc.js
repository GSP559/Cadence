const User = require('./../models/User');
const loginUser = require('./loginUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const finishSignup = async (req, res) => {
    console.log("Executing finishSignup");

    try {
        const token = req.cookies.token;
        const verified_token = jwt.verify(token, process.env.SECRET_STR);
        const { username } = verified_token;
        const { firstname, topGenre, sex, sexualPreference, age, location, aboutMe } = req.body;
        console.log("Received data for user:", username);

        const profilePics = req.files ? req.files.map(file => file.path) : [];

        const update = { firstname, topGenre, sex, sexualPreference, age, location, profilePics, aboutMe };
        console.log("Update data:", update);  // Log update data
        const findUser = await User.findOneAndUpdate(
            { username },
            { $set: update },
            { new: true }
        );

        if (findUser) {
            res.status(200).json({ message: "User data successfully updated", user: findUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { finishSignup };
