module.exports = (sequelize, DataType) => {

    const CreditCard =  sequelize.define('CreditCard', {
        id_cartao: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome_cartao: {
            type: DataType.STRING,
            allowNull: false,
        },
        bandeira: {
            type: DataType.STRING,
            allowNull: false,
        },
        numero: {
            type: DataType.STRING,
            allowNull: false,
        },
        data_expiracao: {
            type: DataType.STRING,
            allowNull: false,
        },
        fk_usuario: {
            type: DataType.INTEGER,
        }
    },
    {
        tableName: 'cartoes',
        timestamps: false
    })

    CreditCard.associate = (models) => {
        CreditCard.belongsTo(models.CreditCard,{
            foreignKey: 'fk_usuario',
            as: 'usuario'
        })
    }

    return CreditCard
}