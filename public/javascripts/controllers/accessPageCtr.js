/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('accessPageCtr', accessPageCtr);
    function accessPageCtr($scope, $location, ipCookie, $rootScope) {


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
                        axisPointer:{
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

            })

    }

})();
