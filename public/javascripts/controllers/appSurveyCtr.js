/**
 * Created by perfection on 16-2-19.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('appSurveyCtr', appSurveyCtr);
    function appSurveyCtr($scope, URL, $http) {
        $scope.data = [];
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };
        $scope.getTimes = function () {
            var date1 = new Date();
            var days = 2;
            var time = "";
            for (var i = 0; i < days; i++) {
                var dataTem = new Date(date1.getTime() - i * (24 * 3600 * 1000));
                time += $scope.formatTime(dataTem) + ",";
            }
            return time.substring(0, time.length - 1);
        };
        $scope.appSurvey = function () {
            $http.get(URL + "appSurvey_user?time=" + $scope.getTimes()).success(function (data) {
                $scope.data = data;
            }).error(function (data, status, headers, config) {
                //document.getElementById("errorShow").innerHTML = "链接错误，请重新刷新一下！"
            });
        };

        $scope.appSurvey();
    }
})();