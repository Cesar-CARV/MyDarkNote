const $btnCreateNewNote = $('.btn--primary');
const type = "note";
const modal = new ModalCNI("Create a new note", type, "../../views/notes/noteEditor.html?note=");

renderFilters();
let items = getItemsBy(type);
renderCardItems(items);


$btnCreateNewNote.addEventListener('click', e => {
    modal.show();
});


// storageController.saveStorageItemCategorie('a','bi bi-x');
// storageController.saveStorageItemCategorie('b','bi bi-x');
// storageController.saveStorageItemCategorie('c','bi bi-send-check');

// storageController.removeStorageItemCategorie('b');

// storageController.updateStorageItemCategorie('a', 'bi bi-people-fill');