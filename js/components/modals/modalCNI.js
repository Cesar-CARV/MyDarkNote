class ModalCNI extends Modal {
    constructor(title, type, href) {
        super(title);
        this.type = type;
        this.href = href;

        this.appendContent(`
            <span>Title:</span>
            <input type="text" placeholder="Title" minlength="5" maxlength="30" autofocus required title="a title of 5 - 30 letters">
            
            <p>Icono:</p>
            <ul class="modal__list-icons">
                ${this.storageController.getStorageItemCategories().map((c, i) => {
            return `
                    <li>
                        <label title="${c.name}">
                            <input type="radio" name="icon">
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
        }, false);

        let $inputTitle = $c('input[type="text"]', this.$modalContent);
        $inputTitle.addEventListener('keydown', e => {
            if (e.key === "Backspace" || e.key === " ") { return }
            let chars = "qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM1234567890";
            if (!chars.includes(e.key)) { e.preventDefault(); }
        });

        this.$modal.addEventListener('submit', e => {
            e.preventDefault();

            if ($c('input[type="text"]', this.$modalContent).value.trim() === '') { return; }

            let $title = $c('input[type="text"]', this.$modalContent).value.split(' ').join('-');;
            let $icon = $c('input[type="radio"]:checked', this.$modalContent) ? $c('input[type="radio"]:checked', this.$modalContent)
                .nextElementSibling
                .getAttribute("class") : "";

            if (!this.storageController.saveStorageItem(
                $title,
                {
                    title: $title,
                    icon: $icon,
                    type: this.type,
                    value: this.type === "checklist" ? [] :
                        this.type === "table" ? { header: [""], body: [] } :
                            ""
                })) {
                return;
            }

            document.location.href = this.href + $title;
            this.close();
        }, false);
    }
}
