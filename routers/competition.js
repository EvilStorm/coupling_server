const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Competition, User, Creator} = require('../models');
var {Op} = require('sequelize');


router.get('/', async function (req, res, next) {
    try {
        const result = await Competition.findAll({
            include: [{
                model: User,
            }]
        });
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get('/id/:id', async function (req, res, next) {
    try {
        var result = await Competition.findOne(
            {
                where: {
                    id: req.params.id
                },
                include: [{
                    model: User,
                }],
            }
        );

        if(result.dataValues.opponentId != null) {
            const user = await User.findByPk(result.dataValues.opponentId)
            result.dataValues.Oppoent = user;
        }

        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});



router.get('/monthly/:year/:month', async function (req, res, next) {
    const startDate = new Date(req.params.year, req.params.month-1, 1, 0,0,0);
    const endDate = new Date(req.params.year, req.params.month, 0, 23,59, 59);


    try {
        const result = await Competition.findAll({
            where: {
                matchTime: {
                    [Op.between]: [startDate, endDate]
                },
            },
            include: [{
                model: User,
            }]
        });
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});



router.post('/', auth.isSignIn, async function (req, res, next) {
    
    try {
        const competition = await Competition.create(req.body);

        const user = await User.findOne({id: req.decoded.id});
        
        user.addCompetition(competition);

        res.json(response.success(competition));

    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/challenge', auth.isSignIn, async function (req, res, next) {

    try {

        const result = await Competition.update({
            opponentId: req.decoded.id
            }, {
                where: {
                    id: req.body.id
                }
            }
        );

        if(result[0] == 1) {
            res.json(response.success({result: 1, message: "등록되었습니다."}));
        } else {
            return res.status(400).json(response.fail(createException(ExceptionType.QUERY_FAIL)));        
        }

    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.patch('/', auth.isSignIn, async function (req, res, next) {
    try {
        const result = await Competition.update(
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

