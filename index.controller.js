(function () {
    angular.module('scDocumentation')
        .controller('IndexController', IndexController);

    function IndexController(scUtil, $resource, $route, $location, $log) {
        var vm = this;
        //vm.test = "test";
        //vm.searchText = "";
        vm.getSearchHints = getSearchHints;
        vm.searchTextChange = searchTextChange;
        vm.selectedItemChange = selectedItemChange;
        vm.showSearchResults = showSearchResults;
        vm.test = [{name:"hi",id:1}, {name:"ho", id:2}];

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
                var path = scUtil.getRelativeUrl(item.href);
                $location.path(path.substr(1));
            }
        }

    }
})();