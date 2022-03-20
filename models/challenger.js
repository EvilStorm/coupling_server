module.exports =  (sequelize, DataTypes) => {
    const Challenger = sequelize.define(
        'Challenger',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
        },
        {
            underscored: true,
            tableName: 'challenger'
        }
    )
    return Challenger;
}