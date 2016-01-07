/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('userRetainedCtr', userRetainedCtr);
    function userRetainedCtr($scope, $location, ipCookie, $rootScope) {
        require(
            [
                'echarts',
                'echarts/chart/pie',// 使用柱状图就加载bar模块，按需加载
                'echarts/chart/map',
                'echarts/chart/bar'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表}


            })
    }
})();
