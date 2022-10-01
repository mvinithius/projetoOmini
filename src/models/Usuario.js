const { DataTypes } = require('sequelize')


module.exports = (sequelize, DataTypes) => {

    const Usuario =  sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false
    })

    return Usuario
}