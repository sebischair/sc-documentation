(function () {
    angular.module('scDocumentation')
    .directive('scDocSidebar', function (scData) {
        return {
            require: [],
            templateUrl:'components/sidebar/sidebar.html'
        }
    });

})();
