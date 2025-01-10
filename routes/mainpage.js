const express = require('express');
const router = express.Router();
const path = require('path');
const { getUsers, postLikeDislike } = require('../controllers/matchMaker');

/*router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})*/

router.get('^/$|/dashboard(.html)?', getUsers);
//router.get('/index/search', getUsers);

router.put('^/$|/dashboard(.html)?', postLikeDislike);

module.exports = router;
