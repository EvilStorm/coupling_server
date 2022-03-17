const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Account, User, Setting, Competition} = require('../models');
const {getUserInfoByPk} = require('./functions/user_info');

router.get('/me', auth.isSignIn, async function (req, res, next) {
    try {
        const result = await getUserInfoByPk(req.decoded.id);
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get('/all/me', auth.isSignIn, async function (req, res, next) {
    try {
        const result = await User.findOne({
            where: {id: req.decoded.id},
            include: [{
                model: Setting,
                attributes: ['nearByAlarm', 'categoryAlarm', 'matchCoupleAlarm']
            }, {
                model: Competition,
            }], 
        });
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get('/id/:id', async function (req, res, next) {
    try {
        const result = await User.findByPk(7);
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.patch('/', auth.isSignIn, async function (req, res, next) {
    try {
        const result = await User.update(
            req.body,
            {
                where: {
                    id: req.decoded.id
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

router.patch('/me', auth.isSignIn, async function (req, res, next) {
    try {
        const result = await User.update(
            req.body,
            {
                where: {
                    id: req.decoded.id
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