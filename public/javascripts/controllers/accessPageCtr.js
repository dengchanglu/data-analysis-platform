/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('accessPageCtr', accessPageCtr);
    function accessPageCtr($scope, $location, ipCookie, $rootScope, $http, URL) {

        $scope.templateAV = "all";
        $scope.isGetDataTermsTime = true;
        $scope.templateForm_page = {
            time: [],
            data: {
                avg_page_userCount: [],
                avg_time_userCount: []
            }
        };
        $scope.templateTable = [];

        $scope.date = {
            startDate: moment().subtract(2, "days"),
            endDate: moment().subtract(1, "days")
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
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };
        var pageView;
        var option;
        $scope.getPageViewData = function (time, av) {
            $scope.templateForm_page = {
                time: [],
                data: {
                    avg_page_userCount: [],
                    avg_time_userCount: []
                }
            };
            $scope.templateTable = [];
            if (pageView == undefined) {
                return;
            }
            pageView.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });
            if (time == null) {
                var date1 = new Date($scope.formatTime($scope.date.startDate));  //开始时间
                var date2 = new Date($scope.formatTime($scope.date.endDate));    //结束时间
                var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
                //计算出相差天数
                var days = Math.floor(date3 / (24 * 3600 * 1000));
                time = "";
                for (var i = 0; i < days; i++) {
                    var dataTem = new Date(date1.getTime() + i * (24 * 3600 * 1000));
                    time += $scope.formatTime(dataTem) + ",";
                }
                time += $scope.formatTime($scope.date.endDate);
            }
            $http.get(URL + "pageViewsAnalysis?time=" + time + "&av=" + av).success(function (data) {
                pageView.hideLoading();
                console.log(data);
                var i = 0;
                for (i = 0; i < data.dataForm.length; i++) {
                    $scope.templateForm_page.time.push(data.dataForm[i].time);
                    $scope.templateForm_page.data.avg_page_userCount.push(data.dataForm[i].avg_page_userCount);
                    $scope.templateForm_page.data.avg_time_userCount.push(data.dataForm[i].avg_time_userCount);
                }
                if ($scope.isGetDataTermsTime) {
                    option.series[0].data = $scope.templateForm_page.data.avg_page_userCount;
                    option.xAxis[0].data = $scope.templateForm_page.time;
                } else {
                    option.series[0].data = $scope.templateForm_page.data.avg_time_userCount;
                    option.xAxis[0].data = $scope.templateForm_page.time;
                }
                //for (i = 0; i < data.dataTable.length; i++) {

                //$apply(function () {
                    $scope.templateTable = data.dataTable;
                //});
                //}
                pageView.setOption(option);
            }).error(function (data, status, headers, config) {
                pageView.hideLoading();
                pageView.showLoading({
                    text: "暂无数据",
                    effect: "whirling",
                    textStyle: {
                        fontSize: 20
                    }
                });
            });
        };
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表}
                pageView = ec.init(document.getElementById('pageView'));
                option = {
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    title: {
                        text: '人均访问页面数',
                        x: 'center'

                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: '#78C354',
                                width: 2,
                                type: 'dotted'
                            }
                        }
                    }
                    ,
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            splitLine: false,
                            axisLabel: {
                                //X轴刻度配置
                                interval: 1,//0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数

                                textStyle: {
                                    align: 'left'

                                }
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: false

                        }
                    ],
                    series: [
                        {
                            name: '人均访问页面数',
                            type: 'line',
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        // 区域图，纵向渐变填充
                                        color: (function () {
                                            var zrColor = require('zrender/tool/color');
                                            return zrColor.getLinearGradient(
                                                0, 200, 0, 400,
                                                [[0, 'rgba(239,245,253,0.5)'], [1, 'rgba(255,255,255,0.5)']]
                                            )
                                        })()
                                    },
                                    lineStyle: {
                                        color: '#3389D4',
                                        width: 3
                                    }

                                },
                                emphasis: {}
                            },
                            data: []
                        }

                    ]
                };

                pageView.setOption(option);
                $scope.getPageViewData(null, $scope.templateAV);
            });
        $scope.changeActive = function (type, id, number) {
            for (var i = 0; i < number; i++) {
                document.getElementById("page_btn_" + type + "_" + i).setAttribute("class", "btn btn-default");
            }
            document.getElementById(id).setAttribute("class", "btn btn-default active");
        };
        $scope.chooseVersion_page = function (av, id) {
            $scope.changeActive("av", id, 7);
            $scope.templateAV = av;
            $scope.getPageViewData(null, av);
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
            $scope.getPageViewData(time, $scope.templateAV);
        }, false);
        $scope.triggerKey = function (index) {
            //$scope.$apply(function(){
            //    $scope.templateTable = [];
            //});
            if (index == 0) {
                document.getElementById("key_page_0").setAttribute("class", "first current");
                document.getElementById("key_page_1").setAttribute("class", "last");
                $scope.isGetDataTermsTime = true;
                option.series[0].data = $scope.templateForm_page.data.avg_page_userCount;
                option.xAxis[0].data = $scope.templateForm_page.time;
            } else {
                document.getElementById("key_page_1").setAttribute("class", "last current");
                document.getElementById("key_page_0").setAttribute("class", "first");
                $scope.isGetDataTermsTime = false;
                option.series[0].data = $scope.templateForm_page.data.avg_time_userCount;
                option.xAxis[0].data = $scope.templateForm_page.time;
            }
            pageView.setOption(option);
        };

    }

})();
