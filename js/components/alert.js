class Alert {
    constructor(title, msg, type) {
        this.title = title;
        this.msg = msg;
        this.type = type;
        this.TYPES = { msg: "msg", ask: "ask" };
        this.alertHtml = document.createElement('div');
        this.alertHtml.setAttribute('class', 'alert');

        this.#show();

        this.result = undefined;
        this.ok = () => { };
        this.cancel = () => { };
    }

    #createContainer = () => {
        if ($('.alert-container')) { return; }

        let alertContainer = document.createElement('div');
        alertContainer.setAttribute('class', 'alert-container');
        document.body.appendChild(alertContainer);
    }

    #show = () => {
        this.#createContainer();
        let container = $('.alert-container');
        this.alertHtml.innerHTML = `
            <div class="alert-header">
                <span>${this.title}</span>
                <button class="btn btn--primary"><i  class="bi bi-x"></i></button>
            </div>
            <div class="alert-body">
                <p>${this.msg}</p>
            </div>
            <div class="alert-footer">
                ${this.type === this.TYPES.ask ? "<button class='btn btn--dark'>cancel</button> <button class='btn btn--secundary'>ok</button>" : ""}
            </div>
        `;

        let btnClose = $c('.btn', this.alertHtml);
        btnClose.addEventListener('click', e => {
            this.result = false;
            this.close();
        });

        let btnCancel = $c('.btn--dark', this.alertHtml);
        if (btnCancel) {
            btnCancel.addEventListener('click', e => {
                this.result = false;
                this.close();
            });
        }

        let btnOk = $c('.btn--secundary', this.alertHtml);
        if (btnOk) {
            btnOk.addEventListener('click', e => {
                this.result = true;
                this.close();
            });
        }

        if (this.type === this.TYPES.msg) {
            setTimeout(this.close, 5000);
        }

        container.appendChild(this.alertHtml);
    }

    close = () => {
        this.alertHtml.classList.add('alert--close');

        
        setTimeout(() => {
            if (this.result) { this.ok(); }
            if (!this.result) { this.cancel(); }
            let container = $('.alert-container');
            container.removeChild(this.alertHtml);
        }, 500);
    }
}