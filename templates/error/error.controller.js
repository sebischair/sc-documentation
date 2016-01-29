(function () {
    angular.module('scDocumentation')
    .controller('ErrorController', function ($routeParams, $scope) {
        if ($routeParams.errorId === '404') {
            $scope.message = "Could not found a lesson for the specified ID";
        } else {
            $scope.message = "There was an error.";
        }
    });
})();
