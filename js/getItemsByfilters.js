const storageController = new StorageController();

const renderFilters = () => {
    let filters = storageController.getStorageItemCategories();
    filters.forEach(f => {
        $('#filters__select').innerHTML += `<option value="${f.value}" name="filters">${f.name}</option>`;
    });
}

const getItemsBy = (type) => {
    let query = window.location.search.substring(1).split('=')[0];
    let queryValue = window.location.search.substring(1).split('=')[1];

    if (queryValue === '' || !queryValue) { return storageController.getStorageItemAll(type); }
    if (query === 'filters') { return storageController.getStorageItemAll(type, queryValue); }
    if (query === 'search') { return storageController.getStorageItemAll(type).filter(stm => stm.title.includes(queryValue)); }
}