class NotFound extends HTMLElement{
    connectedCallback(){
        this.innerHTML = '<p>Not a valid page</p>'
    }
}

customElements.define('not-found', NotFound);