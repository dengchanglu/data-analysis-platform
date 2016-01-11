/**
 * Created by perfection on 15-12-3.
 */
var express = require('express');
var tdAnalysis = require('../service/tdAnalysis');
var requestParsedUtil = require('../util/requestParsedUtil');
var es = require('../elasticsearch/esClient');
var upAnalysis = require('../service/userPortraitAnalysis');
var app = express();

/**
 * 终端设备分析
 * 请求url示例 ： http://ip:端口/api/channelVersionDistribution?av=all&time=2016-01-11&key=version
 * 返回值示例：[{"key":"android 4.1","active_user":10430,"start_count":5176,"register_user":1107}]
 */
app.get('/api/tdAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    tdAnalysis.tdAnalysis.search(es.client, queryData, function (data) {
        res.send(data);
    });
});

app.get('/api/sexAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.sexSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

module.exports = app;
