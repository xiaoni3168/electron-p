const Datastore = require('nedb');
const path = require('path');

const DBS = {
    p_setting   : new Datastore({ filename: path.resolve(__dirname, 'p_setting.db'), autoload: true }),
    p_user      : new Datastore({ filename: path.resolve(__dirname, 'p_user.db'), autoload: true }),
    p_finance   : new Datastore({ filename: path.resolve(__dirname, 'p_finance.db'), autoload: true }),
    p_bill      : new Datastore({ filename: path.resolve(__dirname, 'p_bill.db'), autoload: true })
}

class DB {
    constructor (database) {
        this.database = database;
    }

    find (conditions) {
        return new Promise ((resolve, reject) => {
            DBS[this.database].find(conditions, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }
}

module.exports = DB;

let bill = {
    type: 3,
    gain: 1,
    number: 1000,
    date: 1514937600000,
    description: '微信转账'
}

// DBS.p_bill.insert(bill, (err, n) => {
//     console.log(n);
// })
// DBS.p_bill.update({_id: 'zAt8A6pXycSzmMSk'}, { $set : { description: '京东小金库' }}, {}, (err, doc) => {
//     console.log(doc);
// })
// DBS.p_finance.find({}, (err, d) => {
//     console.log(d)
// })