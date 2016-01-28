/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('terminalDevCtr', terminalDevCtr);
    function terminalDevCtr($scope, $location, ipCookie, $rootScope, $http, URL) {

        //分页数据类型定义
        $scope.templatePageNumHtml = "";
        $scope.pageSize = 5;
        $scope.pageNumber = 0;
        $scope.pageNum = 1;
        $scope.pageData = [];
        $scope.dataTable = [];
        $scope.tableData = [];


        //时间控件方法
        $scope.singleDate = moment().subtract(1, "days");

        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
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
            },
            "singleDatePicker": true

        };

        $scope.time = $scope.formatTime($scope.singleDate);

        $scope.key = 'version';

        $scope.av = 'all';

        var myChart;
        var option;

        //网络获取数据
        $scope.getChartData = function (time, key, type, av, index) {

            if (time == null) {
                time = $scope.time;
            }
            if (av == null) {
                av = $scope.av;
            }
            if (type == null) {
                type = $scope.key = 'version';
            }
            if (key == null) {
                key = $scope.key = 'version';
            }
            if (index != null) {
                $scope.setState(index);
            }
            if (myChart == undefined) {
                return;
            }
            myChart.showLoading({
                text: "数据读取中...",
                effect: "whirling",
                textStyle: {
                    fontSize: 20
                }
            });

            $http.get(URL + "tdAnalysis?&time=" + time + "&key=" + key + "&" + type + "=" + av)
                .success(function (response) {

                    $scope.VersionArray = [];
                    $scope.NewUserArray = [];
                    $scope.dataArray = [];
                    $scope.newDataArray = [];

                    $scope.dataTable = [];


                    if (av == 'all') {
                        $scope.NewUserSum = 0;
                        $scope.ActiveUser = 0;
                        $scope.StartCount = 0;
                    }
                    $scope.ActiveUserArray = [];
                    $scope.StartCountArray = [];


                    for (var i = 0; i < response.length; i++) {
                        if (av == 'all') {
                            $scope.NewUserSum += response[i].register_user;
                            $scope.ActiveUser += response[i].active_user;
                            $scope.StartCount += response[i].start_count;
                        }
                        $scope.dataArray.push(response[i]);
                        $scope.newDataArray.push(response[i]);
                        $scope.NewUserArray.push(response[i].register_user);
                        $scope.ActiveUserArray.push(response[i].active_user);
                        $scope.StartCountArray.push(response[i].start_count);
                        $scope.VersionArray.push(response[i].key);

                    }
                    if ($scope.NewUserArray == [] || $scope.VersionArray == []) {
                        myChart.showLoading({
                            text: "暂无数据",
                            effect: "whirling",
                            textStyle: {
                                fontSize: 20
                            }
                        });
                    } else {
                        myChart.hideLoading();
                    }
                    myChart.clear();//在刷新数据之前清空绘画内容，清空后实例可用
                    option.series[0].data = $scope.NewUserArray;
                    option.yAxis[0].data = $scope.VersionArray;
                    myChart.setOption(option);

                    for (var i = 0; i < $scope.dataArray.length; i++) {
                        $scope.newUserPre = (($scope.dataArray[i].register_user / $scope.NewUserSum) * 100).toFixed(2);
                        $scope.activeUserPre = (($scope.dataArray[i].active_user / $scope.ActiveUser) * 100).toFixed(2);
                        $scope.startCountPre = (($scope.dataArray[i].start_count / $scope.StartCount) * 100).toFixed(2);
                        $scope.dataTable.push({
                            key: $scope.dataArray[i].key,
                            register_user: $scope.dataArray[i].register_user,
                            NewUserPre: $scope.newUserPre,
                            active_user: $scope.dataArray[i].active_user,
                            ActiveUserPre: $scope.activeUserPre,
                            start_count: $scope.dataArray[i].start_count,
                            StartCountPre: $scope.startCountPre
                        })
                    }
                    //分页方法调用
                    $scope.createPageDatas($scope.dataTable, 1);


                })
                .error(function (data, header, config, status) {
                    console.log('响应失败');
                    //处理响应失败
                    myChart.hideLoading();
                    myChart.showLoading({
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
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                myChart = ec.init(document.getElementById('terminalDevice'), {
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
                    title: {
                        text: 'TOP10新增用户操作系统版本分布',
                        textStyle: {
                            fontSize: 10,
                            align: 'center'
                        }

                    },
                    tooltip: {
                        show: true,
                        trigger: "item",
                        backgroundColor: 'white',
                        borderColor: 'darkgrey',
                        borderWidth: 2,
                        textStyle: {
                            color: 'black'
                        }

                    },
                    xAxis: [
                        {
                            type: 'value',
                            splitNumber: 1500,
                            axisLine: false


                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: $scope.VersionArray,
                            splitLine: false

                        }
                    ],
                    series: [
                        {
                            "name": "新注册用户",
                            "type": "bar",
                            "data": $scope.NewUserArray,
                            barCategoryGap: '15',

                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            fontSize: 12,
                                            color: "black"
                                        },
                                        //动态设置百分比
                                        formatter: function (params, ticket, callback) {

                                            var label;
                                            var str1 = '新注册用户';
                                            var str2 = '活跃用户';
                                            var str3 = '启动次数';
                                            switch (params.seriesName) {
                                                case str1:
                                                    label = ((Number(params.value) / $scope.NewUserSum) * 100).toFixed(2);

                                                    break;
                                                case str2:
                                                    label = ((params.value / $scope.ActiveUser) * 100).toFixed(2);

                                                    break;
                                                case str3:
                                                    label = ((params.value / $scope.StartCount) * 100).toFixed(2);

                                                    break;
                                                default:

                                            }
                                            return label + '%';
                                        }
                                    },

                                    color: '#76B5FF'//颜色
                                },
                                emphasis: {}
                            }
                        }
                    ]
                };
                // 为echarts对象加载数据
                myChart.setOption(option);
                $scope.getChartData($scope.time, $scope.key, $scope.key, $scope.av, null);
            }
        );

        //新增用户
        $scope.getNewUserChartData = function (index) {
            $scope.triggerTitle(index);

            var options = myChart.getOption();
            options.series[0].name = "新注册用户";
            options.title.text = 'TOP10新增用户操作系统版本分布';
            options.series[0].data = $scope.NewUserArray;
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        };
        //活跃用户
        $scope.getActiveUserChartData = function (index) {
            $scope.triggerTitle(index);
            var options = myChart.getOption();
            options.series[0].data = $scope.ActiveUserArray;
            options.series[0].name = "活跃用户";
            options.title.text = 'TOP10活跃用户操作系统版本分布';
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        };
        //启动次数
        $scope.getStartCountChartData = function (index) {
            $scope.triggerTitle(index);
            var options = myChart.getOption();
            options.series[0].name = "启动次数";
            options.title.text = 'TOP10启动次数操作系统版本分布';
            options.series[0].data = $scope.StartCountArray;
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        };

        //时间控件时间改变时调用的方法
        $scope.$watch('singleDate', function (newDate) {

            if ($scope.time != $scope.formatTime($scope.singleDate)) {
                $scope.getChartData($scope.formatTime($scope.singleDate), $scope.key, $scope.key, $scope.av, null)
            }
            //console.log($scope.date);
            //console.log('New date set: ', newDate);
        }, false);

        //改变选项状态和动态设置表头数据
        $scope.setState = function (index) {

            for (var i = 1; i < 6; i++) {
                document.getElementById("navtab_" + i).setAttribute("class", "");
            }
            document.getElementById("navtab_" + index).setAttribute("class", "current");
            switch (index) {
                case 1:
                    document.getElementById('title').innerHTML = ' <th id="title">操作系统版本</th>';
                    break;
                case 2:
                    document.getElementById('title').innerHTML = ' <th id="title">分辨率</th>';
                    break;
                case 3:
                    document.getElementById('title').innerHTML = ' <th id="title">网络环境</th>';
                    break;
                case 4:
                    document.getElementById('title').innerHTML = ' <th id="title">运营商</th>';
                    break;
                case 5:
                    document.getElementById('title').innerHTML = ' <th id="title">设备型号</th>';
                    break;
                default :

            }

        };
        //设置新增用户，活跃用户，启动次数状态切换
        $scope.triggerTitle = function (index) {
            for (var i = 1; i < 4; i++) {
                document.getElementById("tab_" + i).setAttribute("class", "");
            }
            document.getElementById("tab_" + index).setAttribute("class", "current");

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
        //创建表格的方法
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
                    register_user_percentage: tableData[i].NewUserPre,
                    active_user: tableData[i].active_user,
                    active_user_percentage: tableData[i].ActiveUserPre,
                    start_count: tableData[i].start_count,
                    start_count_percentage: tableData[i].StartCountPre

                });
                PageDataHtml += '<tr>'
                    + ' <td>'
                    + ' <div style="width: 100%; height: 100%;text-align:left;">' + tableData[i].key + '</div>'
                    + ' </td>'
                    + '<td>'
                    + '<div style="width: 100%; height: 100%;">' + tableData[i].register_user
                    + '<span style="margin-left: 10px">' + tableData[i].NewUserPre + '%' + '</span>' + '</div>'
                    + '</td>'
                    + ' <td>'
                    + '  <div style="width: 100%; height: 100%;">' + tableData[i].active_user
                    + '<span style="margin-left: 10px">' + tableData[i].ActiveUserPre + '%' + '</span>' + '</div>'
                    + '</td>'
                    + '<td>'
                    + '<div style="width: 100%; height: 100%;">' + tableData[i].start_count
                    + '<span style="margin-left: 10px">' + tableData[i].StartCountPre + '%' + '</span>' + '</div>'
                    + '</tr>';
            }
            document.getElementById("tableData").innerHTML = PageDataHtml;
            $scope.templatePageNumHtml = pageNumHtml;
            document.getElementById("showPageSize").innerHTML = $scope.pageSize + ' <span class="caret">';
        }


    }
})();
