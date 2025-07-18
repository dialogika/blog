class PopupProgram extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <!-- Modal Iklan -->
  <div class="modal fade" id="adModal" tabindex="-1" aria-labelledby="adModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="adModalLabel">Program Kelas Online</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <a href="https://www.dialogika.co/program/basic-play.html" target="_blank">
            <img src="https://res.cloudinary.com/daqshfnz3/image/upload/f_auto,q_auto/v1/gambar-iklan/wqs6fv3coxreh6yjkvn6" class="img-fluid rounded"
              alt="Program kelas online dialogika" />
          </a>
        </div>
      </div>
    </div>
  </div>
      `;
  }
}

class FooterModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <!-- Modal HTML content -->
        <div class="modal fade overflow-hidden" id="footerSubModal" tabindex="-1" aria-hidden="true" aria-labelledby="footerSubModal">
          <div class="modal-dialog modal-fullscreen-md-down popup-box-dialog modal-dialog-centered modal-content position-relative overflow-hidden">
            <div class="d-flex flex-shrink-0 align-items-center justify-content-between position-relative overflow-hidden" style="height: 200px;">
              <div class="">
                <img src="../public/assets/img/footer-header-2.webp" alt="Bergabung dengan Komunitas Kami" class="img-fluid object-fit-contain">
              </div>
            </div>
            <div class="modal-body w-100 h-auto">
              <form>
                <!-- Modal form fields -->
                <div class="mb-3 input-sub-footer-wrapper">
                  <label class="form-label" for="inputSubFooterNama">Nama</label>
                  <input type="text" placeholder="Masukkan nama" id="inputSubFooterNama" name="inputSubFooterNama" />
                </div>
                <div class="mb-3 input-sub-footer-wrapper">
                  <label class="form-label" for="inputSubFooterWhatsapp">Whatsapp</label>
                  <input type="tel" id="inputSubFooterWhatsapp" name="inputSubFooterWhatsapp" />
                </div>
                <div class="mb-3 input-sub-footer-wrapper">
                  <label class="form-label" for="inputSubFooterEmail">Email</label>
                  <input type="text" placeholder="johndoe@gmail.com" id="inputSubFooterEmail" name="inputSubFooterEmail" />
                </div>
                <div class="mb-3 input-sub-footer-wrapper">
                  <label class="form-label" for="inputSubFooterDomisili">Kota/Kabupaten</label>
                  <input type="text" placeholder="Jakarta" id="inputSubFooterDomisili" name="inputSubFooterDomisili" />
                </div>
              </form>
            </div>
            <div class="modal-footer w-100 py-2">
              <button style="border-radius:10px;" class="yellow-dialogika-btn" data-bs-toggle="modal" data-bs-target="#footerSubModal">Close</button>
              <button style="border-radius:10px;" class="blue-dialogika-btn" id="subFooterBtn">Kirim & Gabung group</button>
            </div>
            <div class="success-overlay d-none" id="successOverlay">
            <div class="success-content text-center">
              <i class="bi bi-check-circle-fill" style="font-size: 3rem; color: #28a745;"></i>
              <h2>Thank You!</h2>
              <p>Terimakasih telah bergabung dengan komunitas kami !</p>
              <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#footerSubModal">Close</button>
            </div>
    </div>
          </div>
        </div>
      `;
  }
}

customElements.define("pop-up-program", PopupProgram);
customElements.define("footer-modal", FooterModal);
