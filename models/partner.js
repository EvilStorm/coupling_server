module.exports =  (sequelize, DataTypes) => {
    const Partner = sequelize.define(
        'Partner',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            opponentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
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
            tableName: 'partner'
        }
    )
    return Partner;
}