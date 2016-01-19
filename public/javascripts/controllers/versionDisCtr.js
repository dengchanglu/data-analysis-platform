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
                series: [],
                legend: []
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
                            data: $scope.data.legend
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
                    $scope.chooseCM("all", $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateVersion.av);

                });

            $scope.chooseCM = function (cm, time, av) {
                $http.get("http://localhost:3000/api/versionAnalysis?time=" + time + "&cm=" + cm + "&av=" + av).success(function (data) {
                    var dateTimeTem = [];
                    for (var c = 0; c < data.length; c++) {
                        $scope.data.dateTime.push(data[c].index);
                    }
                    var seriesTem = [];
                    for (var j = 0; j < data[0].data.length; j++) {
                        $scope.data.legend.push(data[0].data[j].key);
                        var serTem = [];
                        for (var i = 0; i < data.length; i++) {
                            serTem.push(data[i].data[j].register_user);
                        }
                        seriesTem.push({
                            name: data[0].data[j].key,
                            type: 'line',
                            stack: '总量',
                            data: serTem
                        });
                    }
                    $scope.data.series=seriesTem;
                    option.legend.data = $scope.data.legend;
                    option.series = $scope.data.series;
                    option.xAxis[0].data = $scope.data.dateTime;
                    versionAnalysisChart.setOption(option);
                    $scope.data = {
                        dateTime: [],
                        series: [],
                        legend: []
                    };
                })
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
                var date1 = new Date($scope.formatTime(newDate.startDate));  //开始时间
                var date2 = new Date($scope.formatTime(newDate.endDate));    //结束时间
                var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
                //计算出相差天数
                var days = Math.floor(date3 / (24 * 3600 * 1000));
                var time = "";
                for (var i = 0; i < days; i++) {
                    var dataTem = new Date(date1.getTime() + i * (24 * 3600 * 1000));
                    time += $scope.formatTime(dataTem) + ",";
                }
                time += $scope.formatTime(newDate.endDate);
                $scope.chooseCM("all", time, $scope.templateVersion.av);
            }, false);
        }
    )
    ;
})();