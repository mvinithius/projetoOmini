module.exports = (sequelize, DataType) => {

    const Usuario =  sequelize.define('Usuario', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false
    })

    Usuario.associate = (listaDeModelos) => {
        Usuario.hasMany(listaDeModelos.Endereco, {
            foreignKey: 'fk_usuario',
            as: 'enderecos'
        }),

        Usuario.hasMany(listaDeModelos.CreditCard, {
            foreignKey: 'fk_usuario',
            as: 'cartoes'
        })
    }

    return Usuario
}