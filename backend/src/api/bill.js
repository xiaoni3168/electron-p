const DB = require('../db');
const _ = require('lodash');

const p_bill = new DB('p_bill');

module.exports = {
    addBill: addBill,
    deleteBill: deleteBill,
    getAllBills: getAllBills,
    getBillsByCondition: getBillsByCondition
}

async function addBill (bill) {
    return await p_bill.insert(bill);
}

async function deleteBill (id) {
    return await p_bill.delete({ _id: id }, {});
}

async function getAllBills () {
    return await p_bill.find({});
}

async function getBillsByCondition (condition) {
    return await p_bill.find(condition);
}