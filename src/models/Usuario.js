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
        },
        fk_cartao: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_compra: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_endereco: {
            type: DataType.INTEGER,
            allowNull: true
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
        })
    }

    return Usuario
}