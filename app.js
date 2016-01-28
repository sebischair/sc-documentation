'use strict';

(function () {
    // Declare app level module which depends on views, and components
    angular.module('scDocumentation', [
      'ngRoute',
      'sociocortex'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
})();