(function () {
    'use strict';
    angular
        .module('dataAP')
        .controller('pathAnalysisCtr', pathAnalysisCtr);
    function pathAnalysisCtr($scope, $location, ipCookie, $rootScope) {

        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
            })




    }

})();
