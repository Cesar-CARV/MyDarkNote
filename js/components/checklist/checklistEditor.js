const urlQuery = window.location.search.substring(1);
let title = urlQuery.split('=')[1];
title = title.replace(/%C3%B1/gi,"ñ");

const storageController = new StorageController();

const $btnSaveChecklist = $('#btn-save-checklist');
const $btnCancel = $('#btn-cancel-checklist');
const $btnEdit = $('#btn-edit-checklist');
const $btnDelete = $('#btn-delete-checklist');
const $formAddNewCheckItem = $("#form-add-new-check-item");
const $inputAddNewCheckItem = $c("input[type='text']", $formAddNewCheckItem);

const $domCheckList = $(".checklist");
const checklist = storageController.getStorageItem(title);

let modal;

let tempCheckList = new Set([...checklist.value]);
let output;

const updateOutput = () => output = new Array(...tempCheckList);


const renderItem = (item) => { // input json
    let render = document.createElement('li');
    render.setAttribute('class','checklist__item');
    render.innerHTML = `
    <div class="check-item">
        <label class="check-item__label">
            <input type="checkbox" class="check-item__checkbox" value="${item.value}" ${item.checked ? 'checked': '' }>
            <span class="check-item__title">${item.value}</span>
        </label>
        <button class="check-item__delte-button btn btn--dark">x</button>
    </div>`;    

    $domCheckList.appendChild(render);

    let $inputCheckbox = $c('.check-item__checkbox', render);
    $inputCheckbox.addEventListener('click', e => {
        tempCheckList.delete(item);
        item.checked = $inputCheckbox.checked;
        tempCheckList.add(item);
        updateOutput();
    });

    let $btnDeleteItem = $c('.check-item__delte-button', render);
    $btnDeleteItem.addEventListener('click', e => {
        console.log(item);
        tempCheckList.delete(item);
        updateOutput();
        renderList();
        console.log("delete");
    });
}

const renderList = () => {
    updateOutput();
    $domCheckList.innerHTML = "";

    output.forEach(item => renderItem(item));

    console.log("renderlist");
}
renderList();

$formAddNewCheckItem.addEventListener('submit', e => {
    e.preventDefault();
    updateOutput();
    let value = $inputAddNewCheckItem.value;
    $inputAddNewCheckItem.value = "";

    if (value === '') { return; }
    if (output.filter(item => item.value === value).length !== 0 ) { return; }

    let newItem = { "value": value, "checked": false };
    tempCheckList.add(newItem);
    renderList();
    console.log("add");
    $inputAddNewCheckItem.focus();
});

$btnSaveChecklist.addEventListener('click', e => {
    updateOutput();
    storageController.updateStorageItem(title, { title: title, icon: checklist.icon, type: "checklist", value: output});
    new Alert("Save", "the checklist was saved.", "msg");
});

$btnCancel.addEventListener('click', e => {
    document.location.href = `../../views/checklist/checklist.html`;
});

$btnEdit.addEventListener('click', e => {
    modal = new ModalUpdateCNI('Edit CheckList', "checklist", checklist.value);
    updateOutput();
    $c('input[type="text"]', modal.$modalContent).value = title;
    $c('input[type="text"]', modal.$modalContent).setAttribute('readonly', '');
    modal.show();
});

let askDelete = undefined;
$btnDelete.addEventListener('click', e => {
    if (askDelete) { return }
    askDelete = new Alert('Alert!', "Delete this checklist?", "ask");
    askDelete.ok = () => {
        storageController.removeStorageItem(title);
        document.location.href = `../../views/checklist/checklist.html`;
        askDelete = undefined;
    };
    askDelete.cancel = () => {
        askDelete = undefined;
    }
});
