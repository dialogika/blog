// Header
class Classes extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
              <div class="widget sidebar-widget-class  mt-4 order-1 order-md-3">
                <h3 class="sidebar-title">Our Program</h3>
                <a href="../intern/index.html" target="__blank">
                 <div class="sidePost__item third-item mt-4">
                    <div class="sidePost__content" style="">
                        <span class="tag">Internship</span>
                        <h5 class="title tgcommon__hover">Program Magang</h5>
                    </div>
                 </div>
                </a><br/>
    
                <h3 class="sidebar-title">Best Class</h3>
                <div class="sidePost-active">
      
                <a href="../program/basic-plus.html" target="__blank">
                 <div class="sidePost__item first-item mt-4">
                    <div class="sidePost__content" style="">
                        <span class="tag">Online Class</span>
                        <h5 class="title tgcommon__hover">Basic Public Speaking</h5>
                    </div>
                 </div>
                </a>
                
                <a href="../program/first-class.html" target="__blank">
                 <div class="sidePost__item swiper-slide second-item mt-4">
                    <div class="sidePost__content">
                      <spanclass="tag">Offline Class</span>
                      <h5 class="title tgcommon__hover">First Class Public Speaking</h5>
                    </div>
                  </div>
                </a>
                </div>

    `;
  }
}

//Footer


customElements.define("main-classes", Classes);
