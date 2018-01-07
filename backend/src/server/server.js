const express = require('express');
const bodyParser = require('body-parser');
const APIs = require('./apis');

function Server (remote) {
    this.$remote = remote;
}

Server.prototype = {
    defaults: {
        port: 1883
    },
    init: function () {
        this.app = new express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        APIs.forEach(api => {
            switch (api.method) {
                case 'POST':
                    this.app.post(api.url, (req, res) => {
                        api.handler.call(this, req, res);
                    });
                    break;
                case 'GET':
                    this.app.get(api.url, (req, res) => {
                        api.handler.call(this, req, res);
                    });
                    break;
                default:
                    break;
            }
        });

        this.app.listen(this.defaults.port);
        console.log('Server is running at port ' + this.defaults.port);
    }
}

module.exports = Server;