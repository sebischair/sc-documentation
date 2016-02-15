(function () {
    angular.module('scDocumentation')
        .controller('IndexController', IndexController);

    function IndexController ($route, $location) {
        var vm = this;
        vm.test = "test";
        vm.searchText = "";
        vm.showSearchResults = showSearchResults;

        function showSearchResults(){
            var searchParams = {
                q:vm.searchText
            };

            $location.path('search').search(searchParams);

        }

    }
})();