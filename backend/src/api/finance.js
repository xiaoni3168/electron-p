const DB = require('../db');
const _ = require('lodash');

const p_finance = new DB('p_finance');

module.exports = {
    getAllFinance: getAllFinance
}

async function getAllFinance () {
    const allFinance = await p_finance.find({});
    return allFinance;
}