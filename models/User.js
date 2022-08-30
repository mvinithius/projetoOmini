const fs = require('fs');
const { v4 } = require('uuid');

let db = require('../database/db.json');

const writeToDB = () => {
    const json = JSON.stringify(db);
    fs.writeFileSync('./database/db.json', json);
}

const User = {
    create: (user, foto) => {
        db.users.push({ id: v4(), ...user, foto });
        writeToDB();
    }
}

module.exports = User;