/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('terminalDevCtr', terminalDevCtr);
    function terminalDevCtr($scope, $location, ipCookie, $rootScope, $http) {

        $scope.data = [];
        $scope.NewUserSum = 0;
        $scope.ActiveUser = 0;
        $scope.StartCount = 0;

        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('terminalDevice'));

                var option = {
                    title: {
                        text: 'TOP10新增用户（含重复安装）操作系统版本分布',

                    },
                    tooltip: {
                        show: true,
                        trigger: "axis",

                    },
                    xAxis: [
                        {
                            type: 'value',
                            splitNumber: 16,
                            axisLine: false,


                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ["3.2", "6.0", "4.0.3-4.0.4", "2.3.3-2.3.7", "4.1.x", "5.0", "4.2-4.2.2", "4.3", "5.1", "4.4"],
                            splitLine: false,


                        }
                    ],
                    series: [
                        {
                            "name": "新增用户（含重复安装）",
                            "type": "bar",
                            "data": [1, 23, 81, 109, 145, 357, 439, 529, 980, 1444],
                            barCategoryGap: '15',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: '35.15%',
                                        textStyle: {
                                            color: 'black'
                                        }
                                    },
                                    color: '#76B5FF',//颜色
                                },
                                emphasis: {}
                            },


                        }
                    ]
                };

                // 为echarts对象加载数据
                myChart.setOption(option);
            }
        );
        $http.get("http://localhost:3000/api/tdAnalysis?av=all&time=2016-01-11&key=version")
            .success(function (response) {
                for (var i = 0; i < 7; i++) {
                    $scope.NewUserSum += response[i].register_user;
                    $scope.ActiveUser += response[i].active_user;
                    $scope.StartCount += response[i].start_count;
                    $scope.data.push(response[i])
                }
                console.log($scope.data)
                console.log($scope.NewUserSum)
                console.log($scope.ActiveUser)
                console.log($scope.StartCount)

            });


    }
})();
