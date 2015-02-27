(function(angular){
    'use strict';
    angular.module('notesApp').controller('ModalCtrl', ['modalService', 'notes', '$scope', function(modalService, notes, scope){
        var modalOptions = {};
        scope.open = function(){
            modalService.showModal({}, modalOptions).then(function (result) {
                notes.createNote(result);
            });
        }
    }]);
})(angular);