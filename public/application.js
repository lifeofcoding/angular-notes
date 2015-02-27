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
(function(angular){
    'use strict';
    angular.module('notesApp').controller('homeController', ['notes', function(notes){
        
    }]);
})(angular);
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

(function(angular){
    'use strict';
    angular.module('notesApp').service('modalService', ['$modal', function ($modal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: './templates/modal-tpl.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.cancel = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

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