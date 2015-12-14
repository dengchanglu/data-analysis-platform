/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('channelDisCtr', channelDisCtr);
    function channelDisCtr($scope, $location, ipCookie, $rootScope) {
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('channelDistribution'));

                var option = {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data:['销量','数量']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"销量",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        },
                        {
                            "name":"数量",
                            "type":"bar",
                            "data":[5, 2, 23, 11, 3, 21]
                        }
                    ]
                };

                // 为echarts对象加载数据
                myChart.setOption(option);
            }
        );
    }
})();