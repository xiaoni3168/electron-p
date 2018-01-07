const fs = require('fs');
const path = require('path');
const moment = require('moment');

fs.mkdirSync(path.resolve(__dirname, 'dist'));

let manifest = fs.readFileSync(path.resolve(__dirname, 'app.manifest'), 'utf8');

manifest = manifest.replace(/(\{\{Date\}\})/g, function ($1) {
    return moment(new Date).format('YYYY年MM月DD日 HH:mm:ss');
});

fs.writeFileSync(path.resolve(__dirname, 'dist/app.manifest'), manifest);