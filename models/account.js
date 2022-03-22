module.exports =  (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            identifyId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            secureLevel: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            joinType: {  //0: 기본, 1: 구글, 2: 페이스북, 3: 카카오, 4: 애플
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            
        }, {
            underscored: true,
            tableName: 'account',
            charset: 'utf8',
            collate: 'utf8',
        }
    )
    return Account;
}