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
        this.createNote = function(note){
            $http.post('/notes', note).success(function(data, status, headers, config) {
                self.notes.push(data);
            });
        }
        this.remove = function(note){
            this.makeRequest('delete', '/notes/' + note['_id'], function(response){
                self.notes.splice(self.notes.indexOf(note), 1);
            });
        }
        this.editNote = function(note){
            $http.put('/notes/' + note['_id'], note).success(function(data, status, headers, config) {
                self.notes.forEach(function(obj, index){
                    if(obj['_id'] === note['_id']){
                        self.notes[index] = data;
                    }
                });
            });
        }
        this.fetch();
        return this;
    }]);
})(angular);