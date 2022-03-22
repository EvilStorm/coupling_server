module.exports =  (sequelize, DataTypes) => {
    const appVersion = sequelize.define(
        'AppVersion',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            version: {
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
            tableName: 'app_version',
            charset: 'utf8',
            collate: 'utf8',
        }
    )
    return appVersion;
}