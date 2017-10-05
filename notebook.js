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
        'id' : setId(),
        'date' : new Date (),
        'note' : text.text,
        'modified' : '',
    };
    return Note;
}

function notebookController($scope, NoteService) {
    $scope.notes = NoteService.notes;
    $scope.onBlur = function () {
        if ($scope.newNote && $scope.newNote.id) { console.log ($scope.newNote.id); updateNote($scope, $scope.newNote.id, $scope.newNote)}

        if ($scope.newNote && typeof $scope.newNote.text != 'undefined' ) {
            let note =  Note($scope.newNote);
            NoteService.notes.push(note);
            $scope.newNote = {};
            localStorage.setItem('oldNotes', JSON.stringify($scope.notes));
        }}
        
    $scope.updateNewNote = function (text, id) { $scope.newNote = {text}; $scope.newNote.id = id;}
}


function NoteService() {
    if (localStorage.getItem('oldNotes')){
        var notebook = {
            notes : (JSON.parse(localStorage.getItem('oldNotes')))
            
        }
        //console.log(notebook);
    } else {var notebook = {
        notes: [] }
    }

return notebook;
}

function updateNote ($scope, id, note) {
    
    for (var a in $scope.notes) {
        if ($scope.notes[a].id === id) { 
            $scope.notes[a].note = note.text;
            $scope.notes[a].modified = new Date ();
            localStorage.setItem('oldNotes', JSON.stringify($scope.notes));
            $scope.newNote = {};
        }       
    }
}

function setId() {
    return new Date().getTime();
}