'use strict';

(function () {
    // Declare app level module which depends on views, and components
    angular.module('scDocumentation', [
        'ngRoute',
        'ngSanitize',
        'sociocortex',
        'ngMaterial'
    ]).value('scConnection', {
        baseUri: 'https://server.sociocortex.com',
        apiVersion: 'v1'
    }).constant('scDocConfig', {
        workspace: {id: '28otxru3bnn1'}
    });
})();
