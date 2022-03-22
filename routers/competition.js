const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Competition, User, Challenger} = require('../models');
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


router.get('/detail/:id', async function (req, res, next) {
    try {
        var result = await Competition.findOne(
            {
                where: {
                    id: req.params.id
                },
                include: [{
                    model: User,
                },{
                    model: Challenger,
                    include: [{
                        model: User,
                    }]
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

        const user = await User.findByPk(req.decoded.id);
        
        user.addCompetition(competition);

        res.json(response.success(competition));

    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/challenge', [body('competitionId').exists()], auth.isSignIn, async function (req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(response.fail(createException(ExceptionType.INVALID_PARAMS)));
    }

    try {
        var challenger = await Challenger.create({competitionId: req.body.competitionId, UserId: req.decoded.id});
        var competition = await Competition.findByPk(req.body.competitionId);
        
        competition.addChallenger(challenger);

        res.json(response.success({result: 1, message: "등록되었습니다."}));

    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/select/challenger', [body('challengerId').exists(), body('competitionId').exists()], auth.isSignIn, async function (req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(response.fail(createException(ExceptionType.INVALID_PARAMS)));
    }

    var temp = await Competition.findByPk(req.body.competitionId);
    if(temp.opponentId != null){
        res.json(response.success({result: 0, message: "이미 매칭이 완료 되었습니다."}));
        return;
    }

    try {
        Competition.update(
            {opponentId: req.body.challengerId},
            {
                where: {
                    id: req.body.competitionId
                }
            }
        )

        res.json(response.success({result: 1, message: "등록되었습니다."}));

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

