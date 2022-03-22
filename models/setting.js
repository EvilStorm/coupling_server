module.exports =  (sequelize, DataTypes) => {
    const Setting = sequelize.define(
        'Setting',
        {
            nearByAlarm: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            categoryAlarm: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            matchCoupleAlarm: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },            
        }, {
            underscored: true,
            tableName: 'setting',
            charset: 'utf8',
            collate: 'utf8',
        }
    )
    return Setting;
}