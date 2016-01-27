/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('userPortraitCtr', userPortraitCtr);
    function userPortraitCtr($scope, $location, ipCookie, $rootScope, $http) {


        //时间控件设置默认时间方法
        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };
        $scope.data = {
            dateTime: [],
            series: []
        };

        //时间格式化方法
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };

        $scope.time = $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate);


        //性别分析数据

        var sexRatioChart;
        var sexOption;
        $scope.getSexAnalysisChartData = function (time) {

            $scope.PeopleSum = 0;
            $scope.legendArray = [];
            $scope.DataArray = [];


            $http.get("http://localhost:3000/api/sexAnalysis?time=" + time)
                .success(function (response) {

                    for (var i = 0; i < 3; i++) {
                        $scope.PeopleSum += response[i].sex_count;
                        $scope.legendArray.push(response[i].key);
                    }

                    var Girl = ((response[0].sex_count / $scope.PeopleSum) * 100).toFixed(2);
                    var unknown = ((response[1].sex_count / $scope.PeopleSum) * 100).toFixed(2);
                    var male = ((response[2].sex_count / $scope.PeopleSum) * 100).toFixed(2);

                    $scope.DataArray.push(Girl);
                    $scope.DataArray.push(unknown);
                    $scope.DataArray.push(male);


                    sexOption.legend.data = $scope.legendArray;
                    sexOption.series[0].data[0].value = Girl;
                    sexOption.series[0].data[1].value = unknown;
                    sexOption.series[0].data[2].value = male;

                    sexRatioChart.setOption(sexOption);


                })
                .error(function (data, header, config, status) {
                    //处理响应失败
                });
        };


        //年龄分布分析数据
        var AgeDistributionChart;
        var ageOption;
        $scope.getAgeAnalysisData = function (time) {

            AgeDistributionChart.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });

            $scope.AgeDistributionArray = [];
            $scope.AgeDistributionData = [];
            $scope.AgePeopleSum = 0;

            $http.get("http://localhost:3000/api/ageAnalysis?time=" + time)
                .success(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        $scope.AgePeopleSum += response[i].age_count;
                        $scope.AgeDistributionArray.push(response[i].key);
                        $scope.AgeDistributionData.push(response[i].age_count);
                    }

                    if ($scope.AgeDistributionArray == [] || $scope.AgeDistributionData == []) {
                        AgeDistributionChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        AgeDistributionChart.hideLoading();
                    }
                    ageOption.xAxis[0].data = $scope.AgeDistributionArray;
                    ageOption.series[0].data = $scope.AgeDistributionData;

                    AgeDistributionChart.setOption(ageOption)


                })
                .error(function (data, header, config, status) {
                    console.log('响应失败')
                    //处理响应失败
                    AgeDistributionChart.hideLoading();
                    AgeDistributionChart.showLoading({
                        text: "暂无数据",
                        effect: "whirling",
                        textStyle: {
                            fontSize: 20
                        }
                    });

                });

        };

        //TOP10地域分布分析数据
        var RegionalDistributionChart;
        var regionalOption;
        $scope.getRegionAnalysisData = function (time) {

            RegionalDistributionChart.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });

            $scope.regionDataArray = [];
            $scope.regionCityArray = [];
            $scope.regionPeopleSum = 0;
            $scope.dataArray = [];


            $http.get("http://localhost:3000/api/regionAnalysis?time=" + time)
                .success(function (response) {

                    var i = 0,
                        len = response.length,
                        j, d;
                    for (; i < len; i++) {

                        for (j = 0; j < len; j++) {
                            if (response[i].region_count < response[j].region_count) {
                                d = response[j];
                                response[j] = response[i];
                                response[i] = d;
                            }
                        }

                    }
                    $scope.dataArray = response;

                    for (var i = 0; i < 10; i++) {
                        $scope.regionCityArray.push($scope.dataArray[i].key);
                        $scope.regionDataArray.push($scope.dataArray[i].region_count);
                        $scope.regionPeopleSum += $scope.dataArray[i].region_count;
                    }

                    if ($scope.regionCityArray == [] || $scope.regionDataArray == []) {
                        RegionalDistributionChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        RegionalDistributionChart.hideLoading();
                    }
                    regionalOption.yAxis[0].data = $scope.regionCityArray;
                    regionalOption.series[0].data = $scope.regionDataArray;
                    RegionalDistributionChart.setOption(regionalOption);

                })
                .error(function (data, header, config, status) {
                    console.log('响应失败')
                    //处理响应失败
                    RegionalDistributionChart.hideLoading();
                    RegionalDistributionChart.showLoading({
                        text: "暂无数据",
                        effect: "whirling",
                        textStyle: {
                            fontSize: 20
                        }
                    });

                });

        };


        //职业分布数据
        $scope.getProfessionAnalysisData = function (time) {
            $scope.ProfessionDataArray = [];
            $scope.ProfessionPeopleSum = 0;

            $http.get("http://localhost:3000/api/professionAnalysis?time=" + time)
                .success(function (response) {
                    var i = 0,
                        len = response.length,
                        j, d;
                    for (; i < len; i++) {

                        for (j = 0; j < len; j++) {
                            if (response[i].pro_count > response[j].pro_count) {
                                d = response[j];
                                response[j] = response[i];
                                response[i] = d;
                            }
                        }

                    }
                    $scope.ProfessionDataArray = response;

                    for (var k = 0; k < $scope.ProfessionDataArray.length; k++) {

                        $scope.ProfessionPeopleSum += $scope.ProfessionDataArray[k].pro_count;
                    }


                })
                .error(function (data, header, config, status) {
                    //处理响应失败
                    
                });


        };


        //学历分布
        $scope.getEducationData = function (time) {

            $scope.EducationPeopleSum = 0;
            $scope.EducationDataArray = [];

            $http.get(" http://localhost:3000/api/eduAnalysis?time=" + time)
                .success(function (response) {


                    var i = 0,
                        len = response.length,
                        j, d;
                    for (; i < len; i++) {

                        for (j = 0; j < len; j++) {
                            if (response[i].edu_count > response[j].edu_count) {
                                d = response[j];
                                response[j] = response[i];
                                response[i] = d;
                            }
                        }

                    }
                    $scope.EducationDataArray = response;

                    for (var k = 0; k < $scope.EducationDataArray.length; k++) {
                        $scope.EducationPeopleSum += response[k].edu_count;
                    }


                });

        };
        $scope.show = function (id) {
            document.getElementById(id).style.display = 'block'
        };
        $scope.hide = function (id) {
            document.getElementById(id).style.display = 'none'
        };

        //时间控件设置
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
        //Watch for date changes时间改变后调用的方法
        $scope.$watch('date', function (newDate) {
            $scope.newTime = $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate)
            if ($scope.time != $scope.newTime) {
                $scope.getSexAnalysisChartData($scope.newTime);
                $scope.getAgeAnalysisData($scope.newTime);
                $scope.getRegionAnalysisData($scope.newTime);
                $scope.getProfessionAnalysisData($scope.newTime);
                $scope.getEducationData($scope.newTime);
                $scope.getMapDistributionData($scope.newTime);
            }
            //console.log($scope.date);
            //console.log('New date set: ', newDate);
        }, false);


        //地图分布分析数据
        var mapChart;
        var mapOption;

        $scope.getMapDistributionData = function (time) {
            $http.get("http://localhost:3000/api/regionAnalysis?time=" + time)
                .success(function (response) {
                    $scope.datas = [];
                    for (var i = 0; i < response.length; i++) {
                        $scope.datas.push(
                            {
                                name: '' + response[i].key + '市',
                                value: '' + response[i].region_count
                            }
                        )
                    }

                })
                .error(function (data, header, config, status) {

                    console.log('响应失败');
                    //处理响应失败
                });


        };

        //图表渲染
        require(
            [
                'echarts',
                'echarts/chart/pie',// 使用柱状图就加载bar模块，按需加载
                'echarts/chart/map',
                'echarts/chart/bar'
            ],
            function (ec) {

                // 基于准备好的dom，初始化echarts图表
                sexRatioChart = ec.init(document.getElementById('sexRatioChart'));
                mapChart = ec.init(document.getElementById('mapChart'));
                RegionalDistributionChart = ec.init(document.getElementById('RegionalDistributionChart'));
                AgeDistributionChart = ec.init(document.getElementById('AgeDistributionChart'));


                sexOption = {

                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: " <br/>{b} :{d}%"

                    },
                    color: ['#5D9CEC', '#FF706E', '#7BE198'],
                    legend: {
                        y: 'bottom',
                        data: ['女', '未知', '男']
                    },

                    series: [
                        {
                            "type": "pie",
                            radius: ['40%'],
                            data: [
                                {
                                    value: 41.5, name: '女'
                                },
                                {
                                    value: 57.39, name: '男'
                                },
                                {
                                    value: 1.11, name: '未知'

                                }

                            ]
                        }
                    ]
                };

                mapOption = {

                    tooltip: {
                        show: true,
                        trigger: 'item'

                    },
                    series: [
                        {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}'
                            },
                            name: '选择器',
                            type: 'map',
                            mapType: 'china',
                            mapLocation: {
                                x: 'left',
                                y: 'top',
                                width: '50%'
                            },
                            roam: false,
                            selectedMode: 'single',

                            itemStyle: {
                                normal: {},
                                emphasis: {
                                    color: '#5ED07E',
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: [
                                {name: '北京', selected: false},
                                {name: '天津', selected: false},
                                {name: '上海', selected: false},
                                {name: '重庆', selected: false},
                                {name: '河北', selected: false},
                                {name: '河南', selected: false},
                                {name: '云南', selected: false},
                                {name: '辽宁', selected: false},
                                {name: '黑龙江', selected: false},
                                {name: '湖南', selected: false},
                                {name: '安徽', selected: false},
                                {name: '山东', selected: false},
                                {name: '新疆', selected: false},
                                {name: '江苏', selected: false},
                                {name: '浙江', selected: false},
                                {name: '江西', selected: false},
                                {name: '湖北', selected: false},
                                {name: '广西', selected: false},
                                {name: '甘肃', selected: false},
                                {name: '山西', selected: false},
                                {name: '内蒙古', selected: false},
                                {name: '陕西', selected: false},
                                {name: '吉林', selected: false},
                                {name: '福建', selected: false},
                                {name: '贵州', selected: false},
                                {name: '广东', selected: false},
                                {name: '青海', selected: false},
                                {name: '西藏', selected: false},
                                {name: '四川', selected: true},
                                {name: '宁夏', selected: false},
                                {name: '海南', selected: false},
                                {name: '台湾', selected: false},
                                {name: '香港', selected: false},
                                {name: '澳门', selected: false}
                            ]
                        }
                    ],
                    animation: false

                };
                var ecConfig = require('echarts/config');
                mapChart.on(ecConfig.EVENT.MAP_SELECTED, function (param) {


                    var selected = param.selected;
                    var selectedProvince;
                    var name;
                    for (var i = 0, l = mapOption.series[0].data.length; i < l; i++) {
                        name = mapOption.series[0].data[i].name;
                        mapOption.series[0].data[i].selected = selected[name];
                        if (selected[name]) {
                            selectedProvince = name;
                        }
                    }
                    if (typeof selectedProvince == 'undefined') {
                        mapOption.series.splice(1);
                        mapOption.legend = null;
                        mapOption.dataRange = null;
                        mapChart.setOption(mapOption, true);
                        return;
                    }

                    mapOption.series[1] = {
                        name: '城市',
                        type: 'map',
                        mapType: selectedProvince,
                        itemStyle: {
                            normal: {label: {show: true}},
                            emphasis: {
                                color: '#5D9CEC',
                                label: {
                                    show: true
                                }
                            }
                        },
                        mapLocation: {
                            x: '55%'
                        },
                        roam: true,
                        data: $scope.datas
                    };

                    mapOption.dataRange = {
                        orient: 'horizontal',
                        x: 'right',
                        min: 0,
                        max: 1000,
                        color: ['#9CD9AF', '#229342'],
                        text: ['低', '高'],           // 文本，默认为数值文本
                        splitNumber: 0
                    };
                    mapChart.setOption(mapOption, true);
                });
                mapChart.setOption(mapOption);


                regionalOption = {

                    tooltip: {
                        show: true,
                        trigger: "item"

                    },
                    xAxis: [
                        {
                            type: 'value',
                            splitNumber: 16,
                            axisLine: false,
                            splitLine: false,
                            axisLabel: {
                                show: false
                            },
                            show: false


                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: $scope.regionCityArray,
                            splitLine: false,
                            axisLine: false,
                            axisTick: {
                                show: false
                            }

                        }
                    ],
                    series: [
                        {
                            "name": "活跃用户数",
                            "type": "bar",
                            "data":  $scope.regionDataArray,
                            barCategoryGap: '15',
                            borderWidth: 0,
                            itemStyle: {
                                normal: {
                                    color: '#5ED07E',//颜色
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: 'black'
                                        },
                                        color: 'black',
                                        formatter: function (params, ticket, callback) {
                                            var label;
                                            if($scope.regionPeopleSum==undefined){

                                                label='数据加载中';

                                                return label;
                                            }else{
                                                label = ((params.value / $scope.regionPeopleSum) * 100).toFixed(2);

                                                return label + '%';
                                            }

                                        }
                                    }
                                },
                                emphasis: {}
                            }


                        }
                    ]
                };

                ageOption = {

                    tooltip: {
                        show: false

                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: $scope.AgeDistributionArray,
                            splitLine: false,
                            axisLine: false,
                            axisTick: {
                                show: false
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            data: ['1.0', '1.0'],
                            splitNumber: 16,
                            axisLine: false,
                            splitLine: false,
                            axisLabel: {
                                show: false
                            }

                        }
                    ],
                    series: [

                        {
                            type: 'bar',
                            data: $scope.AgeDistributionData,
                            barCategoryGap: '30',
                            borderWidth: 0,
                            itemStyle: {
                                normal: {
                                    color: '#3AD2DC'//颜色

                                },
                                emphasis: {
                                    color: '#5ED07E',//颜色
                                    label: {
                                        show: true,
                                        formatter: function (params, ticket, callback) {
                                            var label;

                                            if($scope.AgePeopleSum==undefined){
                                                label='暂无数据'
                                                return label;
                                            }
                                            else{
                                                label = ((params.value / $scope.AgePeopleSum) * 100).toFixed(2);

                                                return label + '%';
                                            }

                                        }


                                    }
                                }
                            }
                        }

                    ]

                };


                // 为echarts对象加载数据
                sexRatioChart.setOption(sexOption);
                RegionalDistributionChart.setOption(regionalOption);
                AgeDistributionChart.setOption(ageOption);

                //动态加载数据
                $scope.getSexAnalysisChartData($scope.time);
                $scope.getAgeAnalysisData($scope.time);
                $scope.getRegionAnalysisData($scope.time);
                $scope.getProfessionAnalysisData($scope.time);
                $scope.getEducationData($scope.time);
                $scope.getMapDistributionData($scope.time);

            }
        );
        //数组排序的方法
        $scope.ArraySorting = function (array) {
            var i = 0,
                len = array.length,
                j, d;
            for (; i < len; i++) {
                for (j = 0; j < len; j++) {
                    if (array[i] > array[j]) {
                        d = array[j];
                        array[j] = array[i];
                        array[i] = d;
                    }
                }
            }
            return array;
        }


    }
})();

