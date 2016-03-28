(function () {
    angular.module('scDocumentation')
    .directive('scDocNavbar', function (scData) {
        return {
            require: [],
            templateUrl: 'components/navbar/navbar.html',
            controller: function ($scope, $element, $routeParams) {
                scData.Entity.get({ id: $routeParams.lessonId, meta:'parent', attributes:'' }, function (entity) {
                    $scope.item = entity;
                    $scope.parent = entity.parent;
                });
            }
        }
    });
})();
