const {sequelize, Account, User} = require('../../models');

async function getUserInfoByPk(id) {
    return await User.findByPk(req.decoded.id, 
        {
        // attributes: ['id', 'nickName', 'photoUrl', 'age', 'firebaseToken', [sequelize.col('Account.identify_id'), 'tt']],
    
        include: [
            {
                model: Account,
                attributes: [],
                required: true,
            }],
            attributes: ['id', 'nickName', 'photoUrl', 'age', 'firebaseToken', 
                [sequelize.col('Account.identify_id'), 'identifyId'], 
                [sequelize.col('Account.email'), 'email'], 
                [sequelize.col('Account.secure_level'), 'secureLevel'], 
                [sequelize.col('Account.join_type'), 'joinType'], 
            ],

        raw: true,
    });
}

async function getUserInfoAccountId(id) {
    return await User.findOne( 
        {
        // attributes: ['id', 'nickName', 'photoUrl', 'age', 'firebaseToken', [sequelize.col('Account.identify_id'), 'tt']],
        where: {
            account_id: id
        },  
        include: [
            {
                model: Account,
                attributes: [],
                required: true,
            }],
            attributes: ['id', 'nickName', 'photoUrl', 'age', 'firebaseToken', 
                [sequelize.col('Account.identify_id'), 'identifyId'], 
                [sequelize.col('Account.email'), 'email'], 
                [sequelize.col('Account.secure_level'), 'secureLevel'], 
                [sequelize.col('Account.join_type'), 'joinType'], 
            ],

        raw: true,
    });
}



module.exports = {
    getUserInfoByPk,
    getUserInfoAccountId
}
