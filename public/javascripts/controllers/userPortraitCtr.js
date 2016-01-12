/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('userPortraitCtr', userPortraitCtr);
    function userPortraitCtr($scope, $location, ipCookie, $rootScope) {


        $scope.showEm=function(){

            document.getElementById("em1").style.display="block"
            document.getElementById("i_education0").style.height="60px"

        }
        require(
            [
                'echarts',
                'echarts/chart/pie' ,// 使用柱状图就加载bar模块，按需加载
                'echarts/chart/map',
                'echarts/chart/bar'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('sexRatioChart'));
                var myChart1 = ec.init(document.getElementById('mapChart'));
                var RegionalDistributionChart = ec.init(document.getElementById('RegionalDistributionChart'));
                var AgeDistributionChart= ec.init(document.getElementById('AgeDistributionChart'));

                var option = {
                    title: {
                        text: '性别比例',

                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: " <br/>{b} :{d}%"

                    },
                    legend: {
                        y : 'bottom',
                        data:['未知','男','女']
                    },

                    series: [
                        {
                            "type": "pie",
                            radius : ['40%'],
                            data:[
                                {value:57.39, name:'男',
                                    itemStyle: {
                                        normal: {
                                            color:'#7BE198'

                                        },
                                        emphasis: {}
                                    },
                                },
                                {value:41.5, name:'女',
                                    itemStyle: {
                                        normal: {
                                            color:'#FF706E'

                                        },
                                        emphasis: {}
                                    },},
                                {value:1.11, name:'未知',
                                    itemStyle: {
                                        normal: {
                                            color:'#5D9CEC'
                                        },
                                        emphasis: {}
                                    },},

                            ],
                        }
                    ]
                };

                var option1={
                    title:{
                        text:'地域分布'
                    },
                    tooltip : {
                        show:true,
                        trigger: 'item',

                    },

                    dataRange: {
                        min: 3,
                        max: 1861,
                        y: 'bottom',
                        x:'center',
                        calculable : true,
                        color:['#229342','#9CD9AF'],
                        orient:'horizontal',
                        itemHeight:5,
                        itemWidth:20,
                        splitNumber:4,

                    },
                    series : [
                        {
                            name:'城市',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle:{
                                normal:{},
                                emphasis:{color:'#5D9CEC'}
                            },
                            data:[
                                {name: '北京',value: 620},
                                {name: '天津',value: 195},
                                {name: '上海',value: 472},
                                {name: '重庆',value: 691},
                                {name: '河北',value: 745},
                                {name: '河南',value:1045},
                                {name: '云南',value: 360},
                                {name: '辽宁',value: 468},
                                {name: '黑龙江',value: 327},
                                {name: '湖南',value: 464},
                                {name: '安徽',value: 482},
                                {name: '山东',value: 967},
                                {name: '新疆',value: 192},
                                {name: '江苏',value: 1100},
                                {name: '浙江',value: 615},
                                {name: '江西',value: 383},
                                {name: '湖北',value: 547},
                                {name: '广西',value: 379},
                                {name: '甘肃',value: 209},
                                {name: '山西',value: 330},
                                {name: '内蒙古',value: 203},
                                {name: '陕西',value: 547},
                                {name: '吉林',value: 237},
                                {name: '福建',value: 442},
                                {name: '贵州',value: 469},
                                {name: '广东',value: 1861},
                                {name: '青海',value: 52},
                                {name: '西藏',value: 29},
                                {name: '四川',value: 992},
                                {name: '宁夏',value: 43},
                                {name: '海南',value: 87},
                                {name: '台湾',value: 3},
                                {name: '香港',value: 12},
                                {name: '澳门',value: 4}
                            ],
                        }
                    ]
                };

                var option2={
                    title: {
                        text: 'Top10 地域分布',

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
                            splitLine: false,
                            axisLabel:{
                                show:false
                            },
                            show:false



                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ["湖北", "浙江", "北京", "重庆", "河北", "山东", "四川", "河南", "江苏", "广东"],
                            splitLine: false,
                            axisLine: false,
                            axisTick:{
                                show:false
                            },

                        }
                    ],
                    series: [
                        {
                            "name": "活跃用户数",
                            "type": "bar",
                            "data": [
                                {
                                    value: 667,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '3.56%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 724,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '3.87%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 758,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '4.05%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 810,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '4.33%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 888,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '4.75%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 1134,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '6.06%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 1169,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '6.25%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 1263,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '6.75%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 1299,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '6.94%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },
                                {
                                    value: 2298,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '12.28%',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        },
                                        emphasis: {}
                                    }
                                },],

                            barCategoryGap: '15',
                            borderWidth:0,
                            itemStyle: {
                                normal: {
                                    color: '#5ED07E',//颜色

                                },
                                emphasis: {}
                            },


                        }
                    ]
                };
                var  option3={
                    title: {
                        text: '年龄分布',

                    },
                    tooltip: {
                        show: true,
                        trigger: "axis",
                        formatter:'{c}%'

                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ["0-17岁", "18-24岁", "25-29岁", "30-34岁", "35-39岁", "40岁以上"],
                            splitLine: false,
                            axisLine: false,
                            axisTick:{
                                show:false
                            },

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            data:['19.69','39.85'],
                            splitNumber: 16,
                            axisLine: false,
                            splitLine: false,
                            axisLabel:{
                                show:false
                            },

                        }
                    ],
                    series:[

                        { type:'bar',
                            data:['19.69','39.85','20.61','8.84','4.88','6.13'],
                            barCategoryGap: '30',
                            borderWidth:0,
                            itemStyle: {
                                normal: {
                                    color: '#3AD2DC',//颜色

                                },
                                emphasis: {
                                    color: '#5ED07E',//颜色
                                    label:{
                                        show:true,
                                        formatter:'{c}%'


                                    }
                                }
                            }
                        }

                    ]

                };
                // 为echarts对象加载数据
                myChart.setOption(option);
                myChart1.setOption(option1);
                RegionalDistributionChart.setOption(option2);
                AgeDistributionChart.setOption(option3)
            }
        );


    }
})();
