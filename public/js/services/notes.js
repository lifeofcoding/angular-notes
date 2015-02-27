(function(angular){
    'use strict';
    angular.module('notesApp').factory('notes', ['$http', function($http){
        var self = this;
        this.notes = [];
        this.fetch = function(){
            $http.get('/notes').success(function(serverNotes){
                self.notes = serverNotes;
            });
        }
        this.addNote = function(newItem){
            this.notes.push(newItem);
        }
        this.remove = function(note){
            $http.delete('/notes/' + note['_id']).success(function(serverNotes){
                self.notes.splice(self.notes.indexOf(note), 1);
            });
        }
        this.fetch();
        return this;
    }]);
})(angular);