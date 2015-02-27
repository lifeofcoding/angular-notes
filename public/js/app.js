angular.module('notesApp', ['ui.router', 'ui.bootstrap']).config(['$stateProvider','$urlRouterProvider', function($statePrvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $statePrvider.state('home', {
        url: '/home',
        templateUrl: './templates/homepage-tpl.html',
        controller: 'homeController',
        controllerAs: 'homeCtl'
    });
    
    $statePrvider.state('notes', {
        url: '/notes',
        templateUrl: './templates/notes-tpl.html',
        controller: 'notesController',
        controllerAs: 'notesCtl'
    });
    
}]);