(function () {
    angular.module('scDocumentation')
    .directive('scDocSidebar', function (scDocConfig, scData, scAuth) {
        return {
            require: [],
            templateUrl: 'components/sidebar/sidebar.html',
            controller: function ($scope, $element, $routeParams) {
                $scope.currentId = $routeParams.lessonId;
                scAuth.login('username', 'pass');
                scData.Workspace.get({ id: scDocConfig.workspace.id, meta : 'entityTree' }, function (workspace) {
                    $scope.elements = workspace.entityTree.children;
                });
            }
        }
    });

})();
