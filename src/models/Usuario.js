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
            allowNull: false
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        },
        avatar: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false
    })

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Endereco, {
            foreignKey: 'fk_usuario',
            as: 'enderecos'
        }),

        Usuario.hasMany(models.CreditCard, {
            foreignKey: 'fk_usuario',
            as: 'cartoes'
        }),

        Usuario.hasMany(models.Pedido, {
            foreignKey: 'fk_usuario',
            as: 'pedidos'
        })

    }

    return Usuario
}