/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('userPortraitCtr', userPortraitCtr);
    function userPortraitCtr($scope, $location, ipCookie, $rootScope, $http) {

        var sexRatioChart;
        var mapChart;
        var RegionalDistributionChart;
        var AgeDistributionChart;

        $scope.PeopleSum = 0;
        $scope.legendArray = [];
        $scope.DataArray = [];


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


                var option1 = {
                    title: {
                        text: '性别比例',

                    },
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
                                    value: 41.5, name: '女',
                                },
                                {
                                    value: 57.39, name: '男',
                                },
                                {
                                    value: 1.11, name: '未知',

                                }

                            ],
                        }
                    ]
                };

                var option = {
                    title: {
                        text: '地域分布'
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',

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
                    for (var i = 0, l = option.series[0].data.length; i < l; i++) {
                        name = option.series[0].data[i].name;
                        option.series[0].data[i].selected = selected[name];
                        if (selected[name]) {
                            selectedProvince = name;
                        }
                    }
                    if (typeof selectedProvince == 'undefined') {
                        option.series.splice(1);
                        option.legend = null;
                        option.dataRange = null;
                        mapChart.setOption(option, true);
                        return;
                    }

                    option.series[1] = {
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

                    option.dataRange = {
                        orient: 'horizontal',
                        x: 'right',
                        min: 0,
                        max: 1000,
                        color: ['#9CD9AF', '#229342'],
                        text: ['低', '高'],           // 文本，默认为数值文本
                        splitNumber: 0
                    };
                    mapChart.setOption(option, true);
                })
                mapChart.setOption(option);


                var option2 = {
                    title: {
                        text: 'Top10 地域分布',

                    },
                    tooltip: {
                        show: true,
                        trigger: "item",

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
                            data: ["湖北", "浙江", "北京", "重庆", "河北", "山东", "四川", "河南", "江苏", "广东"],
                            splitLine: false,
                            axisLine: false,
                            axisTick: {
                                show: false
                            },

                        }
                    ],
                    series: [
                        {
                            "name": "活跃用户数",
                            "type": "bar",
                            "data": [667, 724, 758, 810, 888, 1134, 1169, 1263, 1299, 2298],
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

                                            label = ((params.value / $scope.regionPeopleSum) * 100).toFixed(2)

                                            return label + '%';
                                        }
                                    }
                                },
                                emphasis: {}
                            },


                        }
                    ]
                };
                var option3 = {
                    title: {
                        text: '年龄分布',

                    },
                    tooltip: {
                        show: false,

                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ["0-17岁", "18-24岁", "25-29岁", "30-34岁", "35-39岁", "40岁以上"],
                            splitLine: false,
                            axisLine: false,
                            axisTick: {
                                show: false
                            },

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            data: ['19.69', '39.85'],
                            splitNumber: 16,
                            axisLine: false,
                            splitLine: false,
                            axisLabel: {
                                show: false
                            },

                        }
                    ],
                    series: [

                        {
                            type: 'bar',
                            data: ['19.69', '39.85', '20.61', '8.84', '4.88', '6.13'],
                            barCategoryGap: '30',
                            borderWidth: 0,
                            itemStyle: {
                                normal: {
                                    color: '#3AD2DC',//颜色

                                },
                                emphasis: {
                                    color: '#5ED07E',//颜色
                                    label: {
                                        show: true,
                                        formatter: function (params, ticket, callback) {
                                            var label;

                                            label = ((params.value / $scope.AgePeopleSum) * 100).toFixed(2)

                                            return label + '%';
                                        }


                                    }
                                }
                            }
                        }

                    ]

                };


                // 为echarts对象加载数据
                sexRatioChart.setOption(option1);
                RegionalDistributionChart.setOption(option2);
                AgeDistributionChart.setOption(option3)

                //动态加载数据
                $scope.getSexAnalysisChartData();
                $scope.getAgeAnalysisData();
                $scope.getRegionAnalysisData();
                $scope.getProfessionAnalysisData();
                $scope.getEducationData();

            }
        );

        //性别分析数据

        $scope.getSexAnalysisChartData = function () {

            var options = sexRatioChart.getOption();

            $http.get("http://localhost:3000/api/sexAnalysis?time=2016-01-11,2016-01-08")
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


                    options.legend.data = $scope.legendArray;
                    options.series[0].data[0].value = Girl;
                    options.series[0].data[1].value = unknown;
                    options.series[0].data[2].value = male;

                    sexRatioChart.setOption(options);


                });
        }


        //年龄分布分析数据

        $scope.AgeDistributionArray = [];
        $scope.AgeDistributionData = [];
        $scope.AgePeopleSum = 0;

        $scope.getAgeAnalysisData = function () {
            var options = AgeDistributionChart.getOption();
            $http.get("http://localhost:3000/api/ageAnalysis?time=2016-01-11,2016-01-08")
                .success(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        $scope.AgePeopleSum += response[i].age_count;
                        $scope.AgeDistributionArray.push(response[i].key);
                        $scope.AgeDistributionData.push(response[i].age_count);
                    }

                    options.xAxis[0].data = $scope.AgeDistributionArray;
                    options.series[0].data = $scope.AgeDistributionData;

                    AgeDistributionChart.setOption(options)
                });

        }

        //TOP10地域分布分析数据

        $scope.regionDataArray = [];
        $scope.regionCityArray = [];
        $scope.regionPeopleSum = 0;

        $scope.getRegionAnalysisData = function () {
            var options = RegionalDistributionChart.getOption();

            $http.get("http://localhost:3000/api/regionAnalysis?time=2016-01-11,2016-01-08")
                .success(function (response) {

                    for (var i = 0; i < response.length; i++) {
                        $scope.regionCityArray.push(response[i].key);
                        $scope.regionDataArray.push(response[i].region_count);
                        $scope.regionPeopleSum += response[i].region_count;
                    }
                    options.yAxis[0].data = $scope.regionCityArray;
                    options.series[0].data = $scope.regionDataArray;
                    RegionalDistributionChart.setOption(options);

                });

        }

        //职业分布数据
        $scope.ProfessionDataArray = [];
        $scope.ProfessionPeopleSum = 0;

        $scope.getProfessionAnalysisData = function () {

            $http.get("http://localhost:3000/api/professionAnalysis?time=2016-01-11,2016-01-08")
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
                    $scope.ProfessionDataArray = response

                    for (var k = 0; k < $scope.ProfessionDataArray.length; k++) {

                        $scope.ProfessionPeopleSum += $scope.ProfessionDataArray[k].pro_count;
                    }



                });

        }

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
        //学历分布
        $scope.EducationPeopleSum=0;
        $scope.EducationDataArray=[];
        $scope.getEducationData=function(){
            $http.get(" http://localhost:3000/api/eduAnalysis?time=2016-01-11,2016-01-08")
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
                    $scope.EducationDataArray=response;
                    console.log($scope.EducationDataArray);

                    for(var k=0;k<$scope.EducationDataArray.length;k++){
                        $scope.EducationPeopleSum+=response[k].edu_count;
                    }
                    console.log($scope.EducationPeopleSum);


                });

        }
        $scope.show=function(id){
            document.getElementById(id).style.display='block'
        }
        $scope.hide=function(id){
            document.getElementById(id).style.display='none'
        }


        //地图分布分析数据
        $scope.datas = [];


    }
})();

