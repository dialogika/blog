// Sherentina1
class Sherentina1 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="widget sidebar-widget">
                <div class="tgAbout-me">
                  <div class="tgAbout-thumb">
                    <img src="https://raw.githubusercontent.com/dialogika/blog/main/assets/img/intern/rhany.jpg"
                      class="img-thumbnail" alt="rhany">
                  </div>
                  <div class="tgAbout-info">
                    <p class="intro">Penulis <b>Sherentina Rhany</b></p>
                    <span class="designation">CONTENT WRITER - Dialogika</span>
                  </div>
                  <div class="tgAbout-social">
                    <a href="https://instagram.com/dialogika.co"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/dialogika_co"><i class="fab fa-twitter"></i></a>
                    <a href="https://facebook.com/dialgika.co"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://youtube.com/@dialogika_co"><i class="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget">
                <div class="tgAbout-me">
                  <div class="tgAbout-thumb">
                    <img src="https://raw.githubusercontent.com/dialogika/blog/main/assets/img/intern/Madhani.jpg"
                      class="img-thumbnail" alt="madhani">
                  </div>
                  <div class="tgAbout-info">
                    <p class="intro">Developer <b>Madhani</b></p>
                    <span class="designation">Developer - Dialogika</span>
                  </div>
                  <div class="tgAbout-social">
                    <a href="https://instagram.com/dialogika.co"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/dialogika_co"><i class="fab fa-twitter"></i></a>
                    <a href="https://facebook.com/dialgika.co"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://youtube.com/@dialogika_co"><i class="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
        `;
  }
}
// Sherentina1
class Sherentina2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="blog-author clearfix">
              <div class="row">
                <div class="col-md-2">
                  <img src="https://raw.githubusercontent.com/dialogika/blog/main/assets/img/intern/rhany.jpg"
                    class="rounded-circle float-left img-thumbnail" alt="Sherentina Rhany">
                </div>

                <div class="col-md-10">
                  <h4>Sherentina Rhany</h4>
                  <div class="social-links">
                    <b>Intern - CopyWriter</b>
                  </div>
                  <hr />
                  <p>Someone who likes to write in his daily life, "train yourself every day to get maximum results"</p>
                </div>
              </div>
            </div><!-- End blog author bio -->

            <div class="blog-author clearfix">
              <div class="row">
                <div class="col-md-2">
                  <img src="https://raw.githubusercontent.com/dialogika/blog/main/assets/img/intern/Madhani.jpg"
                    class="rounded-circle float-left img-thumbnail" alt="Madhani">
                </div>

                <div class="col-md-10">
                  <h4>Madhani</h4>
                  <div class="social-links">
                    <b>Intern - Developer</b>
                  </div>
                  <hr />
                  <p>live to play music " Even if the sails are torn, the rudder is broken, it is better to sink than to
                    turn around "</p>
                </div>
              </div>
            </div>
        `;
  }
}

customElements.define("main-sherentina1", Sherentina1);
customElements.define("main-sherentina2", Sherentina2);
