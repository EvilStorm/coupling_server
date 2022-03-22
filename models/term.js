module.exports =  (sequelize, DataTypes) => {
    const term = sequelize.define(
        'Term',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            seq: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            term: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userTerm: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            used: {  
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            
        }, {
            underscored: true,
            tableName: 'term',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    )
    return term;
}