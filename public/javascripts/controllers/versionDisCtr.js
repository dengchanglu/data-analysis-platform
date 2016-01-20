/**
 * Created by perfection on 16-1-15.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('versionDisCtr', function ($scope, $http) {
            $scope.templateVersion = {
                "av": '2.1.0,1.1.0'
            };
            $scope.versions = ['2.1.0', '1.1.0'];
            $scope.date = {
                startDate: moment().subtract(1, "days"),
                endDate: moment()
            };
            $scope.data = {
                dateTime: [],
                series: [],
                legend: []
            };
            $scope.formatTime = function (time) {
                var date = new Date(time);
                return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            };
            var versionAnalysisChart;
            var option;
            $scope.chooseCM = function (cm, time, av) {
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
                if (av == null) {
                    av = $scope.templateVersion.av;
                }
                console.log(av);
                $http.get("http://localhost:3000/api/versionAnalysis?time=" + time + "&cm=" + cm + "&av=" + av).success(function (data) {
                    var dateTimeTem = [];
                    for (var c = 0; c < data.length; c++) {
                        $scope.data.dateTime.push(data[c].index);
                    }
                    var seriesTem = [];
                    for (var j = 0; j < data[0].data.length; j++) {
                        $scope.data.legend.push(data[0].data[j].key);
                        var serTem = [];
                        for (var i = 0; i < data.length; i++) {
                            serTem.push(data[i].data[j].register_user);
                        }
                        seriesTem.push({
                            name: data[0].data[j].key,
                            type: 'line',
                            stack: '总量',
                            data: serTem
                        });
                    }
                    $scope.data.series = seriesTem;
                    option.legend.data = $scope.data.legend;
                    option.series = $scope.data.series;
                    option.xAxis[0].data = $scope.data.dateTime;
                    versionAnalysisChart.setOption(option);
                    $scope.data = {
                        dateTime: [],
                        series: [],
                        legend: []
                    };
                })
            };
            require(
                [
                    'echarts',
                    'echarts/chart/line'
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表}
                    versionAnalysisChart = ec.init(document.getElementById('versionAnalysis'));


                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: $scope.data.legend
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: $scope.data.dateTime
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: $scope.data.series
                    };
                    versionAnalysisChart.setOption(option);
                    $scope.chooseCM("all", $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateVersion.av);

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
                $scope.chooseCM("all", time, $scope.templateVersion.av);
            }, false);
            $scope.chooseVersion = function (version) {
                for (var i = 0; i < 2; i++) {
                    if ($scope.versions[i] == version) {
                        return;
                    }
                }
                $scope.versions[1] = version;

                $scope.chooseCM("all", $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), av.substring(0, av.length - 1));

            };
            $scope.deleteItem = function (version) {
                console.log(version)
            };
            $scope.triggerTitle = function (index) {
                for (var i = 1; i < 6; i++) {
                    document.getElementById("tab_" + i).setAttribute("class", "");
                }
                document.getElementById("tab_" + index).setAttribute("class", "current");
            };
            //if () {
            $('#versionModal').modal('show');
            //}
            $scope.selectItem = function (index, selectedVal) {
                if (document.getElementById(index).firstElementChild.getAttribute("class") == "selected") {
                    return;
                }
                for (var i = 0; i < 8; i++) {
                    document.getElementById(i).firstElementChild.setAttribute("class", "");
                }
                document.getElementById(index).firstElementChild.setAttribute("class", "selected");
                if (selectedVal == 'all') {
                    console.log("yest")
                    document.getElementById("versionSel").innerHTML = "";
                    document.getElementById("versionSel").innerHTML = '<li><label class="selectedLable"><a val="全部">全部</a></label></li>';
                    return;
                }
                var html = "";
                //var av = "";
                var htmlDom = document.getElementsByClassName("selectedLable");
                for (var i = 0; i < htmlDom.length; i++) {
                    var textContent = document.getElementsByClassName("selectedLable").item(i).textContent;
                    if (textContent == selectedVal + '×') {
                        return;
                    } else if (textContent == "全部") {
                        continue;
                    }
                    html += '<li><label class="selectedLable"><a val=' + selectedVal + '>' + textContent.substring(0, textContent.length - 1) + '</a><em>×</em></label></li>';
                }
                html += '<li><label class="selectedLable"><a val=' + selectedVal + '>' + selectedVal + '</a><em>×</em></label></li>';
                document.getElementById("versionSel").innerHTML = html;
            };
        }
    )
    ;
})();