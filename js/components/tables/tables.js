const $btnCreateNewNote = $('.btn--primary');
const type = "table";
const modal = new ModalCNI("Create a new table", type, "../../views/tables/tableEditor.html?table=");

renderFilters();
let items = getItemsBy(type);
renderCardItems(items);


$btnCreateNewNote.addEventListener('click', e => {
    modal.show();
});
