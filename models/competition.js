module.exports =  (sequelize, DataTypes) => {
    const Competition = sequelize.define(
        'Competition',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            opponentId: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            locationLatLng: {
                type: DataTypes.GEOMETRY('POINT')
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },          
            locationName: {
                type: DataTypes.STRING,
                allowNull: false,
            },          
            matchTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
            tableName: 'competition',
            charset: 'utf8',
            collate: 'utf8',
        }
    )
    return Competition;
}