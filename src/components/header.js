class Header extends HTMLElement{
    connectedCallback() {
      let activePath = location.pathname;
      let activepage = 'class="nav-link active" aria-current="page"';
      let nonActive = 'class="nav-link"';

      this.innerHTML = `<nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Pokemon Finder</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a ${activePath === "/" ? activepage : nonActive} href="/">Home</a>
            </li>
            <li class="nav-item">
              <a ${activePath === "/search" ? activepage : nonActive} href="/search">Search</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
    }
  
    render(source){
      this.innerHTML = source
    }
}

customElements.define('app-header', Header);