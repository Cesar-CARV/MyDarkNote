let urlQuery = window.location.search.substring(1);
let title = urlQuery.split('=')[1];
title = title.replace(/%C3%B1/gi,"ñ");


const $btnSaveNote = $('#btn-save-note');
const $btnCancel = $('#btn-cancel-note');
const $btnEdit = $('#btn-edit-note');
const $btnDelete = $('#btn-delete-note');
const $textEditor = $('#note-editor__text');

const storageController = new StorageController();
const note = storageController.getStorageItem(title);

$textEditor.value = note.value;

const modal = new ModalUpdateCNI('Edit Note', "note", $textEditor.value);//ModalUpdateNote('Editar nota');


$btnSaveNote.addEventListener('click', e => {
    storageController.updateStorageItem(title, { title: title, icon: note.icon, type: "note", value: $textEditor.value });
    new Alert("Save", "the note was saved.", "msg");
});

$btnCancel.addEventListener('click', e => {
    document.location.href = `../../views/notes/notes.html`;
});

$btnEdit.addEventListener('click', e => {
    $c('input[type="text"]', modal.$modalContent).value = title;
    $c('input[type="text"]', modal.$modalContent).setAttribute('readonly', '');
    modal.show();
});


let askDelete = undefined;
$btnDelete.addEventListener('click', e => {
    if (askDelete) { return }
    askDelete = new Alert('Alert!', "Delete this note?", "ask");
    askDelete.ok = () => {
        storageController.removeStorageItem(title);
        document.location.href = `../../views/notes/notes.html`;
        askDelete = undefined;
    };
    askDelete.cancel = () => {
        askDelete = undefined;
    }
});
