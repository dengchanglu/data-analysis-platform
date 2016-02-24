/**
 * Created by perfection on 15-12-3.
 */
(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('indexCtr', indexCtr);
    function indexCtr($scope, $location, ipCookie, $rootScope) {
        $scope.url_test = "";
        $scope.includeUrl = "'/views/analysisViews/appSurvey.html'";
        $scope.cookie_user = ipCookie("key");
        $scope.signIn = function () {
            $location.path("/index");
        };
        $scope.channelVersionMenu = function () {
            if (document.getElementById("channelVersionMenu").style.display == "none") {
                document.getElementById("channelVersionMenu").style.display = "block";
            } else {
                document.getElementById("channelVersionMenu").style.display = "none";
            }

        };
        $scope.userMenu = function () {
            if (document.getElementById("userMenu").style.display == "none") {
                document.getElementById("userMenu").style.display = "block";
            } else {
                document.getElementById("userMenu").style.display = "none";
            }

        };
        $scope.behaviorMenu = function () {
            if (document.getElementById("behaviorMenu").style.display == "none") {
                document.getElementById("behaviorMenu").style.display = "block";
            } else {
                document.getElementById("behaviorMenu").style.display = "none";
            }

        };
        $scope.terminalMenu = function () {
            if (document.getElementById("terminalMenu").style.display == "none") {
                document.getElementById("terminalMenu").style.display = "block";
            } else {
                document.getElementById("terminalMenu").style.display = "none";
            }

        };
        $scope.changeUrl = function (url) {
            $location.path(url)
        };


        //检查cookie缓存的用户信息
        if ($scope.cookie_user == undefined || $scope.cookie_user == null || $scope.cookie_user == "") {
            //$('#loginModal').modal('show');
        }

        $scope.login = function () {
            var str = document.getElementById("loginState").value;
            if (str == "未登录") {
                $('#loginModal').modal('show');
            } else {
                $('#loginModal').modal('hide');
            }


        };
        $scope.signIn = function () {
            $('#loginModal').modal('hide');
            alert('登录成功');
            document.getElementById("userHeadImage").src = 'public/images/headImage.jpg'
            document.getElementById("loginState").value = '用户昵称';
            document.getElementById("loginState").style.backgroundColor = 'darkgray';
        };
        $scope.changeInclude = function () {
            document.getElementById("index_app").style.display = "none";
        };
        if (window.location.hash == "#/index") {
            document.getElementById("index_app").style.display = "block";
        } else {
            document.getElementById("index_app").style.display = "none";
        }

    }
})();