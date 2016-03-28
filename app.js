'use strict';

(function () {
    // Declare app level module which depends on views, and components
    angular.module('scDocumentation', [
      'ngRoute',
      'ngSanitize',
      'ui.ace',
      'sociocortex'
    ]).config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/error/:errorId?', {
            templateUrl: 'templates/error/error.html',
            controller: 'ErrorController'
        });

        $routeProvider.when('/:lessonId/:lessonName?', {
            templateUrl: 'templates/lesson/lesson.html',
            controller: 'LessonController'
        });

        $routeProvider.otherwise({
            templateUrl: 'templates/home/home.html',
            controller: 'HomeController'
        });
    }]).value('scConnection', {
        baseUri: 'https://server.sociocortex.com',
        apiVersion: 'v1'
    }).constant('scDocConfig', {
        workspace: { id: '28otxru3bnn1' }
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
