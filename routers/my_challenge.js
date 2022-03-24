const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');
const auth = require('../components/auth');

const {sequelize, Competition, User, Challenger, } = require('../models');
const { isSignIn } = require('../components/auth');

router.get('/all/:id',  async function (req, res, next) {
    try {
        var result = await Competition.findAll(
            {
                where: {
                    user_id: req.params.id
                },
                include: [{
                    model: User,
                    required: false,
                },
                {
                    model: Challenger,
                    required: false,
                    include: [{
                        model: User,
                        required: false,
                    }]
                }
            ],
            }
        );
        
        for await (const item of result) {
            if(item.dataValues.opponentId != null) {
                const user = await User.findByPk(item.dataValues.opponentId)
                item.dataValues.Oppoent = user;
            }
        }
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }

});


router.get('/competition/:id',  async function (req, res, next) {
    try {
        var result = await Competition.findAll(
            {
                where: {
                    user_id: req.params.id
                },
                include: [{
                    model: User,
                    required: false,
                },
                {
                    model: Challenger,
                    required: false,
                    include: [{
                        model: User,
                        required: false,
                    }]
                }
            ],
            }
        );
        
        for await (const item of result) {
            if(item.dataValues.opponentId != null) {
                const user = await User.findByPk(item.dataValues.opponentId)
                item.dataValues.Oppoent = user;
            }
        }
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});
router.get('/opponent/:id',  async function (req, res, next) {
    try {
        var result = await Competition.findAll(
            {
                where: {
                    opponentId: req.params.id
                },
                include: [{
                    model: User,
                    required: false,
                },
                {
                    model: Challenger,
                    required: false,
                    include: [{
                        model: User,
                        required: false,
                    }]
                }
            ],
            }
        );
        
        for await (const item of result) {
            if(item.dataValues.opponentId != null) {
                const user = await User.findByPk(item.dataValues.opponentId)
                item.dataValues.Oppoent = user;
            }
        }
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }
});


module.exports = router;


