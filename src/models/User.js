const fs = require('fs');
const { v4 } = require('uuid');

let db = require('../database/db.json');

const { uploadPath } = require('../config/upload');

const writeToDB = () => {
    const json = JSON.stringify(db);
    fs.writeFileSync('./src/database/db.json', json);
}

const User = {
    findAll: () => db.users,

    findByEmail: (email) => {
        //busca o usuário pelo email informado
        const user = db.users.find(user => user.email === email);
        //retorna o usuário encontrado
        return user;
    },

    findById: (id) => {
        const user = db.users.find(user => user.id === id);
        return user;
    },

    removeFoto: (id) => {
        const user = db.users.find(user => user.id === id);
        fs.unlinkSync(
            `${uploadPath}/${user.foto}`
        );
    },

    create: (user, foto) => {
        db.users.push({ id: v4(), ...user, foto });
        writeToDB();
    },

    update: (id, user, foto) => {
        const userIndex = db.users.findIndex(user => user.id === id);
        db.users[userIndex] = { id, ...user, foto };
        writeToDB();
    },

    delete: (id) => {
        const userIndex = db.users.findIndex(user => user.id === id);
        db.users.splice(userIndex, 1);
        writeToDB();
    }
}

module.exports = User;