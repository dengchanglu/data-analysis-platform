/**
 * Created by perfection on 16-1-26.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('usingTimeLengthCtr', usingTimeLengthCtr);
    function usingTimeLengthCtr($scope, $location, ipCookie, $rootScope, $http, URL) {
        $scope.templatePageNumHtml = "";

        $scope.dayNumber = 2;
        $scope.isContrast = false;


        $scope.dateContrast = {
            startDate: moment().subtract(2, "days"),
            endDate: moment().subtract(1, "days")
        };

        $scope.templateCM = "all";
        $scope.templateAV = "all";
        $scope.templateData = {
            time: [],
            time_difference: [],
            dataTable: []
        };
        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };
        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };
        //对比数据legend的修改
        $scope.legend = [$scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate)];

        var usingTimeLengthChart;
        var option;
        $scope.showTable = function (tableData) {
            var PageDataHtml = "";
            for (var i = 0; i < tableData.length; i++) {
                PageDataHtml += '<tr>'
                    + ' <td>'
                    + ' <div style="width: 100%; height: 100%;text-align:center;">' + tableData[i].key + '</div>'
                    + ' </td>'
                    + '<td>'
                    + '<div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].activeUser + ' <span class="percent">' + tableData[i].activeUser_percentage + '%</span></div>'
                    + '</td>'
                    + ' <td>'
                    + '<div style="width: 100%; height: 100%;text-align:right;"><div class="ui_progress"><div style="width:' + (tableData[i].activeUser_percentage + 1) + '%; " class="ui_progress_bar"></div></div></div>'
                    + '</td>'
                    + '<td>'
                    + '<div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].newUser + ' <span class="percent">' + tableData[i].newUser_percentage + '%</span></div>'
                    + '<td>'
                    + '<div style="width: 100%; height: 100%;text-align:right;"><div class="ui_progress"><div style="width:' + (tableData[i].newUser_percentage + 1) + '%; " class="ui_progress_bar"></div></div></div>'
                    + '</td>'
                    + '</tr>';
            }
            document.getElementById("tableData_time").innerHTML = PageDataHtml;
        };
        $scope.getUsingTimeLengthData = function (time, cm, av) {
            if (usingTimeLengthChart == undefined) {
                return;
            }
            usingTimeLengthChart.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });
            time = "2016-1-12";//es硬件条件更不上，暂时的解决方法
            $http.get(URL + "timeOfUsingAnalysis?time=" + time + "&cm=" + cm + "&av=" + av).success(function (data) {
                usingTimeLengthChart.hideLoading();
                var i = 0;
                for (i = 0; i < data.dataForm.length; i++) {
                    $scope.templateData.time.push(data.dataForm[i].day);
                    $scope.templateData.time_difference.push(data.dataForm[i].time_difference);
                }
                $scope.templateData.dataTable = data.dataTable;
                if ($scope.isContrast) {
                    option.series[1].data = $scope.templateData.time_difference;
                    option.series[1].name = $scope.formatTime($scope.dateContrast.startDate) + "-" + $scope.formatTime($scope.dateContrast.endDate);
                    option.legend.data = [$scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate), $scope.formatTime($scope.dateContrast.startDate) + "-" + $scope.formatTime($scope.dateContrast.endDate)];
                } else {

                    option.series[0].name = $scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate);
                    option.legend.data = [$scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate)];
                    option.series[0].data = $scope.templateData.time_difference;
                    option.xAxis[0].data = $scope.templateData.time;
                }
                usingTimeLengthChart.setOption(option);
                $scope.showTable($scope.templateData.dataTable);
                $scope.templateData = {
                    time: [],
                    time_difference: [],
                    dataTable: []
                };
            }).error(function (data, status, headers, config) {
                usingTimeLengthChart.hideLoading();
                usingTimeLengthChart.showLoading({
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
                usingTimeLengthChart = ec.init(document.getElementById('usingTimeLengthChart'));

                option = {

                    //title: {
                    //    text: '人均使用时长',
                    //    x: 'center'
                    //
                    //},
                    legend: {
                        data: []
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
                        },
                        formatter: '{b}<br>{a}    0:00:{c}',
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 0,
                        textStyle: {
                            color: 'black'
                        }

                    },
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
                            axisLine: false,
                            splitNumber: 3,
                            axisLabel: {
                                formatter: function (value) {

                                    var h = Math.floor(value / 60 / 60);
                                    var m = value % (60 * 60);
                                    var s = value % (60);
                                    if (h.toString().length < 2) h = '0' + h.toString();
                                    if (m.toString().length < 2) m = '0' + m.toString();
                                    if (s.toString().length < 2) s = '0' + s.toString();
                                    return h + ':' + m + ':' + s;
                                }
                            }


                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            symbol: 'none',
                            data: [],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#3389D4',
                                        width: 2
                                    }

                                },
                                emphasis: {}
                            }
                        },
                        {
                            name: '',
                            type: 'line',
                            symbol: 'none',
                            data: [],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#62C87F',
                                        width: 2
                                    }

                                },
                                emphasis: {}
                            }
                        }
                    ]
                };

                usingTimeLengthChart.setOption(option);
                $scope.getUsingTimeLengthData($scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateCM, $scope.templateAV);
            });
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
        $scope.$watch('date', function (newDate) {
            var date1 = new Date($scope.formatTime(newDate.startDate));  //开始时间
            var date2 = new Date($scope.formatTime(newDate.endDate));    //结束时间
            var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));
            $scope.dayNumber = days;
            var time = "";
            for (var i = 0; i < days; i++) {
                var dataTem = new Date(date1.getTime() + i * (24 * 3600 * 1000));
                time += $scope.formatTime(dataTem) + ",";
            }
            time += $scope.formatTime(newDate.endDate);
            $scope.getUsingTimeLengthData(time, $scope.templateCM, $scope.templateAV);
        }, false);
        $scope.changeActive = function (type, id, number) {
            for (var i = 0; i < number; i++) {
                document.getElementById("time_btn_" + type + "_" + i).setAttribute("class", "btn btn-default");
            }
            document.getElementById(id).setAttribute("class", "btn btn-default active");
        };
        $scope.chooseCM_time = function (cm, id) {
            $scope.changeActive("cm", id, 6);
            $scope.templateCM = cm;
            $scope.getUsingTimeLengthData($scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), cm, $scope.templateAV);
        };
        $scope.chooseVersion_time = function (av, id) {
            $scope.changeActive("av", id, 7);
            $scope.templateAV = av;
            $scope.getUsingTimeLengthData($scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateCM, av);
        };

        //对时间数据方法
        $scope.createContrastData = function () {
            if (document.getElementById("btn_createContrastData").textContent == "取消时间对比") {
                $scope.isContrast = false;
                document.getElementById("contrastHtml").style.display = "none";
                document.getElementById("btn_createContrastData").textContent = "按时间对比";
                //console.log(option.legend)
                //option.legend.selected[$scope.formatTime($scope.dateContrast.startDate) + "-" + $scope.formatTime($scope.dateContrast.endDate)] = false;
                option.legend.data = [$scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate)];
                option.series = option.series[0];


                usingTimeLengthChart.setOption(option);
                console.log(option.legend.data)
                console.log(option)
                $scope.dateContrast = {
                    startDate: moment().subtract(2, "days"),
                    endDate: moment().subtract(1, "days")
                };
                $scope.dayNumber = 2;
                if (usingTimeLengthChart == undefined) {
                    return;
                }

            } else {
                $scope.isContrast = true;
                document.getElementById("btn_createContrastData").textContent = "取消时间对比";
                document.getElementById("contrastHtml").style.display = "";
                $scope.getUsingTimeLengthData($scope.formatTime($scope.dateContrast.startDate) + "," + $scope.formatTime($scope.dateContrast.endDate), $scope.templateCM, $scope.templateAV);
            }
        };
        $scope.$watch('dateContrast', function (newDate) {
            var date1 = new Date($scope.formatTime(newDate.startDate));  //开始时间
            var date2 = new Date($scope.formatTime(newDate.endDate));    //结束时间
            var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));
            $scope.dayNumber = days;
            var time = "";
            for (var i = 0; i < days; i++) {
                var dataTem = new Date(date1.getTime() + i * (24 * 3600 * 1000));
                time += $scope.formatTime(dataTem) + ",";
            }
            time += $scope.formatTime(newDate.endDate);
            if ($scope.isContrast) {
                $scope.getUsingTimeLengthData(time, $scope.templateCM, $scope.templateAV);
            }else{
                if (usingTimeLengthChart == undefined) {
                    return;
                }
                option.legend.data = [$scope.formatTime($scope.date.startDate) + "-" + $scope.formatTime($scope.date.endDate)];
                usingTimeLengthChart.setOption(option);
            }
        }, false);
    }

})();
