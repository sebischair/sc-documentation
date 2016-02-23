(function () {
    angular.module('scDocumentation')
        .controller('SearchController', SearchController);

        function SearchController ($route, scSearchService, $location) {
            var vm = this;
            vm.test = "test";
            console.log($route.current.params);
            vm.data = $route.current.params;

            scSearchService.getSearchResults(vm.data)
                .then(function (results) {
                    console.log(results);
                    vm.searchResults = results;
                    console.log(results);
                });

        }
})();