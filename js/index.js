let items = storageController.getStorageItemAll();

if (items.length === 0){
    new Alert("Wellcome!", "Create all your notes here ;)", "msg");
}

renderCardItems(items);