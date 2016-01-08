(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('usingTimeLengthCtr', usingTimeLengthCtr);
    function usingTimeLengthCtr($scope, $location, ipCookie, $rootScope) {

        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                var usingTimeLengthChart = ec.init(document.getElementById('usingTimeLengthChart'));

                var option={

                    title: {
                        text: '人均使用时长',
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
                        },
                        formatter:'{b}<br>{a}    0:00:{c}',
                        backgroundColor:'white',
                        borderColor:'black',
                        borderWidth:1,
                        borderRadius:0,
                        textStyle:{
                            color:'black'
                        }

                    },
                    calculable: true,
                    xAxis:[
                        {
                            type: 'category',
                            data:['2015-12-25','2015-12-26','2015-12-27','2015-12-28','2015-12-29','2015-12-30','2015-12-31','2016-01-01','2016-01-02','2016-01-03','2016-01-04','2016-01-05','2016-01-06','2016-01-07'],
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
                            splitNumber: 3,
                            axisLabel:{
                                formatter: function(value){

                                    var h = Math.floor(value / 60 / 60);
                                    var m = value % (60*60);
                                    var s = value % (60);
                                    if (h.toString().length < 2) h = '0' + h.toString();
                                    if (m.toString().length < 2) m = '0' + m.toString();
                                    if(s.toString().length < 2) s = '0' + s.toString();
                                    return h + ':' + m + ':' + s;
                                },
                            }


                        }
                    ],
                    series:[
                        {
                            name: '人均使用时长',
                            type: 'line',
                            symbol: 'none',
                            data: [44, 42, 44, 47, 43, 39, 39, 39, 41, 43, 42,42, 40,41],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#3389D4',
                                        width: 2
                                    },

                                },
                                emphasis: {}
                            },
                        }
                    ]


                }

                usingTimeLengthChart.setOption(option);
            })

    }

})();
