/**
 * Created by perfection on 16-2-15.
 */

(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('sourceAnalysisCtr', function ($scope, URL, $http) {
            $scope.formatTime = function (time) {
                var date = new Date(time);
                return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            };
            $scope.getTimes = function (newDate) {
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
                return time;
            };
            $scope.data = {
                rootPage: {
                    key: "",
                    pv: "",
                    uv: "",
                    rootPageOut: ""
                },
                leavesPage: []
            };
            $scope.av = "all";
            $scope.bp = "page_login";
            $scope.pages = ["page_login", "page_buy", "page_personalInfo", "page_register"];
            $scope.date = {
                startDate: moment().subtract(1, "days"),
                endDate: moment()
            };
            $scope.chooseVersion_source = function (time, av, bp) {
                $http.get(URL + "sourceAnalysis?time=" + time + "&bp=" + bp + "&av=" + av).success(function (data) {
                    $scope.data = data;
                    $scope.createSvg();
                }).error(function (data, status, headers, config) {
                    document.getElementById("errorShow").innerHTML="链接错误，请重新刷新一下！"
                });
            };
            $scope.getHtmlSvg = function () {
                var html = "";
                var i = 0;
                for (i = 0; i < $scope.data.leavesPage.length; i++) {
                    if (i == 5) {
                        html += '<path d="M 233 329.5 q 50 200 125 ' + (i * 64 - 300) + '" stroke="#000000" stroke-width="0" fill="#ffefd7" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>'
                    } else {
                        html += '<path d="M 233 329.5 q 50 -200 125 -' + (300 - i * 64) + '" stroke="#000000" stroke-width="0" fill="#ffefd7" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>'
                    }
                }
                return html;
            };
            $scope.getHtmlContent = function () {
                var html = "";
                var i = 0;
                var temp;
                for (i = 0; i < $scope.data.leavesPage.length; i++) {
                    if ($scope.data.leavesPage[i].key == "-") {
                        temp = {
                            leavesPageOut: $scope.data.leavesPage[i].leavesPageOut
                        };
                    } else {
                        if (temp != undefined) {
                            html += '<div id=source_info_' + (i - 1) + ' class="custom-flow-page-detail" style="width: 173px; height: 67px; left: 356px; top: ' + (58 + 64 * (i - 1)) + 'px; position: absolute; display: none;">'
                                + '<div class="cf-page-detail-arrow"></div>'
                                + '<div class="cf-down-page-info info-top"><span class="cf-page-title page-label">访问次数</span><span class="cf-page-no ellips page-label">' + $scope.data.leavesPage[i].pv + '</span></div>'
                                + '<div class="cf-down-page-info"><span class="cf-page-title page-label">访客数</span><span class="cf-page-no ellips page-label">' + $scope.data.leavesPage[i].uv + '</span></div></div>'
                                + '<div id=source_' + (i - 1) + ' class="custom-flow-pages" style="width: 175px; height: 56px; left: 356px; top: ' + (2 + 64 * (i - 1)) + 'px; position: absolute; background-color: rgb(189, 216, 243);"  onclick="favorSource(this.id)">'
                                + '<div class="radio topn">' + $scope.data.leavesPage[i].leavesPageOut + '</div><div title=' + $scope.data.leavesPage[i].key + '>' + $scope.data.leavesPage[i].key + '</div></div>'
                                + '<div id=child_source_' + (i - 1) + ' class="custom-flow-view-downpages" style="width: 26px; height: 60px; left: 533px; top: ' + (2 + 64 * (i - 1)) + 'px; position: absolute;display: none">'
                                + '<div title="设为根节点" class="fset"  onclick="changeRootPage(' + '\'' + $scope.data.leavesPage[i].key + '\'' + ')"></div><div title="查看详情" class="fdetail" onclick="getPageInfo(' + '\'' + 'source_info_' + (i - 1) + '\'' + ')" onmouseout="closePageInfo(' + '\'' + 'source_info_' + (i-1) + '\'' + ')"></div></div>';
                        } else {
                            html += '<div id=source_info_' + (i) + ' class="custom-flow-page-detail" style="width: 173px; height: 67px; left: 356px; top: ' + (58 + 64 * (i)) + 'px; position: absolute; display: none;">'
                                + '<div class="cf-page-detail-arrow"></div>'
                                + '<div class="cf-down-page-info info-top"><span class="cf-page-title page-label">访问次数</span><span class="cf-page-no ellips page-label">' + $scope.data.leavesPage[i].pv + '</span></div>'
                                + '<div class="cf-down-page-info"><span class="cf-page-title page-label">访客数</span><span class="cf-page-no ellips page-label">' + $scope.data.leavesPage[i].uv + '</span></div></div>'
                                + '<div id=source_' + (i) + ' class="custom-flow-pages" style="width: 175px; height: 56px; left: 356px; top: ' + (2 + 64 * (i)) + 'px; position: absolute; background-color: rgb(189, 216, 243);"  onclick="favorSource(this.id)">'
                                + '<div class="radio topn">' + $scope.data.leavesPage[i].leavesPageOut + '</div><div title=' + $scope.data.leavesPage[i].key + '>' + $scope.data.leavesPage[i].key + '</div></div>'

                                + '<div id=child_source_' + (i) + ' class="custom-flow-view-downpages" style="width: 26px; height: 60px; left: 533px; top: ' + (2 + 64 * (i)) + 'px; position: absolute;display: none">'
                                + '<div title="设为根节点" class="fset"  onclick="changeRootPage(' + '\'' + $scope.data.leavesPage[i].key + '\'' + ')"></div><div title="查看详情" class="fdetail" onclick="getPageInfo(' + '\'' + 'source_info_' + (i) + '\'' + ')" onmouseout="closePageInfo(' + '\'' + 'source_info_' + (i) + '\'' + ')"></div></div>';
                        }

                    }

                }
                html += '<div class="custom-flow-pages custom-flow-url-center cf-page-leave" style="width: 175px; height: 56px; left: 356px; top: ' + (2 + 64 * (i - 1)) + 'px; position: absolute; background-color: rgb(242, 247, 253);">'
                    + '<div class="radio others">' + temp.leavesPageOut + '</div><div class="cf-exit-others">离开应用</div></div>';
                return html;
            };
            $scope.createSvg = function () {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.setAttribute("id", "svg_html");
                document.getElementById("CustomFlow").appendChild(svg);
                var html = "";
                for (var i = 0; i < 7; i++) {
                    var htmlData = '<div class="active-monitor-page" style="width: 188px; height: 113px; left: 45px; top: 273.5px; position: absolute;">'
                        + '<div class="monitor-page-url" title=' + $scope.convertText + '><a href="javascript:void(0)">' + convert($scope.bp) + '</a></div>'
                        + ' <div class="monitor-page-pv"><span class="mp-pv-desc page-label">访问次数</span><span class="mp-pv-no ellips page-label">' + $scope.data.rootPage.pv + '</span></div>'
                        + '<div class="monitor-page-pv"><span class="mp-exit-desc page-label">访客数</span><span class="mp-exit-no ellips page-label">' + $scope.data.rootPage.uv + '</span></div>'
                        + '<div class="mp-page-select"></div>'
                        + '<div class="monitor-page-exit"><span class="mp-exit-desc page-label">页面跳出率</span><span class="mp-exit-no ellips page-label">' + $scope.data.rootPage.rootPageOut + '</span></div>'
                        + '</div><div class="arrow arrow-top" style="top: -10px; left: 50%; margin-left: -12px; position: absolute; border-color: rgb(225, 225, 225); height: 11px; width: 24px;">'
                        + '</div></div>'
                        + $scope.getHtmlContent()
                        + '</div>';
                }

                document.getElementById("svg_html").innerHTML = $scope.getHtmlSvg();
                document.getElementById("htmlData").innerHTML = htmlData;
            };
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
            $scope.startTime = $scope.formatTime($scope.date.startDate);
            $scope.endTime = $scope.formatTime($scope.date.endDate);
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
                $scope.startTime = $scope.formatTime(newDate.startDate);
                $scope.endTime = $scope.formatTime(newDate.endDate);
                $scope.chooseVersion_source(time, $scope.av, $scope.bp);
            }, false);
            $scope.closeAlert = function () {
                document.getElementById("alert").setAttribute("style", "display:none");
            };
            $scope.changeActive = function (type, id, number) {
                for (var i = 0; i < number; i++) {
                    document.getElementById("source_btn_" + type + "_" + i).setAttribute("class", "btn btn-default");
                }
                document.getElementById(id).setAttribute("class", "btn btn-default active");
            };
            $scope.chooseVersion_page = function (av, id) {
                $scope.changeActive("av", id, 7);
                $scope.av = av;
                $scope.chooseVersion_source($scope.getTimes($scope.date), av, $scope.bp);
            };
            changeRootPage = function (pageName) {
                $scope.bp = convert(pageName);
                $scope.chooseVersion_source($scope.getTimes($scope.date), $scope.av, $scope.bp);
            };
        })
})();