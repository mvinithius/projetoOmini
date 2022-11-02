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
        }        
    },
    {
        tableName: 'servicos',
        timestamps: false
    })

    return Servico
}