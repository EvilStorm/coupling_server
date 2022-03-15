const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Partner, User} = require('../models');

router.get('/', async function (req, res, next) {
    try {
        const result = await Partner.findAll();
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.post('/', auth.isSignIn, async function (req, res, next) {
    
    try {
        const result = await Partner.create(req.body);

        const user = await User.findOne({id: req.decoded.id});

        console.log(user);
        
        await user.appPartner(result)

        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/challenge', auth.isSignIn, async function (req, res, next) {
    
    try {
        const partner = await Partner.findOne({id: req.body.id})
        if(partner.opponentId != null) {
            res.json(response.success({result: 0, message: "신청자가 있습니다."}));
            return;
        } else {
            const result = await Partner.update(
                {
                    opponentId: req.decoded.id
                }, 
                {
                    where: {
                        id: req.body.id
                    }
                }
            );

            if(result[0] == 1) {
                res.json(response.success({result: 1, message: "변경되었습니다."}));
            } else {
                return res.status(400).json(response.fail(createException(ExceptionType.QUERY_FAIL)));        
            }            
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.patch('/', async function (req, res, next) {
    try {
        const result = await Partner.update(
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

