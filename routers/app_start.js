const express = require('express');
const router = express.Router();
const response = require('../components/response_util');

const {Sequelize, AppVersion, Notify, Term} = require('../models');
var {Op} = require('sequelize');
const { notify } = require('./dev_option');


router.get('/', async function (req, res, next) {

    res.json(response.success({result: 1}))

});

async function getAppVersion(appVer) {
    const result = await AppVersion.findOne({
        attributes: [
            [Sequelize.fn("max", Sequelize.col('seq')), 'seq'],
            [Sequelize.literal(`(select message from app_version where used=1 order by seq desc limit 1)` ),'message' ],
            [Sequelize.fn("max", Sequelize.col('nessesary')), 'nessesary'],        
        ],
        where: {
            [Op.and]: [{
                seq: {
                    [Op.gt]: appVer
                }
            }, {
                used: 1
            }]
        },
        group: ['used'],
    });

    return result;
}

async function getNotify(seq) {
    const result = await Notify.findAll({
        where: {
            [Op.and]: [{
                id: {
                    [Op.gt]: seq
                }
            }, {
                used: 1
            }, {
                important: 1
            }]
        },
        order: [['appStop', 'DESC']]
    });

    return result;
}


async function getTerm(id) {
    const result = await Term.findOne({
        where: {
            [Op.and]: [{
                id: {
                    [Op.gt]: id
                }
            }, {
                used: 1
            }, ]
        },
        order: [['id', 'DESC']],
        limit: 1
    });

    return result;
}



router.get('/init/appVer/:appVer', async function(req, res, next) {
    try {
        const result = await getAppVersion(req.params.appVer);

        res.json(response.success(result));
       
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.get('/init/notify/:notifyId', async function(req, res, next) {
    try {
        const result = await getNotify(req.params.notifyId);
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }

});

router.get('/init/term/:termId', async function(req, res, next) {
    try {
        const result = await getTerm(req.params.termId);
        res.json(response.success(result));
    } catch (e) {
        console.log(e);
        next(e);
    }

});

router.get('/init/:appVer/:notifySeq/:termSeq', async function(req, res, next) {
    try {
        const appVer = await getAppVersion(req.params.appVer)
        const notify = await getNotify(req.params.notifySeq)
        const term = await getTerm(req.params.termSeq)
        
        var result = {
            appVer: appVer,
            notify: notify,
            term: term
        }

        res.json(response.success(result));
        
    } catch (e) {
        console.log(e);
        next(e);
    }
});



router.get('/dump/insert', async function (req, res, next) {

    var result = await dumpInsert.insertDumpData();
    
    res.json(response.success({result: 1}));

});


router.get('/dump/insert/template', async function (req, res, next) {

    var result = await dumpTemplate.insertDumpData();
    
    res.json(response.success({result: 1}));

});


module.exports = router;