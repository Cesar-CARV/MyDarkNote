const $btnCreateNewChecklist = $('.btn--primary');
const type = "checklist";
const url = "../../views/checklist/checklistEditor.html?$checklist=";
const modal = new ModalCNI("Create a new cehcklist", type, url);

renderFilters();
let items = getItemsBy(type);
renderCardItems(items);


$btnCreateNewChecklist.addEventListener('click', e => {
    modal.show();
});
