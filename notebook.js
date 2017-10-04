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
        if ($scope.newNote.id) {updateNote($scope.newNote.id, $scope.newNote)}

        if ($scope.newNote && typeof $scope.newNote.text != 'undefined') {
            let note = Note($scope.newNote);
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
        console.log(notebook);
    } else {var notebook = {
        notes: [] }
    }

return notebook;
}

function updateNote (id, note) {
    var updateNotes = NoteService.notes;
    for (var a in updateNotes) {
        if (updateNotes[a].id = id) { console.log(updateNotes[a])}
    }
    
    
}

function setId() {
    return new Date().getTime();
}