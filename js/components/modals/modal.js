class Modal {
    constructor(title) {
        this.title = title;
        this.storageController = new StorageController();
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'modal-container');
        this.#createmodal();

        this.$modal = $c('.modal', this.container);
        this.$modalHeader = $c('.modal__header', this.$modal);
        this.$modalContent = $c('.modal__content', this.$modal);
        this.$modalFooter = $c('.modal__footer', this.$modal);
        this.$modalHeaderBtnClose = $c('.btn--close', this.$modalHeader);

        this.$modalHeaderBtnClose.addEventListener('click', e => {
            this.close();
        },false);

        this.container.appendChild(this.$modal);
    }

    #createmodal = () => {
        this.container.innerHTML = `
        <form class="modal">
            <div class="modal__header">
                <h3>${this.title}</h3>
                <button type="button" class="btn btn--close">x</button>
            </div>
            <div class="modal__content">

            </div>
            <div class="modal__footer">

            </div>
        </form>
        `;
    }

    appendContent = content => {
        this.$modalContent.innerHTML = content;
    }

    appendFooter = footer => {
        this.$modalFooter.innerHTML = footer;
    }

    show = cb => {
        if (cb) { cb(); }
        document.body.appendChild(this.container);
    }

    close = (cb) => {
        if (cb) { cb(); }
        document.body.removeChild(this.container);

    }

}