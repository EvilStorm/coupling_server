const express = require('express');
const router = express.Router();
const response = require('../components/response_util');


router.get('/', function(req, res) {
    res.json(response.success(_));

})

module.exports = router;

