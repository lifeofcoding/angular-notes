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