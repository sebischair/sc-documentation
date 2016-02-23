'use strict';

(function (angular) {
    angular
        .module('scDocumentation')
        .config(router);

    function router($routeProvider) {
        $routeProvider.when('/error/:errorId?', {
            templateUrl: 'templates/error/error.html',
            controller: 'ErrorController'
        });

        $routeProvider.when('/search', {
            templateUrl: 'components/searchresults/search.html',
            controller: 'SearchController as ctrl'
        });

        $routeProvider.when('/:lessonId/:lessonName?', {
            templateUrl: 'templates/lesson/lesson.html',
            controller: 'LessonController'
        });

        $routeProvider.otherwise({
            templateUrl: 'templates/home/home.html',
            controller: 'HomeController'
        });
    }
})(angular);