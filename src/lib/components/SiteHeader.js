class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        </header>
      `;
    }
}

customElements.define('site-header', SiteHeader);