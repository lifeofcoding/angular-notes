(function(angular){
    'use strict';
    
    angular.module('notesApp').controller('notesController', ['notes', 'modalService', function(notes, modalService){
        this.notes = notes;
        this.editNote = function(note){
            var modalOptions = {};
            modalService.showModal({}, note).then(function (result) {
                result['_id'] = note['_id'];
                notes.editNote(result);
            });
        }
    }]);
})(angular);