class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
      `;
    }
}

customElements.define('site-header', SiteHeader);