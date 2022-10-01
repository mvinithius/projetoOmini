const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    const Servico =  sequelize.define('Servico', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'servicos',
        timestamps: false
    })

    return Servico
}