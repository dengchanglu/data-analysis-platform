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
 * 请求的参数：url?time=2016-01-11&key=version&version=all;
 * 请求参数值：time的的值必须是这种格式2016-01-11;key指关键指标：
 * version-操作系统版本,sr-屏幕分辨率,ne-网络运行环境,co-运营商,phoneType-设备型号;
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
 * 请求参数：url?time=2016-01-11,2016-01-08
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
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
 * 请求参数：url?time=2016-01-11,2016-01-08
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
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
 * 请求参数：url?time=2016-01-11,2016-01-08
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
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
 * 请求参数：url?time=2016-01-11,2016-01-08
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
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
 * 请求参数：url?time=2016-01-11,2016-01-08
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * 请求url示例 ： http://ip:端口/api/eduAnalysis?time=2016-01-11,2016-01-08
 * 返回值示例： [{"key":"高中","edu_count":28006},{"key":"未知","edu_count":29272}]
 */
app.get('/api/eduAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    console.log(queryData.time)
    upAnalysis.upAnalysis.eduSearch(es.client, queryData, function (data) {

        res.send(data);
    });
});

/**
 * 版本分布分析
 * 请求参数：url?time=2016-01-18&cm=guanwang&av=2.2.0,2.1.0
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/versionAnalysis?time=2016-01-18&cm=guanwang&av=2.2.0,2.1.0
 * 返回值示例： [{"key":"2.2.0","active_user":1019,"start_count":519,"register_user":103},{"key":"2.1.0","active_user":1025,"start_count":535,"register_user":102}]
 */
app.get('/api/versionAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.versionSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 渠道分布分析
 * 请求参数：url?time=2016-01-18&cm=guanwang&av=2.2.0,2.1.0
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/versionAnalysis?time=2016-01-18&cm=guanwang&av=2.2.0,2.1.0
 * 返回值示例： [{"key":"2.2.0","active_user":1019,"start_count":519,"register_user":103},{"key":"2.1.0","active_user":1025,"start_count":535,"register_user":102}]
 */
app.get('/api/channelAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.channelSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 使用时长分析
 * 请求参数：url?time=2016-01-18&cm=all&av=all
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/timeOfUsingAnalysis?time=2016-01-18&cm=all&av=all
 * 返回值示例： {"dataForm":[{"day":"app-2016-01-12","time_difference":"0"}],"dataTable":[{"key":"[0,4)秒","activeUser":6000,"newUser":638,"activeUser_percentage":"100.00","newUser_percentage":"100.00"},
 */
app.get('/api/timeOfUsingAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.timeOfUsingSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 访问页面分析
 * 请求参数：url?time=2016-01-18&cm=all&av=all
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/pageViewsAnalysis?time=2016-01-18&cm=all&av=all
 * 返回值示例： {"dataForm":[{"day":"app-2016-01-12","time_difference":"0"}],"dataTable":[{"key":"[0,4)秒","activeUser":6000,"newUser":638,"activeUser_percentage":"100.00","newUser_percentage":"100.00"},
 */
app.get('/api/pageViewsAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.pageViewsSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 页面来源分析
 * 请求参数：url?time=2016-01-18&cm=all&av=all
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/sourceAnalysis?time=2016-01-18&cm=all&av=all
 * 返回值示例： {"dataForm":[{"day":"app-2016-01-12","time_difference":"0"}],"dataTable":[{"key":"[0,4)秒","activeUser":6000,"newUser":638,"activeUser_percentage":"100.00","newUser_percentage":"100.00"},
 */
app.get('/api/sourceAnalysis', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.sourceAnalysisSearch(es.client, queryData, function (data) {
        res.send(data);
    });
});

/**
 * 应用概括用户部分分析
 * 请求参数：url?time=2016-01-18&cm=all&av=all
 * time时间参数，值的格式：2016-01-01,时间1,时间2,时间3,时间4,...
 * cm-渠道标记;av:av-app版本
 * 请求url示例 ： http://ip:端口/api/sourceAnalysis?time=2016-01-18&cm=all&av=all
 * 返回值示例： {"dataForm":[{"day":"app-2016-01-12","time_difference":"0"}],"dataTable":[{"key":"[0,4)秒","activeUser":6000,"newUser":638,"activeUser_percentage":"100.00","newUser_percentage":"100.00"},
 */
app.get('/api/appSurvey_user', function (req, res) {
    var queryData = requestParsedUtil.getParamJson(req.url);
    upAnalysis.upAnalysis.appSurvey_user(es.client, queryData, function (data) {
        res.send(data);
    });
});

module.exports = app;
