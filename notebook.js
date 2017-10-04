angular
.module ('notebook', [])
.controller('notebookController', notebookController)
.factory('NoteService', NoteService);

// function notebookController($scope, NoteService) {
// $scope.notes = NoteService.notes;
// $scope.addNote = function () {
//     let newNote = {
//         'text' : $scope.newNote,
//         'id' : new Date(),
//         'modified' : '',}
//     NoteService.notes.push(newNote);
//     $scope.newNote = {};
//     }
    
// }


function startNotes() {
    if (localStorage.getItem('oldNotes')){
        NoteService.notes = (JSON.parse(localStorage.getItem('oldNotes')));
    }
}

function Note (text) {
    let Note = {
        'date' : new Date (),
        'note' : text.text,
        'modified' : '',
    };
    return Note;
}

function notebookController($scope, NoteService) {
    $scope.notes = NoteService.notes;
    $scope.onBlur = function () {
        if ($scope.newNote && typeof $scope.newNote.text != 'undefined') {
            let note = Note($scope.newNote);
            NoteService.notes.push(note);
            $scope.newNote = {};
            localStorage.setItem('oldNotes', JSON.stringify($scope.notes));
        }}
        
    $scope.update = function (text) { $scope.newNote = {text}; $scope.modified = true;}
}


function NoteService() {
    if (localStorage.getItem('oldNotes')){
        var notebook = {
            notes : (JSON.parse(localStorage.getItem('oldNotes')))
            
        }
        console.log(notebook);
    } else {var notebook = {
        notes: [] }
    }

return notebook;
}

//https://fiddle.jshell.net/nbg58dto/