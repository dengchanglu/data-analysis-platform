/**
 * Created by perfection on 15-12-3.
 */

var dataAP = angular.module('dataAP', ['ui.router', 'ipCookie', 'ui.bootstrap', 'daterangepicker'], function ($compileProvider) {
    $compileProvider.directive('compile', function ($compile) {
        // directive factory creates a link function
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);
                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    })

}).factory('URL', function () {
    return "http://192.168.1.32:3000/api/";
});
dataAP.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "index");
    $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "views/index.html",
            controller: 'indexCtr',
            cache: 'true',
        })
        .state("index.channelDis", {
            url: "/channelDis",
            templateUrl: "views/analysisViews/channelDistribution.html",
            controller: "channelDisCtr",
            cache: 'true',
        })
        .state("index.channelSS", {
            url: "/channelSS",
            templateUrl: "views/analysisViews/channelSourceSegmentation.html",
            cache: 'true',
        })
        .state("index.versionDis", {
            url: "/versionDis",
            templateUrl: "views/analysisViews/versionDistribution.html",
            controller: "versionDisCtr",
            cache: 'true',
        })
        .state("index.terminalDev", {
            url: "/terminalDev",
            templateUrl: "views/analysisViews/terminalDevice.html",
            controller: "terminalDevCtr",
            cache: 'true',

        })
        .state("index.userPortrait", {
            url: "/userPortrait",
            templateUrl: "views/analysisViews/userPortrait.html",
            controller: "userPortraitCtr",
            cache: 'true',

        })
        .state("index.userRetained", {
            url: "/userRetained",
            templateUrl: "views/analysisViews/userRetained.html",
            /*controller:"usersRetainedCtr"*/
            cache: 'true',

        })
        .state("index.accessPage", {
            url: "/accessPage",
            templateUrl: "views/analysisViews/accessPage.html",
            controller: "accessPageCtr",
            cache: 'true',
        })
        .state("index.usingTimeLength", {
            url: "/usingTimeLength",
            templateUrl: "views/analysisViews/usingTimeLength.html",
            controller: "usingTimeLengthCtr",
            cache: 'true',
        })
        .state("index.pathAnalysis", {
            url: "/pathAnalysis",
            templateUrl: "views/analysisViews/pathAnalysis.html",
            controller: "pathAnalysisCtr",
            cache: 'true',
        })


    ;


    require.config({
        packages: [
            {
                name: 'echarts',
                location: '/public/javascripts/bower_components/echarts/build/dist',
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