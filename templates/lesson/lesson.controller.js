(function () {
    angular.module('scDocumentation')
    .controller('LessonController', function ($scope, $location, $routeParams, scData) {
        scData.Entity.get({ id: $routeParams.lessonId, attribute:'', meta:'', content:true }, function (entity) {
            $scope.title = entity.name;
            $scope.content = entity.content;
        }, function (error) {
            $location.path("/error/404");
        });
    });
})();
