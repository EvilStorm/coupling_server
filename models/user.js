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
                unique: true
            },
            photoUrl: {
                type: DataTypes.STRING,
            },
            age: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            gender: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            height: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            weight: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            kakaoTalkId: {
                type: DataTypes.STRING,
            },
            locationLatLng: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            location: {
                type: DataTypes.STRING,
            }, 
            history: {
                type: DataTypes.STRING,
            },
            firebaseToken: {
                type: DataTypes.STRING,
            },
        }, {
            underscored: true,
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8',
        }
    )
    return user;
}