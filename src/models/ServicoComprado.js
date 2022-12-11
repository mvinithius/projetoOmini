module.exports = (sequelize, DataType) => {

    const ServicoComprado =  sequelize.define('ServicoComprado', {
        fk_servico: DataType.INTEGER,

        fk_pedido: DataType.INTEGER        
    },
    {
        tableName: 'servicos_comprados',
        timestamps: false
    })

    return ServicoComprado
}