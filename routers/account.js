const express = require('express');
const router = express.Router();

const response = require('../components/response_util');
const { body, validationResult } = require('express-validator');
const {ExceptionType, createException} = require('../components/exception_creator');

const {sequelize, Account, User, Setting} = require('../models');
const {getUserInfoByPk, getUserInfoAccountId} = require('./functions/user_info');


//회원가입, 로그인은 Firebase를 통해 이루어지고, 
//Firebase회원 체계를 이용 이후 동작부터 진행됨.
router.post('/', [body('identifyId').exists()], async function (req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(response.fail(createException(ExceptionType.INVALID_PARAMS)));
    }

    const checkExists = await Account.findOne({
        where: {
            identifyId: req.body.identifyId
        }
    });
    if(checkExists != null) {
        try {
            const result = await getUserInfoAccountId(checkExists.id);
            res.json(response.success(result));
            return;
        } catch(e) {
            console.log(e);
            next(e);
        }
    }

    let transaction = await sequelize.transaction();
    try {
        const accountResult  = await Account.create(req.body, {transaction});

        const userResult = await User.create({
            AccountId: accountResult.id
        }, {transaction});

        const SettingResult = await Setting.create({
            UserId: userResult.id
        }, {transaction});

        transaction.commit();

        const result = await getUserInfoByPk(userResult.id);

        console.log(` SEARCH USER: ${userResult.id}  BUT !!! result: ${JSON.stringify(result)}`);
        res.json(response.success(result));

    } catch (e) {
        transaction.rollback();
        console.log(e);
        next(e);
    }
});




module.exports = router;
