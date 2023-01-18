const renderCardItems = (items) => {
    if (!items[0]){ return }

    items.forEach(item => {
        let itemCard = document.createElement('div');

        itemCard.setAttribute('class', 'card');
        itemCard.setAttribute('data-type', item.type);
        // itemCard.setAttribute('style', "border: solid 1px #363636");
        itemCard.innerHTML = `
        <div class="card__header">
            <i class="${item.icon}"></i>
            <p class="card__title">${item.title}</p>
        </div>
        <div class="card__content">
            ${item.type === "note" ? `<p>${item.value.substr(0, 30) + "..."}` : ""}</p>
            ${item.type === "checklist" ? `<progress min="0" max="${item.value.length}" value="${(item.value.filter(v => v.checked === true)).length}"></progress>` : ""}
            ${item.type === "table" ? `
            <table style="border: solid 1px">
                <tr>
                    ${item.value.header.map((h, i) => i < 5 ? "<td style='border: solid 1px; padding: 3px 10px;'>" + h + "</td>" : '').toString().split(',').join('')}
                </tr>
            </table>` : ""}
        </div>
        `;

        itemCard.addEventListener('click', e => {
            let routs = {
                note: `../../views/notes/noteEditor.html?$note=${item.title}`,
                checklist: `../../views/checklist/checklistEditor.html?$checklist=${item.title}`,
                table: `../../views/tables/tableEditor.html?$table=${item.title}`
            }

            document.location.href = routs[item.type]
        });

        $('.cards').appendChild(itemCard);
    });
}