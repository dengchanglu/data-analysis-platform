/**
 * Created by perfection on 16-1-15.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('versionDisCtr', function ($scope, $http, $compile, $rootScope, URL) {
            //分页数据类型定义
            $scope.templatePageNumHtml = "";
            $scope.pageSize = 5;
            $scope.pageNumber = 0;
            $scope.pageNum = 1;
            $scope.pageData = [];
            $scope.dataTable = [];
            $scope.tableData = [];

            $scope.templateKey = "tab_1";
            $scope.templateVersion = {
                "av": '2.1.0,1.1.0'
            };

            $scope.versions = [];
            $scope.date = {
                startDate: moment().subtract(1, "days"),
                endDate: moment()
            };
            $scope.data = {
                dateTime: [],
                series: [],
                legend: []
            };
            $scope.templateCh = "all";
            $scope.formatTime = function (time) {
                var date = new Date(time);
                return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            };
            var versionAnalysisChart;
            var option;
            $scope.chooseCM = function (cm, time, av) {
                if (versionAnalysisChart == undefined) {
                    return;
                }
                versionAnalysisChart.showLoading({
                    text: "数据读取中...",
                    effect: "whirling",
                    textStyle: {
                        fontSize: 20
                    }
                });
                $scope.templateCh = cm;
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
                $http.get(URL + "versionAnalysis?time=" + time + "&cm=" + cm + "&av=" + av).success(function (data) {
                    $scope.dataTable = [];

                    for (var o = 0; o < data[0].data.length; o++) {
                        var register_user = 0;
                        var active_user = 0;
                        var start_count = 0;
                        var key = "";
                        var pres = 0;

                        var pre = 0;
                        for (var a = 0; a < data.length; a++) {
                            key = data[a].data[o].key;
                            register_user += data[a].data[o].register_user;
                            active_user += data[a].data[o].active_user;
                            start_count += data[a].data[o].start_count;
                            for (var p = 0; p < data[0].data.length; p++) {
                                pres += Number(data[a].data[p].register_user) + Number(data[a].data[p].active_user) + Number(data[a].data[p].start_count);
                            }
                            pre += Number(data[a].data[o].register_user) + Number(data[a].data[o].active_user) + Number(data[a].data[o].start_count)
                        }
                        $scope.dataTable.push({
                            key: key,
                            register_user: register_user,
                            active_user: active_user,
                            start_count: start_count,
                            pre: (pre / pres * 100).toFixed(2)
                        });


                    }


                    //分页方法调用
                    $scope.createPageDatas($scope.dataTable, 1);
                    var dateTimeTem = [];
                    for (var c = 0; c < data.length; c++) {
                        $scope.data.dateTime.push(data[c].index);
                    }
                    var seriesTem = [];
                    for (var j = 0; j < data[0].data.length; j++) {
                        $scope.data.legend.push(data[0].data[j].key);
                        var serTem = [];
                        for (var i = 0; i < data.length; i++) {
                            if ($scope.templateKey == "tab_1") {
                                serTem.push(data[i].data[j].register_user);
                            } else if ($scope.templateKey == "tab_2") {
                                serTem.push(data[i].data[j].active_user);
                            } else if ($scope.templateKey == "tab_3") {
                                serTem.push(data[i].data[j].start_count);
                            }
                        }
                        seriesTem.push({
                            name: data[0].data[j].key,
                            type: 'line',
                            stack: '总量',
                            data: serTem
                        });
                    }
                    if (seriesTem == []) {
                        versionAnalysisChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        versionAnalysisChart.hideLoading();
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
                }).error(function (data, status, headers, config) {
                    versionAnalysisChart.hideLoading();
                    versionAnalysisChart.showLoading({
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
                    // 基于准备好的dom，初始化echarts图表}
                    versionAnalysisChart = ec.init(document.getElementById('versionAnalysis'), {
                        noDataLoadingOption: {
                            text: '暂无数据',
                            x: 'center',
                            y: 'center',
                            effect: 'whirling',
                            textStyle: {
                                fontSize: 20
                            },
                            effectOption: {
                                effect: {
                                    n: 0
                                }
                            }
                        }
                    });


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
                $scope.chooseCM($scope.templateCh, time, $scope.templateVersion.av);
            }, false);
            $scope.clearVersionItem = function () {
                document.getElementById("versionSel").innerHTML = "";
            };
            $scope.triggerTitle = function (index) {
                for (var i = 1; i < 4; i++) {
                    document.getElementById("tab_" + i).setAttribute("class", "");
                }
                document.getElementById("tab_" + index).setAttribute("class", "current");
                $scope.templateKey = "tab_" + index;
                $scope.chooseCM($scope.templateCh, $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateVersion.av);
            };
            $scope.versionTrigger = function () {
                $('#versionModal').modal('show');
            };
            $scope.selectItem = function (index, selectedVal) {
                if (document.getElementById(index).firstElementChild.getAttribute("class") == "selected") {
                    return;
                }
                for (var j = 0; j < 7; j++) {
                    document.getElementById(j + "").firstElementChild.setAttribute("class", "");
                }
                document.getElementById(index).firstElementChild.setAttribute("class", "selected");
                if (selectedVal == 'all') {
                    document.getElementById("versionSel").innerHTML = "";
                    document.getElementById("versionSel").innerHTML = '<li><label class="selectedLable"><a val="全部">全部</a></label></li>';
                    $scope.templateVersion.av = '2.2.0,2.1.0,3.0.0,1.1.0,1.2.0,1.0.0';
                    return;
                }
                var html = "";
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
                $scope.templateVersion.av = "";
                var textSelected = document.getElementsByClassName("selectedLable");
                for (var k = 0; k < textSelected.length; k++) {
                    if (textSelected.item(k).textContent.substring(0, textSelected.item(k).textContent.length - 1) == "未知") {
                        $scope.templateVersion.av += 'unknown,';
                    } else {
                        $scope.templateVersion.av += textSelected.item(k).textContent.substring(0, textSelected.item(k).textContent.length - 1) + ',';
                    }
                }
                $scope.templateVersion.av = $scope.templateVersion.av.substring(0, $scope.templateVersion.av.length - 1);
            };
            $scope.queryByVersion = function () {
                if (document.getElementById("versionSel").innerHTML == "") {
                    alert("版本选择为空，请重新选择");
                    return;
                }
                $scope.versions = [];
                var temAVs = $scope.templateVersion.av.split(",");
                for (var i = 0; i < temAVs.length; i++) {
                    $scope.versions.push(temAVs[i]);
                }
                $scope.chooseCM($scope.templateCh, $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate), $scope.templateVersion.av);
                $('#versionModal').modal('hide');
            };
            $scope.exitSelectVersion = function () {
                var html = "";
                for (var i = 0; i < $scope.versions.length; i++) {
                    html += '<li><label class="selectedLable"><a val=' + $scope.versions[i] + '>' + $scope.versions[i] + '</a><em>×</em></label></li>';
                }
                document.getElementById("versionSel").innerHTML = html;
                $('#versionModal').modal('hide');
            };

            //分页方法
            $scope.getPageSize = function (pageSize) {
                $scope.pageSize = pageSize;
                $scope.createPageDatas($scope.dataTable, 1);
            };
            $scope.getPageData = function (pageNum) {
                $scope.pageNum = pageNum;
                $scope.createPageDatas($scope.dataTable, pageNum);
            };
            $scope.next = function (num) {
                if (($scope.pageNum + num) >= 1 && ($scope.pageNum + num) <= $scope.pageNumber) {
                    $scope.createPageDatas($scope.dataTable, ($scope.pageNum + num));
                    $scope.pageNum = $scope.pageNum + num;
                }

            };
            $scope.createPageDatas = function (tableData, pageNum) {
                $scope.pageNumber = tableData.length % $scope.pageSize == 0 ? tableData.length / $scope.pageSize : Math.ceil(tableData.length / $scope.pageSize);
                var pageNumHtml = '<li ng-click="next(-1)"><a>&laquo;</a></li>';
                for (var k = 0; k < $scope.pageNumber; k++) {
                    if (k == (pageNum - 1)) {
                        pageNumHtml += ('<li class="active" ng-click="getPageData(' + (k + 1) + ')"><a>' + (k + 1) + '</a></li>');
                    } else {
                        pageNumHtml += ('<li ng-click="getPageData(' + (k + 1) + ')"><a>' + (k + 1) + '</a></li>');
                    }
                }
                pageNumHtml += '<li ng-click="next(1)"><a>&raquo;</a></li>';
                var PageDataHtml = "";
                for (var i = $scope.pageSize * (pageNum - 1); i < $scope.pageSize * pageNum; i++) {
                    if (i >= tableData.length) {
                        break;
                    }
                    $scope.tableData.push({
                        key: tableData[i].key,
                        register_user: tableData[i].register_user,
                        active_user: tableData[i].active_user,
                        start_count: tableData[i].start_count,
                        pre: tableData[i].pre
                    });
                    PageDataHtml += '<tr>'
                        + ' <td>'
                        + ' <div style="width: 100%; height: 100%;text-align:center;">' + tableData[i].key + '</div>'
                        + ' </td>'
                        + '<td>'
                        + '<div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].register_user + '</div>'
                        + '</td>'
                        + ' <td>'
                        + '  <div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].active_user + '</div>'
                        + '</td>'
                        + '<td>'
                        + '<div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].start_count + '</div>'
                        + '<td>'
                        + '<div style="width: 100%; height: 100%;text-align:right;">' + (tableData[i].register_user + tableData[i].active_user + tableData[i].start_count) + '</div>'
                        + '</td>'
                        + '<td>'
                        + '<div style="width: 100%; height: 100%;text-align:right;">' + tableData[i].pre + '%</div>'
                        + '</td>'
                        + '</tr>';
                }
                document.getElementById("tableData").innerHTML = PageDataHtml;
                $scope.templatePageNumHtml = pageNumHtml;
                document.getElementById("showPageSize").innerHTML = $scope.pageSize + ' <span class="caret">';
            }
        }
    )
    ;
})();