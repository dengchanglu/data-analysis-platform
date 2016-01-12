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
 * 请求url示例 ： http://ip:端口/api/tdAnalysis?av=all&time=2016-01-11&key=version
 * 返回值示例：[{"key":"android 4.1","active_user":10430,"start_count":5176,"register_user":1107}]
 */
app.get('/api/tdAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    tdAnalysis.tdAnalysis.search(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 性别分析
 * 请求url示例 ： http://ip:端口/api/sexAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例：[{"key":"女","sex_count":56459},{"key":"未知","sex_count":56616},{"key":"男","sex_count":60468}]
 */
app.get('/api/sexAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.sexSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 年龄分布分析
 * 请求url示例 ： http://ip:端口/api/ageAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例： [{"key":"30-14","sex_count":25634},{"key":"0-17","sex_count":24941}]
 */
app.get('/api/ageAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.ageSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 地域分布分析
 * 请求url示例 ： http://ip:端口/api/regionAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例： [{"key":"重庆","sex_count":8656},{"key":"银川","sex_count":9484}]
 */
app.get('/api/regionAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.regionSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 职业分布分析
 * 请求url示例 ： http://ip:端口/api/professionAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例： [{"key":"服务业","sex_count":16990},{"key":"销售客服","sex_count":16691}]
 */
app.get('/api/professionAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.professionSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 学历分布分析
 * 请求url示例 ： http://ip:端口/api/eduAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例： [{"key":"高中","edu_count":28006},{"key":"未知","edu_count":29272}]
 */
app.get('/api/eduAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.eduSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

module.exports = app;
