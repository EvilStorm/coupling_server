module.exports =  (sequelize, DataTypes) => {
    const Challenger = sequelize.define(
        'Challenger',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
        },
        {
            underscored: true,
            tableName: 'challenger',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    )
    return Challenger;
}