module.exports = (sequelize, DataType) => {

    const Servico =  sequelize.define('Servico', {
        id_servico: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false
        },
        valor: {
            type: DataType.STRING,
            allowNull: false
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false,
        },
        imagem: {
            type: DataType.STRING,
        }
    },
    {
        tableName: 'servicos',
        timestamps: false
    })

    Servico.associate = (models) => {
        Servico.belongsToMany(models.Pedido, {
            foreignKey: 'fk_pedido',
            as: 'pedidos',
            through: models.ServicoComprado
        })
    }

    return Servico
}