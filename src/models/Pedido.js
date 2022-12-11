const { database } = require("../config/database")

module.exports = (sequelize, DataType) => {

    const Pedido =  sequelize.define('Pedido', {
        id_pedido: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        valor: {
            type: DataType.STRING,
            allowNull: false,
        },
      
        status: {
            type: DataType.STRING,
            allowNull: false,
        },

        fk_usuario: {
            type: DataType.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'pedidos',
        timestamps: false
    })

    Pedido.associate = (models) => {
        Pedido.belongsTo(models.Usuario, {
            foreignKey: 'fk_usuario',
            as: 'usuario'
        }),

        Pedido.belongsToMany(models.Servico, {
            foreignKey: 'fk_servico',
            as: 'servicosComprados',
            through: models.ServicoComprado
        })
    }

    return Pedido
}