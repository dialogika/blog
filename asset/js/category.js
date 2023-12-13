// Header
class Category extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `

                    <div class="sidebar-item categories mt-4">
                      <h3 class="sidebar-title">Categories</h3>
                      <ul class="mt-3">
                        <li><a href="#">Confidence </a></li>
                        <li><a href="#">Interview </a></li>
                        <li><a href="#">Productivity </a></li>
                        <li><a href="#">Introvert </a></li>
                        <li><a href="#">Communication </a></li>
                        <li><a href="#">Presentation </a></li>
                      </ul>
                    </div>

    `;
  }
}

//Footer


customElements.define("main-category", Category);
