module.exports =  (sequelize, DataTypes) => {
    const appVersion = sequelize.define(
        'appVersion',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            seq: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nessesary: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            used: {  
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            
        }, {
            underscored: true,
            tableName: 'app_version'
        }
    )
    return appVersion;
}