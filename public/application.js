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
        this.getNotes = function(){
                
        }
        this.fetch = function(){
            $http.get('/notes').success(function(serverNotes){
                self.notes = serverNotes;
            });
        }
        this.addNote = function(newItem){
            this.notes.push(newItem);
        }
        this.remove = function(note){
            this.notes.splice(this.notes.indexOf(this.note), 1);
        }
        this.fetch();
        return this;
    }]);
})(angular);