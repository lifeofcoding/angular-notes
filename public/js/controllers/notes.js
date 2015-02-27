(function(angular){
    'use strict';
    
    angular.module('notesApp').controller('notesController', ['notes', 'modalService', function(notes, modalService){
        this.notes = notes;
        this.editNote = function(note){
            modalService.showModal({}, note).then(function (result) {
                result = angular.extend({}, note, result);
                notes.editNote(result);
            });
        }
    }]);
})(angular);