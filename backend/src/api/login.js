const DB = require('../db');
const path = require('path');
const fs = require('fs');

const p_setting = new DB('p_setting');
const p_user = new DB('p_user');

module.exports = {
    getLoginBackground: getLoginBackground,
    signin: signin
}

async function getLoginBackground () {
    const settings = await p_setting.find({});
    const imageBuffer = fs.readFileSync(path.resolve(__dirname, `../../assets/images/${settings[0].login_background}`));
    return imageBuffer.toString('base64');
}

async function signin (username, password) {
    const user = await p_user.find({ username: username });

    if (user && user.length) {
        return user[0].password === password;
    }

    return false;
}