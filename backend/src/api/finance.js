const DB = require('../db');
const _ = require('lodash');

const p_finance = new DB('p_finance');

module.exports = {
    getAllFinance: getAllFinance,
    getFinanceByConditions: getFinanceByConditions,
    updateFinance: updateFinance
}

async function getAllFinance () {
    const allFinance = await p_finance.find({});
    return allFinance;
}

async function getFinanceByConditions (conditions) {
    const finance = await p_finance.find(conditions);
    return finance;
}

async function updateFinance (conditions, sets, options = {}) {
    const doc = await p_finance.update(conditions, sets, options);
    return doc;
}