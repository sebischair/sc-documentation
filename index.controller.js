(function () {
    angular.module('scDocumentation')
        .controller('IndexController', IndexController);

    function IndexController($q, scDocConfig, scSearch, $location, $log) {
        var vm = this;
        vm.getSearchHints = getSearchHints;
        vm.searchTextChange = searchTextChange;
        vm.selectedItemChange = selectedItemChange;
        vm.showSearchResults = showSearchResults;
        vm.setActiveParent = setActiveParent;
        vm.activeParent = null;

        function showSearchResults(keyEvent, searchText) {
            if (keyEvent != undefined && keyEvent.which === 13) {
                var searchParams = {
                    text: searchText,
                    n: 20,
                    page: 1
                };
                $location.path('search').search(searchParams);
            }
        }

        function getSearchHints(searchText) {

            var deferred = $q.defer();

            scSearch.hints({
                text: searchText,
                workspace: scDocConfig.workspace
            }, function (success) {
                deferred.resolve(success.hints);

            }, function (error) {
                $log.info("error searchHints");
            });

            return deferred.promise;
        }

        function searchTextChange(text) {
            console.log('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            if (item && item.href) {
                var path = item.id + "/" + item.name;
                $location.path(path);
            }
        }

        function setActiveParent(itemId) {
            $log.info("active Parent is " + itemId);
            vm.activeParent = itemId;
        }

    }
})();