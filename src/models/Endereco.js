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
            allowNull: true,
        },
        referencia: {
            type: DataType.STRING,
            allowNull: true,
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
            allowNull: false,
        }
    },
    {
        tableName: 'enderecos',
        timestamps: false
    })

    Endereco.associate = (listaDeModelos) => {
        Endereco.belongsTo(listaDeModelos.Usuario),{
            foreignKey: 'fk_usuario',
            as: 'usuario'
        }
    }

    return Endereco
}