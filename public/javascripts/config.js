/**
 * Created by perfection on 15-12-3.
 */

var dataAP = angular.module('dataAP', ['ui.router','ipCookie']);
dataAP.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "index");
    $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "views/index.html",
            controller: 'indexCtr'
        })
        .state("index.channelDis", {
            url:"/channelDis",
            templateUrl: "views/analysisViews/channelDistribution.html",
            controller:"channelDisCtr"
        })
        .state("index.channelSS", {
            url:"/channelSS",
            templateUrl: "views/analysisViews/channelSourceSegmentation.html"
        })
        .state("index.versionDis", {
            url:"/versionDis",
            templateUrl: "views/analysisViews/channelSourceSegmentation.html"
        });

    require.config({
        packages: [
            {
                name: 'echarts',
                location: '/public/javascripts/bower_components/echarts/src',
                main: 'echarts'
            },
            {
                name: 'zrender',
                location: '/public/javascripts/bower_components/zrender/src',
                main: 'zrender'
            }
        ]
    });
});