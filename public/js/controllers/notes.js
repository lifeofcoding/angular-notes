(function(angular){
    'use strict';
    angular.module('notesApp').controller('notesController', ['notes', function(notes){
        this.notes = notes;
    }]);
})(angular);