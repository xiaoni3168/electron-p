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

    insert (doc) {
        return new Promise ((resolve, reject) => {
            DBS[this.database].insert(doc, function (err, _doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(_doc);
                }
            });
        });
    }

    update (conditions, sets, options) {
        return new Promise ((resolve, reject) => {
            DBS[this.database].update(conditions, { $set: sets }, options, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    delete (conditions, options) {
        return new Promise ((resolve, reject) => {
            DBS[this.database].remove(conditions, options, (err, doc) => {
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
    type: 8,
    gain: 1,
    number: 3.87,
    date: 1515024000000,
    description: '京东小金库'
}

// DBS.p_bill.insert(bill, (err, n) => {
//     console.log(n);
// })
// DBS.p_bill.update({_id: 'zAt8A6pXycSzmMSk'}, { $set : { description: '京东小金库' }}, {}, (err, doc) => {
//     console.log(doc);
// })
// DBS.p_finance.find({type: 8}, (err, d) => {
//     console.log(d)
// })