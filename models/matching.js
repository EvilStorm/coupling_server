module.exports =  (sequelize, DataTypes) => {
    const Matching = sequelize.define(
        'Matching',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            competitionId: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            opponentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            used: {  
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            
        }, {
            underscored: true,
            tableName: 'matching',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    )
    return Matching;
}