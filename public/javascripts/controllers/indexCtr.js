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
        $scope.changeUrl = function(url){
            $location.path(url)
        };



        //检查cookie缓存的用户信息
        if ($scope.cookie_user == undefined || $scope.cookie_user == null || $scope.cookie_user == "") {
            $('#loginModal').modal('show');
        }

        $scope.login=function(){
            $('#loginModal').modal('show');

        }
        $scope.signIn=function(){
            $('#loginModal').modal('hide');
            alert('登录成功');
           document.getElementById("userHeadImage").src='public/images/headImage.jpg'
            var sl=$("#ss");
            var ops=sl.find("option");
            ops.eq(0).val("8").text("已登录").prop("selected",true);


        }
    }
})();