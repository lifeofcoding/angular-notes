angular.module('notesApp', []);
angular.module('notesApp', ['ui.router']).config(['$stateProvider','$urlRouterProvider', function($statePrvider, $urlRouterProvider){
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
(function(angular){
    'use strict';
    angular.module('notesApp').controller('homeController', ['notes', function(notes){
        
    }]);
})(angular);
(function(angular){
    'use strict';
    angular.module('notesApp').controller('notesController', ['notes', function(notes){
        this.notes = notes;
    }]);
})(angular);


(function(angular){
    'use strict';
    angular.module('notesApp').factory('notes', ['$http', function($http){
        var self = this;
        this.notes = [];
        this.makeRequest = function(method, url, callback){
            $http[method](url).success(function(serverResponse){
                callback(serverResponse);
            });
        }
        this.fetch = function(){
            this.makeRequest('get', '/notes', function(response){
                self.notes = response;
            });
        }
        this.addNote = function(newItem){
            this.notes.push(newItem);
        }
        this.remove = function(note){
            this.makeRequest('delete', '/notes/' + note['_id'], function(response){
                self.notes.splice(self.notes.indexOf(note), 1);
            });
        }
        this.fetch();
        return this;
    }]);
})(angular);