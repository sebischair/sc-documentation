(function () {
    angular.module('scDocumentation')
        .controller('SearchController', SearchController);

    function SearchController($location, $route, scSearch, scDocConfig, $location) {
        var vm = this;
        console.log($route.current.params);
        vm.n = $route.current.params.n;
        vm.page = $route.current.params.page;
        vm.filterResults = filterResults;

        scSearch.results({
            text: $route.current.params.text,
            workspace: scDocConfig.workspace,
            n: $route.current.params.n,
            page: $route.current.params.page
        }, function (success) {
            vm.searchResults = success.results;
            vm.searchResultsCount = success.totalCount;
            vm.paginationAmountOfPages = Math.ceil(vm.searchResultsCount / vm.n);
            vm.paginationArray = new Array(vm.paginationAmountOfPages);
            console.log(vm.searchResults);

        }, function (error) {
            $log.info("error searchHints");
        });

        function filterResults() {
            $location.path('search').search({
                text: $route.current.params.text,
                n: $route.current.params.n,
                page: vm.page
            });
        }
    }
})();