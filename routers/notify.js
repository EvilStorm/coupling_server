const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Notify} = require('../models');

router.get('/', async function (req, res, next) {
    try {
        const result = await Notify.findAll();
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.post('/', async function (req, res, next) {
    try {
        const result = await Notify.create(req.body);
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});



router.patch('/', async function (req, res, next) {
    try {
        const result = await Notify.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }   
            }
        )
        if(result[0] == 1) {
            res.json(response.success({result: 1, message: "변경되었습니다."}));
        } else {
            return res.status(400).json(response.fail(createException(ExceptionType.QUERY_FAIL)));        
        }
        
    } catch (e) {
        console.log(e);
        next(e);
    }
});




module.exports = router;

