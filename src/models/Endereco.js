module.exports = (sequelize, DataType) => {

    const Endereco =  sequelize.define('Endereco', {
        id_endereco: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome_endereco: {
            type: DataType.STRING,
            allowNull: false,
        },
        cep: {
            type: DataType.STRING,
            allowNull: false,
        },
        logradouro: {
            type: DataType.STRING,
            allowNull: false,
        },
        numero_casa: {
            type: DataType.STRING,
            allowNull: false,
        },
        complemento: {
            type: DataType.STRING,
        },
        referencia: {
            type: DataType.STRING,
        },
        bairro: {
            type: DataType.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataType.STRING,
            allowNull: false,
        },
        estado: {
            type: DataType.STRING,
            allowNull: false,
        },
        fk_usuario: {
            type: DataType.INTEGER,
        }
    },
    {
        tableName: 'enderecos',
        timestamps: false
    })

    Endereco.associate = (models) => {
        Endereco.belongsTo(models.Usuario,{
            foreignKey: 'fk_usuario',
            as: 'usuario'
        })
    }

    return Endereco
}