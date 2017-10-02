angular
.module ('notebook', [])
.controller('notebookController', notebookController)
.factory('NoteService', NoteService);

function notebookController($scope, NoteService) {
$scope.notes = NoteService.notes;
$scope.addNote = function () {
    let newNote = {
        'text' : $scope.newNote,
        'id' : new Date(),
        'modified' : '',}
    NoteService.notes.push(newNote);
    $scope.newNote = {};
    }
    
}

function NoteService() {
var service = {
    notes: []
};

return service;
}
