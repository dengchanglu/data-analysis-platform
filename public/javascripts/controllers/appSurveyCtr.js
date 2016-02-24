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
        $scope.dateTime = "2016-2-24";
        var option;
        var appSurvey_timeRangeChart;
        var appSurvey_areaChart;
        var areaOption;
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

                appSurvey_timeRangeChart.setOption(option);

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
                    title : {
                        text: '',
                        subtext: '',
                        x:'right'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'left',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
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

                appSurvey_areaChart.setOption(areaOption);

            });
    }
})();