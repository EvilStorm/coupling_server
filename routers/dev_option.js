const express = require('express');
const router = express.Router();
const response = require('../components/response_util');

const noneChangeSample = require('../dump/none_change_sapmle');

router.get('/', function(req, res) {
    res.json(response.success({ok:ok}));
})

router.get('/dump/noneChange', async function(req, res) {
    await noneChangeSample.insertDumpData();
    res.json(response.success({result: "OK"}));

})


module.exports = router;

