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
                'echarts/chart/line',//使用折线图就加载line模块，按需加载
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('channelDistribution'));

                var option = {
                    tooltip: {
                        show: true,
                        trigger: "axis"
                    },
                    legend: {
                        data:['销量','数量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},//辅助线工具
                            dataView: {show: true, readOnly: false},//数据视图,显示，可编辑
                            magicType: {show: true, type: ['line', 'bar']},//动态类型切换，显示，切换类型为柱形图和线型图
                            restore: {show: true},//还原，复位原始图表
                            saveAsImage: {show: true}//把图表保存为图片
                        }
                    },
                    calculable: true,
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
                            smooth:true,
                            "data":[5, 20, 40, 10, 10, 20],
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            itemStyle: {
                                normal: {
                                    color: '#2EC7C9',//颜色
                                    barBorderRadius: 10//,柱形图圆角值为10

                                },
                                emphasis: {
                                }
                            }
                        },
                        {
                            "name":"数量",
                            "type":"bar",
                            smooth:true,
                            "data":[5, 2, 23, 11, 3, 21],
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            itemStyle: {
                                normal: {
                                    color: '#B6A2DE',//颜色
                                    barBorderRadius: 10//,柱形图圆角值为10

                                },
                                emphasis: {
                                }
                            }
                        }
                    ]
                };

                // 为echarts对象加载数据
                myChart.setOption(option);
            }
        );
    }
})();