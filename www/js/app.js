
angular.module('starter', ['ionic', 'ui.router','ngMessages'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Stuff in here
        });
    })


    //Routes

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "js/partials/login.html",
                controller: 'LoginCtrl'
            })
            .state('improvements', {
                url: '/improvements',
                templateUrl: "js/partials/improvements.html",
                controller: 'ConteudoController'
            })
            .state('allimprovements', {
                url: '/allimprovements',
                templateUrl: "js/partials/allimprovements.html",
                controller: 'ConteudoController'
            })
            .state('more', {
                url: "/improvements/more/:improvement_id",
                templateUrl: "js/partials/more.html",
                controller: 'ConteudoController'
            })
            .state('graveyard', {
                url: "/graveyard",
                templateUrl: "js/partials/graveyard.html",
                controller: 'ConteudoController'
            })
            .state('whoareyou', {
                url: "/whoareyou",
                templateUrl: "js/partials/whoareyou.html",
               controller: 'UsersController'
            })

            .state('user', {
                url: "/user",
                templateUrl: "js/partials/user.html",
               controller: 'UsersController'
            })


            .state('newtask', {
                url: "/newtask",
                templateUrl: "js/partials/newtask.html",
                controller: 'ImprovementController'
            })


        $urlRouterProvider.otherwise('/login');
    });


