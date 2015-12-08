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
    }
})();