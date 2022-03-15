module.exports =  (sequelize, DataTypes) => {
    const notify = sequelize.define(
        'Notify',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            appStop: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            important: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            used: {  
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            
        }, {
            underscored: true,
            tableName: 'notify'
        }
    )
    return notify;
}