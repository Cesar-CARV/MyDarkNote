const urlQuery = window.location.search.substring(1);
let title = urlQuery.split('=')[1];
title = title.replace(/%C3%B1/gi,"ñ");

const storageController = new StorageController();

const $btnSaveTable = $('#btn-save-table');
const $btnCancel = $('#btn-cancel-table');
const $btnEdit = $('#btn-edit-table');
const $btnDelete = $('#btn-delete-table');
const $domTable = $(".table");
const $formAddNewtCR = $("#form-add-new-cr");
const $btnFormAddNewCollumn = $c("#form-add-new-cr__btn-add-collumn", $formAddNewtCR);
const $btnFormAddNewRow = $c("#form-add-new-cr__btn-add-row", $formAddNewtCR);
const table = storageController.getStorageItem(title);

let modal;

let tempTable = { ...table };
// let output;


const renderTable = (item) => { // input json
    // console.log($domTable);

    $domTable.innerHTML = "";

    let renderTop = document.createElement('tr');
    renderTop.innerHTML += "<td></td>" + item.value.header.map((x, i) => i > 0 ? `<td><button class="btn-delete-col btn" data-index="${i}">X</button></td>` : "<td></td>").join('');
    $domTable.appendChild(renderTop);

    let renderTHeader = document.createElement('tr');
    renderTHeader.innerHTML += "<td></td>";
    renderTHeader.innerHTML += `${item.value.header.map((h, i) => `<td><input type='text' class="input-coll" value='${h}' data-index="${i}"></td>`).join('')}`;
    $domTable.appendChild(renderTHeader);

    let renderTBody = item.value.body.map(() => document.createElement('tr'));
    renderTBody.forEach((tr, i) => {
        let row = item.value.body[i];
        tr.innerHTML += `<td><button class="btn-delete-row btn" data-index="${i}">X</button></td>`;
        tr.innerHTML += row.map((r, j) => `<td><input type='text' class="input-row" value='${r}' data-index="${i}" data-coll="${j}"></td>`).join('');
        $domTable.appendChild(tr);
    });

    let $btnDeleteCols = $$c(".btn-delete-col", renderTop);
    $btnDeleteCols.forEach(btn => btn.addEventListener('click', e => {
        if (tempTable.value.header.length === 1) { return; }

        tempTable.value.header.splice(e.target.dataset.index, 1);
        tempTable.value.body.forEach((x, i) => tempTable.value.body[i].splice(e.target.dataset.index, 1));
        renderTable(tempTable);
    }));

    let $btnDeleteRows = $$(".btn-delete-row");
    $btnDeleteRows.forEach(btn => btn.addEventListener('click', e => {
        tempTable.value.body.splice(e.target.dataset.index, 1);
        renderTable(tempTable);
    }));

    let inputsHeader = $$c('.input-coll', renderTHeader);
    inputsHeader.forEach(input => input.addEventListener('keyup', e => {
        tempTable.value.header[e.target.dataset.index] = e.target.value;
    }));

    renderTBody.forEach(r => {
        let inputsBody = $$c('.input-row', r);
        inputsBody.forEach((input, i) => {
            input.addEventListener('keydown', e => {
                if (!e.ctrlKey) { return; }
                let indexLimit = 2;
                let collLimit = 1;

                let index = parseInt(e.target.dataset.index) + indexLimit;
                let coll = parseInt(e.target.dataset.coll) + collLimit;

                if (e.keyCode === 37 && coll > 1) {
                    $domTable.childNodes[index].childNodes[coll - 1].lastChild.focus();
                }
                if (e.keyCode === 38 && index - 1 > 1) {
                    $domTable.childNodes[index - 1].childNodes[coll].lastChild.focus();
                }
                if (e.keyCode === 39 && $domTable.childNodes[index].childNodes[coll + 1]) {
                    $domTable.childNodes[index].childNodes[coll + 1].lastChild.focus();
                }
                if (e.keyCode === 40 && $domTable.childNodes[index + 1]) {
                    $domTable.childNodes[index + 1].childNodes[coll].lastChild.focus();
                }
            });

            input.addEventListener('keyup', e => {
                tempTable.value.body[e.target.dataset.index][i] = e.target.value;
            });
        });
    })

}

renderTable(table);

$btnFormAddNewRow.addEventListener('click', e => {
    tempTable.value.body = [...tempTable.value.body, tempTable.value.header.map(() => [""])];
    // console.log(tempTable);
    renderTable(tempTable);
});

$btnFormAddNewCollumn.addEventListener('click', e => {
    tempTable.value.header.push([""]);
    tempTable.value.body.forEach((x, i) => tempTable.value.body[i].push([""]));
    renderTable(tempTable);
});

$formAddNewtCR.addEventListener('submit', e => {
    e.preventDefault();
});

$btnSaveTable.addEventListener('click', e => {
    storageController.updateStorageItem(title, tempTable);
    new Alert("Save", "the table was saved.", "msg");
});

$btnCancel.addEventListener('click', e => {
    document.location.href = `../../views/tables/tables.html`;
});

$btnEdit.addEventListener('click', e => {
    modal = new ModalUpdateCNI('Edit Table', "table", table.value);
    // updateOutput();
    $c('input[type="text"]', modal.$modalContent).value = title;
    $c('input[type="text"]', modal.$modalContent).setAttribute('readonly', '');
    modal.show();
});

let askDelete = undefined;
$btnDelete.addEventListener('click', e => {
    if (askDelete) { return }
    askDelete = new Alert('Alert!', "Delete this table?", "ask");
    askDelete.ok = () => {
        storageController.removeStorageItem(title);
        document.location.href = `../../views/tables/tables.html`;
        askDelete = undefined;
    };
    askDelete.cancel = () => {
        askDelete = undefined;
    }
});