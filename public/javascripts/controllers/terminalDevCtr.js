/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('terminalDevCtr', terminalDevCtr);
    function terminalDevCtr($scope, $location, ipCookie, $rootScope, $http, URL) {

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
            "singleDatePicker": true,

        };

        $scope.time = $scope.formatTime($scope.singleDate);

        $scope.key = 'version';

        $scope.av = 'all';

        var myChart;


        //网络获取数据
        $scope.getChartData = function (time, key, type, av, index) {

            var options = myChart.getOption();

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


            console.log(time)
            console.log(key);
            console.log(type);
            console.log(av);


            $http.get(URL + "tdAnalysis?&time=" + time + "&key=" + key + "&" + type + "=" + av)
                .success(function (response) {

                    $scope.VersionArray = [];
                    $scope.NewUserArray = [];
                    $scope.dataArray = [];
                    $scope.NewUserSum = 0;
                    $scope.ActiveUser = 0;
                    $scope.StartCount = 0;
                    $scope.ActiveUserArray = [];
                    $scope.StartCountArray = [];

                    for (var i = 0; i < response.length; i++) {
                        $scope.NewUserSum += response[i].register_user;
                        $scope.ActiveUser += response[i].active_user;
                        $scope.StartCount += response[i].start_count;
                        $scope.dataArray.push(response[i])
                        $scope.NewUserArray.push(response[i].register_user);
                        $scope.ActiveUserArray.push(response[i].active_user);
                        $scope.StartCountArray.push(response[i].start_count)
                        $scope.VersionArray.push(response[i].key);
                    }
                    myChart.clear();//在刷新数据之前清空绘画内容，清空后实例可用
                    options.series[0].data = $scope.NewUserArray;
                    options.yAxis[0].data = $scope.VersionArray;
                    myChart.setOption(options);

                })
                .error(function (data, header, config, status) {
                    console.log('响应失败')
                    //处理响应失败
                });


        }
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                myChart = ec.init(document.getElementById('terminalDevice'));

                var option = {
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
                            axisLine: false,


                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ["3.2", "6.0", "4.0.3-4.0.4", "2.3.3-2.3.7", "4.1.x", "5.0"],
                            splitLine: false,


                        }
                    ],
                    series: [
                        {
                            "name": "新注册用户",
                            "type": "bar",
                            "data": [1, 23, 81, 109, 145, 357],
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
                                            var str1 = '新注册用户'
                                            var str2 = '活跃用户'
                                            var str3 = '启动次数'


                                            switch (params.seriesName) {
                                                case str1:
                                                    label = ((params.value / $scope.NewUserSum) * 100).toFixed(2)

                                                    break;
                                                case str2:
                                                    label = ((params.value / $scope.ActiveUser) * 100).toFixed(2)

                                                    break;
                                                case str3:
                                                    label = ((params.value / $scope.StartCount) * 100).toFixed(2)

                                                    break;
                                                default:

                                            }
                                            return label + '%';
                                        }
                                    },

                                    color: '#76B5FF',//颜色
                                },
                                emphasis: {}
                            },
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
            $scope.triggerTitle(index)

            var options = myChart.getOption();
            options.series[0].name = "新注册用户";
            options.title.text = 'TOP10新增用户操作系统版本分布';
            options.series[0].data = $scope.NewUserArray;
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        }
        //活跃用户
        $scope.getActiveUserChartData = function (index) {
            $scope.triggerTitle(index)
            var options = myChart.getOption();
            options.series[0].data = $scope.ActiveUserArray;
            options.series[0].name = "活跃用户"
            options.title.text = 'TOP10活跃用户操作系统版本分布';
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        }
        //启动次数
        $scope.getStartCountChartData = function (index) {
            $scope.triggerTitle(index)
            var options = myChart.getOption();
            options.series[0].name = "启动次数"
            options.title.text = 'TOP10启动次数操作系统版本分布';
            options.series[0].data = $scope.StartCountArray;
            options.yAxis[0].data = $scope.VersionArray;
            myChart.setOption(options);
        }
        //Watch for date changes时间控件时间改变时调用的方法
        $scope.$watch('singleDate', function (newDate) {

            if ($scope.time != $scope.formatTime($scope.singleDate)) {
                $scope.getChartData($scope.formatTime($scope.singleDate), $scope.key, $scope.key, $scope.av, null)

            }
            //console.log($scope.date);
            //console.log('New date set: ', newDate);
        }, false);

        $scope.setState = function (index) {

            for (var i = 1; i < 6; i++) {
                document.getElementById("navtab_" + i).setAttribute("class", "");
            }
            document.getElementById("navtab_" + index).setAttribute("class", "current");
        }

        $scope.triggerTitle = function (index) {
            for (var i = 1; i < 4; i++) {
                document.getElementById("tab_" + i).setAttribute("class", "");
            }
            document.getElementById("tab_" + index).setAttribute("class", "current");

        };


    }
})();
