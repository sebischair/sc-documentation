'use strict';

(function () {
    // Declare app level module which depends on views, and components
    angular.module('scDocumentation', [
      'ngRoute',
      'ngSanitize',
      'ui.ace',
      'sociocortex',
      'ngMaterial'
    ]).value('scConnection', {
        baseUri: 'https://server.sociocortex.com',
        apiVersion: 'v1'
    }).constant('scDocConfig', {
        workspace: { id: '28otxru3bnn1' } // to test multidimensional navigation {id: '1q14hp16ch3bu'}
    }).directive('ngPrism', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // Sort of works, need a better solution.
                $timeout(function () {
                    Prism.highlightAll();
                }, 1000);
            }
        }
    }
]);
})();
