(function () {
    angular.module('scDocumentation')
        .controller('IndexController', IndexController);

    function IndexController(scUtil, $resource, $routeParams, $location, $log) {
        var vm = this;
        //vm.test = "test";
        //vm.searchText = "";
        vm.getSearchHints = getSearchHints;
        vm.searchTextChange = searchTextChange;
        vm.selectedItemChange = selectedItemChange;
        vm.showSearchResults = showSearchResults;
        vm.setActiveParent = setActiveParent;
        vm.activeParent = null;

        function showSearchResults(keyEvent, searchText) {
            if (keyEvent != undefined && keyEvent.which === 13) {
                var searchParams = {
                    q: searchText
                };
                $location.path('search').search(searchParams);
            }
        }

        function getSearchHints(searchText) {
            var searchHints = $resource(scUtil.getFullUrl("searchHints"));

            console.log("searching for hints:");
            console.log(searchText);

            return searchHints.get({'q': searchText}).$promise.then(function (data) {
                console.log("data");
                console.log(data);
                console.log(data.hints);
                return data.hints;
            });
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

        function setActiveParent(itemId){
            $log.info("active Parent is " + itemId);
            vm.activeParent = itemId;
        }

    }
})();