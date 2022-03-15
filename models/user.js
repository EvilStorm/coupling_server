module.exports =  (sequelize, DataTypes) => {
    const user = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            photoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            age: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            firebaseToken: {
                type: DataTypes.STRING,
            },
        }, {
            underscored: true,
            tableName: 'user'
        }
    )
    return user;
}