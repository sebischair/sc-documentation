(function () {
    'use strict';

    angular.module('scDocumentation')
        .service('scSearchService', scSearchService);

    function scSearchService(scUtil, $resource) {

        var searchHints = $resource(scUtil.getFullUrl("searchHints")); //TODO: change to fullSearchResults

        return {
            getSearchResults: getSearchResults
        };

        function getSearchResults(searchParams){

            console.log("searching for:");
            console.log(searchParams);
            //TODO: general search API call
            return searchHints.get({'q': searchParams.q}).$promise.then(function (data) {
                console.log("data");
                console.log(data);
                return data.hints;
            });
        }
    }

})();