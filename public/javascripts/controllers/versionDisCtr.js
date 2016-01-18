/**
 * Created by perfection on 16-1-15.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('versionDisCtr', function ($scope, $http) {
            $scope.templateVersion = {
                "av": '2.1.0,1.1.0'
            };
            $scope.date = {
                startDate: moment().subtract(1, "days"),
                endDate: moment()
            };
            $scope.data = {
                dateTime: [],
                series: []
            };
            $scope.formatTime = function (time) {
                var date = new Date(time);
                return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            };
            var versionAnalysisChart;
            var option;
            require(
                [
                    'echarts',
                    'echarts/chart/line'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表}
                    versionAnalysisChart = ec.init(document.getElementById('versionAnalysis'));
                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: $scope.data.dateTime
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: $scope.data.series
                    };

                    versionAnalysisChart.setOption(option);
                });

            $scope.chooseCM = function (cm) {
                $scope.time = $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate);
                $http.get("http://localhost:3000/api/versionAnalysis?time=" + $scope.time + "&cm=" + cm + "&av=" + $scope.templateVersion.av).success(function (data) {
                    $scope.data.dateTime = [$scope.formatTime($scope.date.startDate), $scope.formatTime($scope.date.endDate)];
                    //{
                    //    name: '',
                    //        type: 'line',
                    //    stack: '总量',
                    //    data: []
                    //}
                    for (var i = 0; i < data.length; i++) {
                        $scope.data.series.push({
                            name: data[i].key,
                            type: 'line',
                            stack: '总量'
                        });
                        $scope.data.series.push(
                            {
                                data: [data[i].register_user]
                            }
                        );
                    }
                    //versionAnalysisChart.setOption(option);
                });
            };
            $scope.opts = {
                locale: {
                    applyClass: 'btn-green',
                    applyLabel: "确定",
                    fromLabel: "Od",
                    toLabel: "Do",
                    cancelLabel: '取消',
                    customRangeLabel: '自定义时间',
                    daysOfWeek: ['六', '日', '一', '二', '三', '四', '五'],
                    firstDay: 1,
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
                        '十月', '十一月', '十二月'
                    ]
                },
                ranges: {
                    '7天': [moment().subtract(6, 'days'), moment()],
                    '14天': [moment().subtract(13, 'days'), moment()],
                    '30天': [moment().subtract(29, 'days'), moment()]
                }
            };
            //Watch for date changes
            $scope.$watch('date', function (newDate) {
                //console.log($scope.date);
                //console.log('New date set: ', newDate);
            }, false);
        });
})();