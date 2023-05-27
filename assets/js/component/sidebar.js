// Sidebar
class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <aside class="blog-sidebar">
              <div class="widget sidebar-widget">
                <div class="tgAbout-me">
                  <div class="tgAbout-thumb">
                    <img src="assets/img/logo-square.png" class="img-thumbnail" alt="EDIT">
                  </div>
                  <div class="tgAbout-info">
                    <p class="intro">Welcome to <b>Dialogika</b> Blog</p>
                    <span class="designation">Sound Your Mind</span>
                  </div>
                  <div class="tgAbout-social">
                    <a href="https://instagram.com/dialogika.co"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/dialogika_co"><i class="fab fa-twitter"></i></a>
                    <a href="https://facebook.com/dialgika.co"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://youtube.com/@dialogika_co"><i class="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget"
                style="border-radius:8px; -box-shadow: 0px 9px 16px -6px rgba(231, 24, 26, 1);-webkit-box-shadow: 0px 9px 16px -6px rgba(231, 24, 26, 1);-moz-box-shadow: 0px 9px 16px -6px  rgba(231, 24, 26, 1);">
                <div class="sidePost-active">
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/basic-p/small.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/program/basic-plus.html" class="tag">Online Class</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/program/basic-plus.html"
                          target="__blank">Kelas Basic : Public Speaking Dialogika, Bergaransi, Selama Sebulan</a></h5>
                    </div>
                  </div>
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/first-c/home.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/program/first-class.html" class="tag">Offline Class</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/program/first-class.html"
                          target="__blank">Kelas Offline Public Speaking di Jogja, Bergaransi Selama 2 Bulan, Seat
                          Terbatas</a></h5>
                    </div>
                  </div>
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/kids-c/banner.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/subscribe/kids-play.html" class="tag">Kelas Anak</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/subscribe/kids-play.html"
                          target="__blank">Kursus Public Speaking Online Anak Selama Sebulan dari umur 5 hingga 15
                          tahun</a></h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget blog-details-area">
                <div class="sidebarInsta__wrap">
                  <div class="sidebarInsta__top">
                    <div class="sidebarInsta__logo">
                      <img src="assets/img/logo-square.png" alt="EDIT">
                    </div>
                    <div class="blog-details-area sidebarInsta__info">
                      <h6 class="name"><a href="https://instagram.com/dialogika.co">@dialogika.co</a></h6>
                      <span class="designation">Kelas Public Speaking Jogja</span>
                    </div>
                  </div>
                  <div class="sidebarInsta__slider-wrap">
                    <div class="swiper-container sidebarInsta-active">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/p/CoJeVGjLVZJ/?utm_source=ig_web_copy_link"
                            target="_blank"><img src="assets/img/instagram/01.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/02.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/03.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/04.jpg" alt="EDIT"></a>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-container sidebarInsta-active-2" dir="rtl">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/05.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/06.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/07.jpg" alt="EDIT"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="assets/img/instagram/08.jpg" alt="EDIT"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sidebarInsta__bottom">
                    <a href="https://www.instagram.com/dialogika.co" target="_blank" class="btn"><i
                        class="fab fa-instagram"></i><span class="text">Follow Us</span></a>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget widget_categories">
                <h4 class="widget-title">Follow Us</h4>
                <ul class="list-wrap">
                  <li class="align-items-center">
                    <div class="thumb"><a href="https://tiktok.com/@dialogika.co"><i class='bx bxl-tiktok'></i></a>
                    </div>
                    <b><a href="https://tiktok.com/@dialogika.co">Tiktok</a></b>
                    <span class="float-right">9,57K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://instagram.com/dialogika.co"><i
                          class='bx bxl-instagram-alt'></i></a></div>
                    <b><a href="https://instagram.com/dialogika.co">Instagram</a></b>
                    <span class="float-right">13,78K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://twitter.com/dialogika_co"><i class='bx bxl-twitter'></i></a>
                    </div>
                    <b><a href="https://twitter.com/dialogika_co">Twitter</a></b>
                    <span class="float-right">0.23K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://facebook.com/dialogika.co"><i
                          class='bx bxl-facebook-circle'></i></a></div>
                    <b><a href="https://facebook.com/dialogika.co">Facebook</a></b>
                    <span class="float-right">0.42K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://youtube.com/@dialogika_co"><i class='bx bxl-youtube'></i></a>
                    </div>
                    <b><a href="https://youtube.com/@dialogika_co">Youtube</a></b>
                    <span class="float-right">0.03K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://linkedin.com/company/dialogika"><i
                          class='bx bxl-linkedin-square'></i></a></div>
                    <b><a href="https://linkedin.com/company/dialogika">LinkedIn</a></b>
                    <span class="float-right">2.72K</span>
                  </li>
                </ul>
              </div>
            </aside>
    `;
  }
}

// Details
class Details extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="blog-details-social">
              <ul class="list-wrap">
                <li><a href="https://facebook.com/dialogika.co" target="__blank"><i class="fab fa-facebook-f"></i></a>
                </li>
                <li><a href="https://twitter.com/dialogika_co" target="__blank"><i class="fab fa-twitter"></i></a></li>
                <li><a href="https://linkedin.com/company/dialogika" target="__blank"><i
                      class="fab fa-linkedin-in"></i></a></li>
                <li><a href="https://tiktok.com/@dialogika.co" target="__blank"><i class="fab fa-tiktok"></i></a></li>
                <li><a href="https://instagram.com/dialogika.co" target="__blank"><i class="fab fa-instagram"></i></a>
                </li>
              </ul>
            </div>
    `;
  }
}
// Details
class Content_Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="widget sidebar-widget"
                style="border-radius:8px; -box-shadow: 0px 9px 16px -6px rgba(231, 24, 26, 1);-webkit-box-shadow: 0px 9px 16px -6px rgba(231, 24, 26, 1);-moz-box-shadow: 0px 9px 16px -6px  rgba(231, 24, 26, 1);">
                <div class="sidePost-active">
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/basic-p/small.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/program/basic-plus.html" class="tag">Online Class</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/program/basic-plus.html"
                          target="__blank">Kelas Basic : Public Speaking Dialogika, Bergaransi, Selama Sebulan</a></h5>
                    </div>
                  </div>
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/first-c/home.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/program/first-class.html" class="tag">Offline Class</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/program/first-class.html"
                          target="__blank">Kelas Offline Public Speaking di Jogja, Bergaransi Selama 2 Bulan, Seat
                          Terbatas</a></h5>
                    </div>
                  </div>
                  <div class="sidePost__item"
                    data-background="https://dialogika.co/assets/img/program/kids-c/banner.jpg">
                    <div class="sidePost__content">
                      <a href="https://dialogika.co/subscribe/kids-play.html" class="tag">Kelas Anak</a>
                      <h5 class="title tgcommon__hover"><a href="https://dialogika.co/subscribe/kids-play.html"
                          target="__blank">Kursus Public Speaking Online Anak Selama Sebulan dari umur 5 hingga 15
                          tahun</a></h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget blog-details-area">
                <div class="sidebarInsta__wrap">
                  <div class="sidebarInsta__top">
                    <div class="sidebarInsta__logo">
                      <img src="https://dialogika.co/blog/assets/img/logo-square.png"
                        alt="Logo Kelas Public Speaking Dialogika">
                    </div>
                    <div class="blog-details-area sidebarInsta__info">
                      <h6 class="name"><a href="https://instagram.com/dialogika.co">@dialogika.co</a></h6>
                      <span class="designation">Kelas Public Speaking Jogja</span>
                    </div>
                  </div>
                  <div class="sidebarInsta__slider-wrap">
                    <div class="swiper-container sidebarInsta-active">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/p/CoJeVGjLVZJ/?utm_source=ig_web_copy_link"
                            target="_blank"><img src="https://dialogika.co/blog/assets/img/instagram/01.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/02.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/03.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/04.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-container sidebarInsta-active-2" dir="rtl">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/05.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/06.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/07.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                        <div class="swiper-slide">
                          <a href="https://www.instagram.com/dialogika.co" target="_blank"><img
                              src="https://dialogika.co/blog/assets/img/instagram/08.jpg"
                              alt="Instagram Kelas Public Speaking Jogja : Dialogika"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sidebarInsta__bottom">
                    <a href="https://www.instagram.com/dialogika.co" target="_blank" class="btn"><i
                        class="fab fa-instagram"></i><span class="text">Follow Us</span></a>
                  </div>
                </div>
              </div>
              <div class="widget sidebar-widget widget_categories">
                <h4 class="widget-title">Follow Us</h4>
                <ul class="list-wrap">
                  <li class="align-items-center">
                    <div class="thumb"><a href="https://tiktok.com/@dialogika.co"><i class='bx bxl-tiktok'></i></a>
                    </div>
                    <b><a href="https://tiktok.com/@dialogika.co">Tiktok</a></b>
                    <span class="float-right">9,57K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://instagram.com/dialogika.co"><i
                          class='bx bxl-instagram-alt'></i></a></div>
                    <b><a href="https://instagram.com/dialogika.co">Instagram</a></b>
                    <span class="float-right">13,78K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://twitter.com/dialogika_co"><i class='bx bxl-twitter'></i></a>
                    </div>
                    <b><a href="https://twitter.com/dialogika_co">Twitter</a></b>
                    <span class="float-right">0.23K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://facebook.com/dialogika.co"><i
                          class='bx bxl-facebook-circle'></i></a></div>
                    <b><a href="https://facebook.com/dialogika.co">Facebook</a></b>
                    <span class="float-right">0.42K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://youtube.com/@dialogika_co"><i class='bx bxl-youtube'></i></a>
                    </div>
                    <b><a href="https://youtube.com/@dialogika_co">Youtube</a></b>
                    <span class="float-right">0.03K</span>
                  </li>
                  <li>
                    <div class="thumb"><a href="https://linkedin.com/company/dialogika"><i
                          class='bx bxl-linkedin-square'></i></a></div>
                    <b><a href="https://linkedin.com/company/dialogika">LinkedIn</a></b>
                    <span class="float-right">2.72K</span>
                  </li>
                </ul>
              </div>
    `;
  }
}
//
class Content_Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="section-title">
                  <h2 class="kiri text-start">Rating</h2>
                  <h1 class="kiri text-start">This Blog</h1>
                  <p class="text-start">
                    Support <b>semangat penulis</b> dengan memberikan komentar dan masukan plus <b>komentarmu akan kami
                      masukkan</b> ke website ini dalam bentuk anonimus
                  </p>
                </div>
                <form action="javascript:void" method="post" id="myForm">
                  <div class="row">
                    <div class="col-md-6 form-group">
                      <input name="Domicile" type="text" class="form-control" placeholder="Kota Tempat Tinggalmu*">
                    </div>
                    <div class="col-md-6 form-group">
                      <input name="Work" type="text" class="form-control" placeholder="Profesimu Saat Ini*">
                    </div>
                  </div>
                  <select class="d-none" name="Timestamp">
                    <option id="timestamp"></option>
                  </select>
                  <select class="d-none" name="Keyword">
                    <option id="keyword">keterampilan memecahkan masalah 2</option>
                  </select>
                  <div class="row">
                    <div class="col form-group">
                      <select name="Rating" id="ratings" class="form-select" required>
                        <option value="" selected disabled value="">Rating this Blog</option>
                        <optgroup label="------------">
                          <option>★★★★★</option>
                          <option>★★★★☆</option>
                          <option>★★★☆☆</option>
                          <option>★★☆☆☆</option>
                          <option>★☆☆☆☆</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col form-group">
                      <textarea name="Comment" class="form-control" rows="7" placeholder="Komentar Anda*"></textarea>
                    </div>
                  </div>
                  <button type="submit" class="btn-primary" style="border: 0px; margin-left:0px;" data-bs-toggle="modal"
                    data-bs-target="#notifications" onclick="SubForm()">Post Comment</button>

                </form>
    `;
  }
}

customElements.define("main-sidebar", Sidebar);
customElements.define("main-details", Details);
customElements.define("content-footer", Content_Footer);
customElements.define("content-sidebar", Content_Sidebar);
