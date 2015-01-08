//Controllers

// Creación del módulo que engloba todos los controllers
var app = angular.module('app', ['ngRoute','ngTagsInput']);

// Configuración de las rutas
app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl	: '../partials/home.html',
            controller 	: 'mainCtrl'
        })
        .when('/image-upload', {
            templateUrl	: '../partials/image-upload.html',
            controller 	: 'add-imageCtrl'
        })
        .when('/about', {
            templateUrl : '../partials/about.html',
            controller 	: 'aboutCtrl'
        })
        .when('/contact', {
            templateUrl : '../partials/contact.html',
            controller 	: 'contactCtrl'
        })
        .when('/images', {
            templateUrl : '../partials/search_results.html',
            controller 	: 'imageCtrl'
        })
        .when('/search_results/:keyword', {
            templateUrl : '../partials/search_results.html',
            controller 	: 'searchCtrl'
        })
        .when('/edit-image/:imageId', {
            templateUrl : '../partials/image-upload.html',
            controller 	: 'edit-imageCtrl'
        })
        .when('/detailed-image/:imageId', {
            templateUrl : '../partials/detailed-image.html',
            controller 	: 'detailed-imageCtrl'
        })
        .when('/delete-image/:imageId', {
            templateUrl : '../partials/search_results.html',
            controller 	: 'imageCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

