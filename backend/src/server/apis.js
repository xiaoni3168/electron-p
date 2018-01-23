module.exports = [
    {
        url: '/api/bill/add',
        method: 'POST',
        handler: function (req, res) {
            let bill = {
                type: +req.body.type,
                gain: +req.body.gain,
                number: +req.body.number,
                date: req.body.date,
                description: req.body.description
            };

            this.$remote.bill.addBill(bill).then(r => {
                this.$remote.finance.getFinanceByConditions({ type: bill.type }).then(finances => {
                    let finance = finances[0];
                    let number = finance.number;
                    if (bill.gain == 1) {
                        number = +Number(number + bill.number).toFixed(2);
                    } else {
                        number = +Number(number - bill.number).toFixed(2);
                    }
                    console.log(number)
                    this.$remote.finance.updateFinance({ type: bill.type }, { number: number }).then(_r => {
                        res.status(200).send({ bill: r, latest: number });
                    }).catch(e => {
                        this.$remote.bill.deleteBill(r._id);
                        res.status(500).send(e);
                    });
                });
            }).catch(e => {
                res.status(500).send(e);
            });
        }
    },
    {
        url: '/api/bill/list',
        method: 'GET',
        handler: function (req, res) {
            this.$remote.bill.getAllBills().then(bills => {
                res.status(200).send(bills);
            }).catch(e => {
                res.status(500).send(e);
            });
        }
    },
    {
        url: '/api/finance/all',
        method: 'GET',
        handler: function (req, res) {
            this.$remote.finance.getAllFinance().then(finances => {
                res.status(200).send(finances);
            }).catch(e => {
                res.status(500).send(e);
            });
        }
    },
    {
        url: '/api/bill/listByMonth',
        method: 'GET',
        handler: function (req, res) {
            let date = new Date(+req.query.date);
            let year = date.getFullYear(),
                month = date.getMonth();
            
            let start = +new Date(year, month, 1),
                end = +new Date(year, month + 1, 0);
            
            let condition = { date: { $gt: start, $lt: end } };

            this.$remote.bill.getBillsByCondition(condition).then(bills => {
                res.status(200).send(bills);
            }).catch(e => {
                res.status(500).send(e);
            });
        }
    }
]