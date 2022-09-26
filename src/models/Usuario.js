const { DataTypes } = require('sequelize')


module.exports = (sequelize, DataTypes) => {

    const Usuario =  sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false
    })

    return Usuario
}


// const User = {
//     findAll: () => {

//     },

//     findByEmail: (email) => {
//         //busca o usuário pelo email informado
//         // const user = db.users.find(user => user.email === email);
//         // //retorna o usuário encontrado
//         // return user;
//     },

//     findById: (id) => {
//         // const user = db.users.find(user => user.id === id);
//         // return user;
//     },

//     removeFoto: (id) => {
//         // const user = db.users.find(user => user.id === id);
//         // fs.unlinkSync(
//         //     `${uploadPath}/${user.foto}`
//         // );
//     },

//     create: (user, foto) => {
//         // db.users.push({ id: v4(), ...user, foto });
//         // writeToDB();
//     },

//     update: (id, user, foto) => {
//         // const userIndex = db.users.findIndex(user => user.id === id);
//         // db.users[userIndex] = { id, ...user, foto };
//         // writeToDB();
//     },

//     delete: (id) => {
//         // const userIndex = db.users.findIndex(user => user.id === id);
//         // db.users.splice(userIndex, 1);
//         // writeToDB();
//     }
// }
