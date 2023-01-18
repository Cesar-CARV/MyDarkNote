const storageController = new StorageController();

const rendercategories = () => {
    let queryValue = window.location.search.substring(1).split('=')[1];
    let categories = storageController.getStorageItemCategories();

    if (queryValue) {
        categories = categories.filter(cate => cate.name.includes(queryValue));
    }

    $(".categories").innerHTML = `
        ${categories.map(category => (`
            <button class="categories__item btn">
                <i class="${category.value}"></i>
                <span>${category.name}</span>
            </button>
        `)).join('')}
    `;

    $$c(".categories__item", $(".categories")).forEach(btn => {
        btn.addEventListener('click', e => {
            let name = btn.children[1].innerText;
            new Alert("Alert",`Delete ${name} ?` , "ask").ok = () => {
                storageController.removeStorageItemCategorie(name);
                rendercategories();
                new Alert("Deleted",`The category ${name} was deleted` , "msg")
            };
        });
    });
}

rendercategories();

const btnNewCategory = $("#btn-new-category");
let modal = new ModalCategory('Create a new category');

modal.cb = () => {
    rendercategories();
}

btnNewCategory.addEventListener('click', e => {
    modal.show();
});