class ModalCategory extends Modal{
    constructor(title) {
        super(title);
        this.cb = () => {};
        this.defaulIcons = [
            {"name":"films","value":"bi bi-camera-video-fill"},
            {"name":"friends","value":"bi bi-people-fill"},
            {"name":"travel","value":"bi bi-airplane-fill"},
            {"name":"shop","value":"bi bi-bag-fill"},
            {"name":"party","value":"bi bi-balloon-fill"},
            {"name":"aniversary","value":"bi bi-balloon-heart-fill"},
            {"name":"music","value":"bi bi-music-note-beamed"},
            {"name":"car","value":"bi bi-car-front-fill"},
            {"name":"money","value":"bi bi-coin"},
            {"name":"games","value":"bi bi-dpad-fill"},
            {"name":"love","value":"bi bi-heart-fill"},
            {"name":"house","value":"bi bi-house-fill"},
            {"name":"bug","value":"bi bi-bug-fill"}
        ]

        this.appendContent(`
            <div class="container">
                <div>
                    <span>Title:</span>
                    <input type="text" placeholder="Title" minlength="3" maxlength="30" autofocus required title="a title of 5 - 30 characters">
                </div>
                <br>
                <div>
                    <span>Icon:</span>
                    <div>
                        <input type="text" placeholder="bi bi-heart-fill (OPTIONAL)" title="[OPTIONAL] Boostrap icon class">
                        <a class="btn btn--primary" target="_blanck" href="https://icons.getbootstrap.com/"><i class="bi bi-bootstrap-fill"></i></a>
                    </div>
                </div>
            </div>

            <p>Iconos:</p>
            <ul class="modal__list-icons">
                ${this.defaulIcons.map( (c, i) => {
                    return `
                    <li>
                        <label title="${c.name}">
                            <input type="radio" name="icon" required ${i === 0 ? "checked": ""}>
                            <i class="${c.value}"></i>
                        </label>
                    </li>
                    `
                }).join('')}
            </ul>
        `);

        this.appendFooter(`
            <button type="button" class="btn btn--secundary">Cancel</button>
            <button type="submit" class="btn btn--primary">Create</button>
        `);

        const $btnCancel = $c('.btn--secundary', this.$modalFooter);
        $btnCancel.addEventListener('click', e => {
            this.close();
        },false);

        this.$modal.addEventListener('submit', e => {
            e.preventDefault();

            if ($c('input[type="text"]', this.$modalContent).value.trim() === ''){ return; }

            let $title = $c('input[type="text"]', this.$modalContent).value.split(' ').join('-');;
            let $icon = $c('input[type="radio"]:checked', this.$modalContent) ? $c('input[type="radio"]:checked', this.$modalContent)
                .nextElementSibling
                .getAttribute("class") : "";
            
            if ($$c('input[type="text"]', this.$modalContent)[1].value !== ''){
                $icon = $$c('input[type="text"]', this.$modalContent)[1].value;
            }

            if (!this.storageController.getStorageItemCategory($title)){
                this.storageController.saveStorageItemCategorie($title, $icon);
                this.close(this.cb());
                new Alert("Created", "The category was created :D", "msg");
                return;
            }

            new Alert("Error", "Category repeated", "msg");

            this.close();
        }, false);        
    }
}
