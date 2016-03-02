/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('userPortraitCtr', userPortraitCtr);
    function userPortraitCtr($scope, $location, ipCookie, $rootScope, $http, URL) {


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
        $scope.sexdDynamicData = [];
        $scope.getSexAnalysisChartData = function (time) {

            sexRatioChart.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });

            $scope.PeopleSum = 0;
            $scope.legendArray = [];
            $scope.DataArray = [];
            $scope.sexdDynamicData = [];


            $http.get(URL + "sexAnalysis?time=" + time)
                .success(function (response) {

                    $scope.legendArray = [];

                    for (var i = 0; i < response.length; i++) {
                        $scope.PeopleSum += response[i].sex_count;
                        $scope.legendArray.push(response[i].key);
                    }

                    for (var j = 0; j < response.length; j++) {

                        $scope.pre = ((response[j].sex_count / $scope.PeopleSum) * 100).toFixed(2);
                        $scope.key = response[j].key;

                        $scope.sexdDynamicData.push({
                            value: $scope.pre,
                            name: $scope.key
                        })
                    }

                    if ($scope.legendArray == [] || $scope.Girl == [] || $scope.unknown == [] || $scope.male == []) {
                        sexRatioChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        sexRatioChart.hideLoading();
                    }


                    sexOption.legend.data = $scope.legendArray;
                    sexOption.series[0].data = $scope.sexdDynamicData;
                    sexRatioChart.setOption(sexOption);


                })
                .error(function (data, header, config, status) {
                    //处理响应失败
                    sexRatioChart.hideLoading();
                    sexRatioChart.showLoading({
                        text: "暂无数据",
                        effect: "whirling",
                        textStyle: {
                            fontSize: 20
                        }
                    });
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

            $http.get(URL + "ageAnalysis?time=" + time)
                .success(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        $scope.AgePeopleSum += response[i].age_count;
                        if (response[i].key == '40-') {
                            $scope.AgeDistributionArray.push(response[i].key + '以上');
                        } else {
                            $scope.AgeDistributionArray.push(response[i].key);
                        }

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


                }).error(function (data, header, config, status) {
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


            $http.get(URL + "regionAnalysis?time=" + time)
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

            $scope.professionalDynamic = [];

            $http.get(URL + "professionAnalysis?time=" + time)
                .success(function (response) {
                    $scope.ProfessionDataArray = [];
                    $scope.ProfessionPeopleSum = 0;

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

                    for (var n = 0; n < $scope.ProfessionDataArray.length; n++) {

                        $scope.pre = (($scope.ProfessionDataArray[n].pro_count / $scope.ProfessionPeopleSum) * 100).toFixed(2);
                        $scope.radius = ((($scope.ProfessionDataArray[n].pro_count / $scope.ProfessionPeopleSum).toFixed(2)) * 500).toFixed(0);
                        $scope.key = $scope.ProfessionDataArray[n].key;
                        $scope.pro_count = $scope.ProfessionDataArray[n].pro_count;

                        $scope.professionalDynamic.push(
                            {
                                pre: $scope.pre,
                                radius: $scope.radius,
                                key: $scope.key,
                                pro_count: $scope.pro_count
                            }
                        );


                    }
                    //调用动态创建职业分布图表的方法
                    $scope.createProfessional($scope.professionalDynamic, $scope.location);

                }).error(function (data, header, config, status) {
                    //处理响应失败

                });


        };

        /* //动态创建职业分布图表的方法
         $scope.createProfessional = function (tableData) {

         var professionalHtml;

         console.log(tableData)

         professionalHtml = '<svg version="1.1" style="font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="1000" height="300">'
         + '<desc>Created with Highcharts 4.0.3</desc> <defs></defs>'
         + ' <g> <circle cx="100" cy="114" r="' + tableData[0].radius + '" fill="#5D9CEC"></circle>'
         + ' <text  x="74" y="114" style="color:#ffffff;fill:#ffffff;font-size: 14px">' + tableData[0].key + ' </text>'
         + ' <text class="showPercentage" x="75" y="132" style="color:#ffffff;fill:#ffffff;">' + tableData[0].pre + '%' + '</text> </g>'

         + ' <g> <circle cx="294" cy="200" r="' + tableData[1].radius + '" fill="#62C87F"></circle>'
         + ' <text x="268" y="200" style="color:#ffffff;fill:#ffffff;">' + tableData[1].key + '</text>'
         + ' <text  class="showPercentage" x="270" y="218" style="color:#ffffff;fill:#ffffff;">' + tableData[1].pre + '%' + '</text> </g>'

         + ' <g> <circle cx="780" cy="80" r="' + tableData[2].radius + '" fill="#F15755"></circle>'
         + ' <text x="754" y="80" style="color:#ffffff;fill:#ffffff;">' + tableData[2].key + ' </text>'
         + ' <text class="showPercentage" x="757" y="98" style=";color:#ffffff;fill:#ffffff;"> ' + tableData[2].pre + '%' + '</text> </g>'

         + ' <g> <circle cx="862" cy="223" r="' + tableData[3].radius + '" fill="#FC863F"></circle>'
         + '<text x="836" y="223" style="color:#ffffff;;fill:#ffffff;"> ' + tableData[3].key + '</text>'
         + ' <text class="showPercentage" x="840" y="241" style="color:#ffffff;fill:#ffffff;"> ' + tableData[3].pre + '%' + '</text> </g>'

         + ' <g> <circle cx="524" cy="226" r="' + tableData[4].radius + '" fill="#7053B6"></circle>'
         + '<text x="498" y="226" style="color:#ffffff;fill:#ffffff;">' + tableData[4].key + ' </text>'
         + ' <text class="showPercentage" x="500" y="244" style="color:#ffffff;fill:#ffffff;">' + tableData[4].pre + '%' + ' </text> </g>'

         + ' <g> <circle cx="673" cy="234" r="' + tableData[5].radius + '" fill="#FFCE55"></circle>'
         + '<text x="647" y="234" style="color:#ffffff;fill:#ffffff;"> ' + tableData[5].key + '</text>'
         + ' <text class="showPercentage" x="652" y="252" style="color:#ffffff;fill:#ffffff;"> ' + tableData[5].pre + '%' + ' </text> </g>'

         + '<g> <circle cx="477" cy="73" r="' + tableData[6].radius + '" fill="#6ED5E6"></circle>'
         + ' <text x="451" y="73" style="color:#ffffff;fill:#ffffff;">' + tableData[6].key + ' </text>'
         + ' <text class="showPercentage" x="459" y="91" style="color:#ffffff;fill:#ffffff;">' + tableData[6].pre + '%' + ' </text> </g>'

         + ' <g> <circle cx="286" cy="50" r="' + tableData[7].radius + '" fill="#F57BC1"></circle>'
         + ' <text x="267" y="43" style="color:#ffffff;fill:#ffffff;"> ' + tableData[7].key + '</text>'
         + '  <text class="showPercentage" x="268" y="61" style="color:#ffffff;fill:#ffffff;"> ' + tableData[7].pre + '%' + '</text> </g>'

         + '<g> <circle cx="608" cy="111" r="' + tableData[8].radius + '" fill="#DCB186"></circle>'
         + '<text x="582" y="111" style="color:#ffffff;fill:#ffffff;">' + tableData[8].key + ' </text>'
         + '<text class="showPercentage" x="590" y="129" style="color:#ffffff;fill:#ffffff;"> ' + tableData[8].pre + '%' + '</text> </g>'

         + ' <g> <circle cx="925" cy="63" r="' + tableData[9].radius + '" fill="#647C9D"></circle>'
         + ' <text x="899" y="63" style="color:#ffffff;fill:#ffffff;"> ' + tableData[9].key + '</text>'
         + ' <text class="showPercentage" x="907" y="81" style="color:#ffffff;fill:#ffffff;"> ' + tableData[9].pre + '%' + '</text> </g>'

         + ' <g></g> <g></g> </svg>';
         document.getElementById("prof_chart_container").innerHTML = professionalHtml;


         };*/
        $scope.location = [
            {cx: 100, cy: 114, titleX: 74, titleY: 114, valueX: 75, valueY: 132, fillColor: '#5D9CEC'},
            {cx: 294, cy: 200, titleX: 268, titleY: 200, valueX: 270, valueY: 218, fillColor: '#62C87F'},
            {cx: 780, cy: 80, titleX: 754, titleY: 80, valueX: 757, valueY: 98, fillColor: '#F15755'},
            {cx: 862, cy: 223, titleX: 836, titleY: 223, valueX: 840, valueY: 241, fillColor: '#FC863F'},
            {cx: 524, cy: 226, titleX: 498, titleY: 226, valueX: 500, valueY: 244, fillColor: '#7053B6'},
            {cx: 673, cy: 234, titleX: 647, titleY: 234, valueX: 652, valueY: 252, fillColor: '#FFCE55'},
            {cx: 477, cy: 73, titleX: 451, titleY: 73, valueX: 459, valueY: 91, fillColor: '#6ED5E6'},
            {cx: 286, cy: 50, titleX: 267, titleY: 43, valueX: 268, valueY: 61, fillColor: '#F57BC1'},
            {cx: 608, cy: 111, titleX: 582, titleY: 111, valueX: 590, valueY: 129, fillColor: '#DCB186'},
            {cx: 925, cy: 63, titleX: 899, titleY: 63, valueX: 907, valueY: 81, fillColor: '#647C9D'}
        ];

        //动态创建职业分布图表的方法
        $scope.createProfessional = function (tableData, location) {

            var professionalHtml = '';
            professionalHtml += '<svg version="1.1" style="font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="1000" height="300">'
                + '<desc>Created with Highcharts 4.0.3</desc> <defs></defs>';

            for (var i = 0; i < tableData.length; i++) {

                professionalHtml += ' <g> <circle cx="' + location[i].cx + '" cy="' + location[i].cy + '" r="' + tableData[i].radius + '" fill="' + location[i].fillColor + '"></circle>'
                    + ' <text  x="' + location[i].titleX + '" y="' + location[i].titleY + '" style="color:#ffffff;fill:#ffffff;font-size: 14px">' + tableData[i].key + ' </text>'
                    + ' <text class="showPercentage" x="' + location[i].valueX + '" y="' + location[i].valueY + '" style="color:#ffffff;fill:#ffffff;">' + tableData[i].pre + '%' + '</text> </g>'

            }
            document.getElementById("prof_chart_container").innerHTML = professionalHtml;

        };


        //学历分布
        $scope.getEducationData = function (time) {

            $http.get(URL + "eduAnalysis?time=" + time)
                .success(function (response) {

                    $scope.EducationPeopleSum = 0;
                    $scope.EducationDataArray = [];
                    $scope.dynamicData = [];

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
                    for (var n = 0; n < $scope.EducationDataArray.length; n++) {
                        $scope.pre = (($scope.EducationDataArray[n].edu_count / $scope.EducationPeopleSum) * 100).toFixed(2);

                        $scope.edu_count = $scope.EducationDataArray[n].edu_count;
                        $scope.key = $scope.EducationDataArray[n].key;
                        $scope.width = ((($scope.EducationDataArray[n].edu_count / $scope.EducationPeopleSum).toFixed(2)) * 290).toFixed(0);

                        $scope.dynamicData.push(
                            {
                                key: $scope.key,
                                edu_count: $scope.edu_count,
                                pre: $scope.pre,
                                width: $scope.width

                            }
                        )
                    }

                    //调用动态创建学历图表的方法
                    $scope.creatEducation($scope.dynamicData);
                }).error(function (data, header, config, status) {
                    //处理响应失败
                    var EducationHtml = '';
                    EducationHtml += '<div style="text-align: center">数据加载中</div>'
                    document.getElementById("education").innerHTML = EducationHtml;
                    $scope.templatePageNumHtml = EducationHtml;


                });

        };
        //动态创建学历图表的方法
        $scope.creatEducation = function (tableData) {

            var EducationHtml = '';
            var legendHtml = '';

            for (var i = 0; i < tableData.length; i++) {

                EducationHtml += '<li><a><em id="em' + i + '">' + tableData[i].pre + '%'
                    + '</em><br>' + '<i id="i_education' + i + '" style="width:' + tableData[i].width + 'px;' + 'line-height: 20px" ng-Mouseenter="show(' + i + ')" ng-Mouseleave="hide(' + i + ')"class="i_education' + i + '"></i> </a>' + '<li>';

                legendHtml += '<p><i class="i_education' + i + '"></i>' + tableData[i].key + '</p>';
            }

            document.getElementById("education").innerHTML = EducationHtml;
            $scope.templatePageNumHtml = EducationHtml;
            document.getElementById("visitor_grade_legend").innerHTML = legendHtml;


        };

        //显示或隐藏的方法
        $scope.show = function (id) {

            var emId = 'em' + id;
            var i_educationID = 'i_education' + id;
            document.getElementById(emId).style.display = 'block';
            document.getElementById(i_educationID).style.height = 80 + 'px';


        };
        $scope.hide = function (id) {

            var emId = 'em' + id;
            var i_educationID = 'i_education' + id;
            document.getElementById(emId).style.display = 'none';
            document.getElementById(i_educationID).style.height = 60 + 'px';


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
            $scope.newTime = $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate);
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
        //直辖市数据不能设置
        $scope.getMapDistributionData = function (time) {
            $http.get(URL + "regionAnalysis?time=" + time)
                .success(function (response) {
                    mapChart.showLoading({
                        text: "数据读取中...",
                        effect: "whirling",
                        textStyle: {
                            fontSize: 20
                        }
                    });
                    $scope.datas = [];
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].key == '香港' || response[i].key == '澳门' || response[i].key == '台湾') {
                            $scope.datas.push(
                                {
                                    name: '' + response[i].key,
                                    value: '' + response[i].region_count
                                }
                            )
                        } else {
                            $scope.datas.push(
                                {
                                    name: '' + response[i].key + '市',
                                    value: '' + response[i].region_count
                                }
                            )
                        }
                    }
                    if ($scope.datas == []) {
                        mapChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        mapChart.hideLoading();
                    }
                })
                .error(function (data, header, config, status) {
                    //处理响应失败
                    mapChart.hideLoading();
                    mapChart.showLoading({
                        text: "暂无数据",
                        effect: "whirling",
                        textStyle: {
                            fontSize: 20
                        }
                    });
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

                $scope.legendData = [];

                sexOption = {
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
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: " <br/>{b} :{d}%"

                    },
                    color: ['#62C87F', '#5D9CEC', '#F15755'],
                    legend: {
                        y: 'bottom',
                        data: $scope.legendData
                    },

                    series: [
                        {
                            "type": "pie",
                            radius: ['40%'],
                            data: $scope.sexdDynamicData
                        }
                    ]
                };
                //直辖市不能下钻设置数据
                mapOption = {
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
                                {name: '四川', selected: false},
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
                            "data": $scope.regionDataArray,
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
                                            if ($scope.regionPeopleSum == undefined) {

                                                label = '数据加载中';

                                                return label;
                                            } else {
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

                                            if ($scope.AgePeopleSum == undefined) {
                                                label = '暂无数据';
                                                return label;
                                            }
                                            else {
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
        };

        //更改样式的方法
        $scope.bigger = function (id) {
            document.getElementById(id).style.height = 25 + 'px';
            document.getElementById(id).style.width = 43 + 'px';
        };
        $scope.smaller = function (id) {
            document.getElementById(id).style.height = 20 + 'px';
            document.getElementById(id).style.width = 38 + 'px';
        };


    }
})();

