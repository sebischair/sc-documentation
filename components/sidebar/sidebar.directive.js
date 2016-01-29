(function () {
    angular.module('scDocumentation')
    .directive('scDocSidebar', function (scDocConfig, scData) {
        return {
            require: [],
            templateUrl: 'components/sidebar/sidebar.html',
            controller: function ($scope, $element, $routeParams) {
                $scope.currentId = $routeParams.lessonId;
                scData.Workspace.get({ id: scDocConfig.workspace.id, meta : 'entityTree' }, function (workspace) {
                    $scope.elements = workspace.entityTree.children;
                });
            }
        }
    });

})();
