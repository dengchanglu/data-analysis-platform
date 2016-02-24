/**
 * Created by perfection on 16-2-19.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('appSurveyCtr', appSurveyCtr);
    function appSurveyCtr($scope, URL, $http) {
        $scope.data = {
            legend: [],
            dateTime: [],
            series: []
        };
        $scope.pageData = [];
        $scope.dateTime = "2016-2-25";
        var option;
        var appSurvey_timeRangeChart;
        var appSurvey_areaChart;
        var areaOption;
        $scope.data = [];
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };
        $scope.getTimes = function (days) {
            var date1 = new Date();
            var time = "";
            for (var i = 0; i < days; i++) {
                var dataTem = new Date(date1.getTime() - i * (24 * 3600 * 1000));
                time += $scope.formatTime(dataTem) + ",";
            }
            return time.substring(0, time.length - 1);
        };
        $scope.appSurvey = function () {
            $http.get(URL + "appSurvey_user?time=" + $scope.getTimes(2)).success(function (data) {
                $scope.data = data;
            }).error(function (data, status, headers, config) {
                //document.getElementById("errorShow").innerHTML = "链接错误，请重新刷新一下！"
            });
        };
        $scope.appSurvey();
        $scope.timeRangeAnalysis = function (analysisType) {
            var url = URL;
            var legend = "";

            switch (analysisType) {
                case 0:
                    url += "appSurvey_timeRange_activeUser?time=" + $scope.dateTime;
                    legend = "新增用户";
                    break;
                case 1:
                    url += "appSurvey_timeRange_activeUser?time=" + $scope.dateTime;
                    legend = "活跃用户";
                    break;
                case 2:
                    url += "appSurvey_timeRange_startCount?time=" + $scope.dateTime;
                    legend = "启动次数";
                    break;
            }
            $http.get(url).success(function (data) {
                option.legend = {
                    data: [legend]
                };
                var seriesData = [];
                var date_time = [];
                for (var i = 0; i < data.length; i++) {
                    date_time.push(data[i].dateTime);
                    if (analysisType == 0) {
                        seriesData.push(data[i].uv);
                    } else if (analysisType == 1) {
                        seriesData.push(data[i].uv);
                    } else {
                        seriesData.push(data[i].start_count);
                    }
                }
                option.xAxis[0].data = date_time;
                option.series = [{
                    name: legend,
                    type: 'line',
                    stack: '总量',
                    data: seriesData
                }];
                appSurvey_timeRangeChart.setOption(option);
            }).error(function (data, status, headers, config) {
                //document.getElementById("errorShow").innerHTML = "链接错误，请重新刷新一下！"
            });
        };
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表}
                appSurvey_timeRangeChart = ec.init(document.getElementById('timeRangeAnalysis'), {
                    noDataLoadingOption: {
                        text: '暂无数据',
                        x: 'center',
                        y: 'center',
                        effect: 'whirling',
                        textStyle: {
                            fontSize: 20
                        },
                        effectOption: {
                            effect: {
                                n: 0
                            }
                        }
                    }
                });


                option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        //data: $scope.data.legend
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
                            //data: $scope.data.dateTime
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    //series: $scope.data.series
                    series: []
                };

                //appSurvey_timeRangeChart.setOption(option);
                $scope.timeRangeAnalysis(2);
            });
        //$scope.appSurvey();
        $scope.triggerKey = function (index) {
            for (var i = 0; i < 3; i++) {
                document.getElementById("key_app_" + i).setAttribute("class", "");
            }
            document.getElementById("key_app_" + index).setAttribute("class", "current");
            $scope.timeRangeAnalysis(index);
        };

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表}
                appSurvey_areaChart = ec.init(document.getElementById('areaAnalysis'), {
                    noDataLoadingOption: {
                        text: '暂无数据',
                        x: 'center',
                        y: 'center',
                        effect: 'whirling',
                        textStyle: {
                            fontSize: 20
                        },
                        effectOption: {
                            effect: {
                                n: 0
                            }
                        }
                    }
                });


                areaOption = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'right'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'left',
                        data: []
                    },
                    series: [
                        {
                            name: '地域分析',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                //appSurvey_areaChart.setOption(areaOption);
                $scope.areaAnalysis();
            });
        $scope.areaAnalysis = function () {
            if (areaOption == undefined) {
                return;
            }
            $http.get(URL + "appSurvey_areaAnalysis?time=" + $scope.getTimes(1)).success(function (data) {
                var legend_area = [];
                areaOption.series[0].data = [];
                for (var i = 0; i < data.length; i++) {
                    legend_area.push(data[i].city);
                    areaOption.series[0].data.push({
                        value: data[i].start_count,
                        name: data[i].city
                    });
                }
                areaOption.legend.data = legend_area;
                appSurvey_areaChart.setOption(areaOption);
            }).error(function (data, status, headers, config) {
                //document.getElementById("errorShow").innerHTML = "链接错误，请重新刷新一下！"
            });
        };

        $scope.pageAnalysis = function () {
            $http.get(URL + "appSurvey_pageAnalysis?time=" + $scope.getTimes(1)).success(function (data) {
                $scope.pageData = [];
                var i = 0;
                var pv_sum = 0;
                for (; i < data.length; i++) {
                    pv_sum += data[i].pv;
                }
                for (i = 0; i < data.length; i++) {
                    if (data[i].page == "-") {
                        data[i].page = "其他页面";
                    }
                    $scope.pageData.push({
                        num: (i + 1),
                        page: data[i].page,
                        pv: data[i].pv,
                        pageName: "-",
                        pv_percentage: Number((data[i].pv / pv_sum).toFixed(2)) * 100
                    });
                }
            }).error(function (data, status, headers, config) {
                //document.getElementById("errorShow").innerHTML = "链接错误，请重新刷新一下！"
            });
        };
        $scope.pageAnalysis();
    }
})();