/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('accessPageCtr', accessPageCtr);
    function accessPageCtr($scope, $location, ipCookie, $rootScope) {

        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
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
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表}
                var TrendChart = ec.init(document.getElementById('TrendChart'));
                var option = {
                    title: {
                        text: '人均访问页面数',
                        x: 'center',

                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: '#78C354',
                                width: 2,
                                type: 'dotted'
                            },
                        }
                    }
                    ,
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['2015-12-24',
                                {
                                    value: '2015-12-25',

                                },
                                '2015-12-26',
                                {
                                    value: '2015-12-27',

                                },
                                '2015-12-28',
                                {
                                    value: '2015-12-29',

                                },
                                '2015-12-30',
                                {
                                    value: '2015-12-31',
                                    label: {
                                        show: false
                                    }
                                }, '2016-01-01',
                                {
                                    value: '2016-01-02',
                                    label: {
                                        show: false
                                    }
                                }, '2016-01-03',

                                {
                                    value: '2016-01-04',
                                    label: {
                                        show: false
                                    }
                                }, '2016-01-05',
                                {
                                    value: '2016-01-06',
                                    label: {
                                        show: false
                                    }
                                },],
                            splitLine: false,
                            axisLabel: {
                                //X轴刻度配置
                                interval: 1,//0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数

                                textStyle: {
                                    align: 'left',

                                }
                            },

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: false,

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
                                    },

                                },
                                emphasis: {}
                            },
                            data: [2.02, 1.88, 1.89, 1.99, 1.96, 1.83, 1.79, 1.80, 1.80, 1.89, 1.97, 1.97, 0.00, 0.00]
                        }

                    ]
                };

                TrendChart.setOption(option);

            });
        $scope.changeActive = function (type, id, number) {
            for (var i = 0; i < number; i++) {
                document.getElementById("page_btn_" + type + "_" + i).setAttribute("class", "btn btn-default");
            }
            document.getElementById(id).setAttribute("class", "btn btn-default active");
        };
        $scope.chooseVersion_page = function (av, id) {
            $scope.changeActive("av", id, 7);
        };
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
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
            //$scope.chooseCM($scope.templateCh, time, $scope.templateVersion.av);
        }, false);

    }

})();
