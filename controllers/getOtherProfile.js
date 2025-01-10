const User = require('../models/User');

const getOtherUser = async (req, res) => {
    console.log("getOtherUser running");
    const username = req.params.username;
    try {
        const otherUser = await User.findOne({ username: username });
        if (!otherUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(otherUser); // Ensure you use .json() here
    } catch (error) {
        console.error('Failed to retrieve user:', error);
        res.status(500).json({ message: "Error retrieving user" });
    }
}

module.exports = getOtherUser;

