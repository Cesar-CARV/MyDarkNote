class StorageController {

    #categoriesName;
    constructor() {
        console.log("storageController create!!!");
        this.#categoriesName = "CATEGORIES-CUSTOM__qjdpj3jjfvgsakap973";

        if (!this.#storageItemExist(this.#categoriesName)) {
            this.saveStorageItem(this.#categoriesName, 
                { 
                    title: this.#categoriesName,
                    ctg: [
                        
                    ] 
                });
        }
    }

    #storageItemExist = (name) => localStorage.getItem(name);

    getStorageItem = (name) => {
        if (this.#storageItemExist(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return false;
    }

    getStorageItemAll = (type = '', icon = '') => {
        if (localStorage.length === 0) { return false; }

        let reps = "r".repeat(localStorage.length);
        icon = icon.replace('+', ' ');
        return [...reps
            .split('')
            .map((r, i) => this.getStorageItem(localStorage.key(i)))
            .filter(item => icon !== '' ? item.icon === icon : true)
            .filter(item => type !== '' ? item.type === type : true)
            .filter(item => item.title !== this.#categoriesName)];
    }

    saveStorageItem = (name, value) => {
        if (this.#storageItemExist(name)) {
            return false;
        }
        localStorage.setItem(name, JSON.stringify(value));
        return true;
    }

    removeStorageItem = (name) => {
        if (!this.#storageItemExist(name)) { return false; }

        localStorage.removeItem(name);

        return true;
    }

    updateStorageItem = (name, value) => {
        if (!this.#storageItemExist(name)) { return false; }

        this.removeStorageItem(name);
        this.saveStorageItem(name, value);

        return true;
    }

    clearSorage = () => {
        localStorage.clear();
    }


    // Custom categories
    getStorageItemCategories = () => {
        if (!this.#storageItemExist(this.#categoriesName)) { return []; }
        return this.getStorageItem(this.#categoriesName).ctg;
    }

    getStorageItemCategory = (name) => {
        if (!this.#storageItemExist(this.#categoriesName)) { return false; }
        let entries = Object.entries(this.getStorageItem(this.#categoriesName).ctg);
        let category = entries.filter(c => c[1].name === name);
        return category.length > 0 ? category[0][1] : false;
    }

    saveStorageItemCategorie = (name, value) => {
        let categories = this.getStorageItem(this.#categoriesName);
        if (categories.ctg.filter(c => c.name === name).length !== 0) { return false; }
        let updateCategories = { title: this.#categoriesName, ctg: [...categories.ctg, { name, value }] }

        this.removeStorageItem(this.#categoriesName);
        this.saveStorageItem(this.#categoriesName, updateCategories);

        return true;
    }

    removeStorageItemCategorie = (name) => {
        if (!this.#storageItemExist(this.#categoriesName)) { return; }

        let categories = this.getStorageItem(this.#categoriesName);
        categories.ctg = categories.ctg.filter(c => c.name !== name);
        this.removeStorageItem(this.#categoriesName);
        this.saveStorageItem(this.#categoriesName, categories);
    }
}