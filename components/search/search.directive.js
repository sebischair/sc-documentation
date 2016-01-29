(function () {
    angular.module('scDocumentation')
    .directive('scDocSearch', function (scData) {
        return {
            require: [],
            templateUrl: 'components/search/search.html'
        }
    });
})();
