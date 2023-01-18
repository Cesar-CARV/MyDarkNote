class ModalUpdateCNI extends ModalCNI {
    constructor(title, type, $value) {
        super(title);

        this.$btnUpdate = $c('.btn--primary', this.$modalFooter)
        this.$btnUpdate.innerText = 'Edit';

        this.$modal.addEventListener('submit', e => {
            e.preventDefault();

            if ($c('input[type="text"]', this.$modalContent).value.trim() === ''){ return; }

            let $title = $c('input[type="text"]', this.$modalContent).value.split(' ').join('-');;
            // let $value = input.value;
            let $icon = $c('input[type="radio"]:checked', this.$modalContent) ? $c('input[type="radio"]:checked', this.$modalContent)
                .nextElementSibling
                .getAttribute("class") : "";

            // console.log($title, $icon, $value);

            if (!this.storageController.updateStorageItem($title, { title: $title, icon: $icon, type: type, value: $value})) {
                return;
            }
            // document.location.href = `../../views/noteEditor.html?note=${$note}`;
            this.close();
        },false);
    }
}