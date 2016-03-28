(function () {
    angular.module('scDocumentation')
    .directive('scDocSidebar', function (scDocConfig, scData, scAuth) {
        return {
            require: [],
            templateUrl: 'components/sidebar/sidebar.html',
            controller: function ($scope, $element, $routeParams) {

                $scope.currentId = $routeParams.lessonId;
                scAuth.login('username', 'password');
                var vm = $scope;
                vm.currentId = $routeParams.lessonId;

                scData.Workspace.get({ id: scDocConfig.workspace.id, meta : 'entityTree' }, function (workspace) {
                    vm.elements = workspace.entityTree.children;

                    var tree = [];
                    var map = {};
                    tree[0] = workspace.entityTree;
                    tree[0].showChildren = true;
                    var treeDepth = getDepthArray(tree[0]);
                    enrichNavData(tree[0], null, 0, treeDepth, map);
                    setShowingNavbarItems(map, vm.currentId);
                });

                function getDepthArray(obj) {
                    if (obj.children && obj.children.length > 0) {
                        var maxDepth = 0;
                        for (var i in obj.children) {
                            var depthChild = getDepthArray(obj.children[i]);
                            if (depthChild > maxDepth) {
                                maxDepth = depthChild;
                            }
                        }
                        return 1 + maxDepth;
                    }
                    else {
                        return 0;
                    }
                }

                function enrichNavData(leaf, parent, level, treeDepth, map) {
                    leaf.parent = parent;
                    leaf.hierarchyInfo = {
                        'level': level
                    };
                    map[leaf.id] = leaf;
                    if (level < treeDepth) {
                        for (var i in leaf.children) {
                            var newLevel = level + 1;
                            enrichNavData(leaf.children[i], leaf, newLevel, treeDepth, map);
                        }
                    }
                }

                function setShowingNavbarItems(map, currentId) {
                    var currentEntity = map[currentId];

                    if (!currentEntity) {
                        return;
                    }

                    do {
                        currentEntity.showChildren = true;
                        currentEntity = currentEntity.parent;
                    } while (currentEntity);
                }

            }

        };
    });

})();
