const { createProxyMiddleware } = require('http-proxy-middleware');

const weatherProxy = createProxyMiddleware('/weather',{
    target: "http://api.map.baidu.com/weather/v1/?district_id=131121&data_type=all&ak=EhvUNoK2GaR1RY72asRosb2gGVZGlCbS",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        '^/weather': ''
    }
})

module.exports = function (app) {
    app.use(weatherProxy)
};