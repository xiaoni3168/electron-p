const request = require('request');
const url = 'http://tj.nineton.cn/Heart/index/all?city=';

module.exports = {
    getWeather: getWeather
}

function getWeather (cityCode) {
    return new Promise ((rs, rj) => {
        request.get(url + cityCode, (err, res, body) => {
            if (err) {
                rj(err);
            } else {
                rs({
                    res,
                    body
                });
            }
        })
    })
}