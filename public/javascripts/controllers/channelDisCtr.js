/**
 * Created by perfection on 15-12-8.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('channelDisCtr', channelDisCtr);
    function channelDisCtr($scope, $location, ipCookie, $rootScope,$http) {


        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };
        $scope.data = {
            dateTime: [],
            series: []
        };

        $scope.formatTime = function (time) {
            var date = new Date(time);
            return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        };
        $scope.time = $scope.formatTime($scope.date.startDate) + "," + $scope.formatTime($scope.date.endDate);
        $scope.data.dateTime = [$scope.formatTime($scope.date.startDate), $scope.formatTime($scope.date.endDate)];
        console.log( $scope.time);
        console.log($scope.data.dateTime)

        $scope.changeTime=function(){

            console.log( $scope.time);
            console.log($scope.data.dateTime)
        }
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

        $scope.getChannelAnalysisChartData = function () {

            $http.get("http://localhost:3000/api/versionAnalysis?time=2016-01-18&cm=guanwang&av=2.2.0,2.1.0")
                .success(function (response) {
                    console.log(response)



                })
                .error(function(data,header,config,status){
                    console.log(status)
                    //处理响应失败
                });
        }
        require(
            [
                'echarts',
                'echarts/chart/line',//使用折线图就加载line模块，按需加载
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var ChannelAnalysisChart= ec.init(document.getElementById('channelDistribution'));

                var ChannelAnalysisOption = {
                    title : {
                        text: '新增用户',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        y:'bottom',
                        data:['OpenPlatform','baidushoujizhushou','guanwang','huaweineizhi','oppo','oppoyuzhuang',
                            'weibodiaoqi','xiaomi','yingyongbao','zhihuiyun']
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            splitLine: false,
                            boundaryGap : false,
                            data : ['2016-01-06','2016-01-07','2016-01-08','2016-01-09','2016-01-10','2016-01-11','2016-01-12',
                                '2016-01-13', '2016-01-14', '2016-01-15', '2016-01-16', '2016-01-17', '2016-01-18', '2016-01-19']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber: 2,



                        }
                    ],
                    series:[
                        {
                            type:'line',
                            data:[503,442,413,426,508,512,463,440,433,469,527,587,538,144]
                        }
                    ]

                };

                // 为echarts对象加载数据
                ChannelAnalysisChart.setOption(ChannelAnalysisOption);
                $scope.getChannelAnalysisChartData();
            }
        );

    }
})();