const mosca = require('mosca');
const MqttServer = new mosca.Server({
    port: 1883
});

function Mqtt (remote) {
    this.$remote = remote;
    this.clients = {};
}

Mqtt.prototype = {
    init: function () {
        const that = this;

        MqttServer.on('clientConnected', function (client) {
            that.clients[client.id] = {};
        });
        
        MqttServer.on('published', function (packet, client) {
            
        });
        
        MqttServer.on('ready', function () {
            console.log('mqtt is running...');
        });

        MqttServer.on('subscribed', function (topic, client) {
            console.log(topic + ' subscribed ' + client.id);
        });

        MqttServer.on('unsubscribed', function (topic, client) {

        });

        MqttServer.on('clientDisconnected', function (client) {
            console.log(client.id + ' disconnected');
        })
    }
}

module.exports = Mqtt;