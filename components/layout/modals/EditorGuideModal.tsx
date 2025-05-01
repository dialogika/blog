"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import {
  guideGambar1,
  guideGambar2,
  guideGambar3,
  guideGambar4,
  guideGambar5,
  guideGambar6,
  guideGambar7,
  guideGambar8,
  guideGambar9,
  guideGambar10,
  guideGambar11,
  guideGambar12,
} from ".";

// Modal untuk guide halaman membuat artikel blog baru
// Untuk modal ini menggunakan react bootstrap. cek https://react-bootstrap.netlify.app/
const EditorGuideModal = () => {
  const [showGuide, setShowGuide] = useState(false); // State untuk menampilkan model GUIDE penggunaan text editor
  return (
    <>
      <button
        type="button"
        className="rev-appointment-btn my-3"
        onClick={() => setShowGuide(true)}
        style={{
          width: "fit-content",
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        Buka Guide
      </button>
      <Modal
        id="guideModal"
        show={showGuide}
        onHide={() => setShowGuide(false)}
        className="modal-xl"
        dialogClassName="modal-90w" // custom class
        aria-labelledby="guide-modal"
      >
        <Modal.Header closeButton className="fs-4 fw-bold">
          Guide & Tips untuk editor
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            {/* Start of Guide memasukkan Gambar */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Cara Memasukkan Gambar (Gambar yang Dipilih dari Internet)
              </Accordion.Header>
              <Accordion.Body className="">
                <h5>
                  1. Cari gambar di internet. Contoh :{" "}
                  <a
                    href="https://www.pexels.com/"
                    target="_blank"
                    className="text-decoration-underline "
                  >
                    Pexels
                  </a>
                  ,{" "}
                  <a
                    href="https://yandex.com/images/"
                    target="_blank"
                    className="text-decoration-underline "
                  >
                    Yandex
                  </a>
                  ,{" "}
                  <a
                    href="https://unsplash.com/"
                    target="_blank"
                    className="text-decoration-underline "
                  >
                    Unsplash
                  </a>
                </h5>
                <h5 className="mt-5">
                  2. Klik kanan pada gambar dan pilih{" "}
                  <b>`Open Image in New Tab`</b>
                </h5>
                <Image
                  src={guideGambar1}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 1 "
                />
                <h5 className="mt-5">
                  3. Copy link gambarnya. Kembali ke halaman text editor dan di
                  toolbar klik icon gambar (dibagian kanan atas) {`->`} masukkan
                  linknya ke URL dan submit
                </h5>
                <Image
                  src={guideGambar2}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 1 "
                />

                <h5 className="mt-5">
                  4. Klik gambarnya untuk kustomisasi, gambar bisa diperbesar
                  atau diperkecil. Pilih Edit {`->`} Advanced dan masukkan
                  `dialogika-img` di Classes dan Id kemudian <i>Apply</i>.
                </h5>
                <Image
                  src={guideGambar3}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 1 "
                />

                <h5 className="mt-5">
                  5. Bila ingin ada text disamping gambar, pilih vertical align
                  dan kemudian Klik disamping gambar
                </h5>
                <Image
                  src={guideGambar4}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 1 "
                />
              </Accordion.Body>
            </Accordion.Item>
            {/* End of Guide memasukkan Gambar */}

            {/* Start of Guide 2 */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Cara Memasukan Gambar Dari Text Editor Langsung
              </Accordion.Header>
              <Accordion.Body>
                <h5>
                  1. Pilih Disebalah pojok kanan bawah text editor, untuk
                  mencari gambar dari text editor
                </h5>
                <Image
                  src={guideGambar5}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 5 "
                />
                <h5 className="mt-5">
                  2. Masukan Qword di kotak pencarian dan klik Cari Gambar.
                </h5>
                <Image
                  src={guideGambar6}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 6 "
                />
                <h5 className="mt-5">
                  3. Silahkan pilih gambar yang diinginkan
                </h5>
                <h5 className="mt-5">
                  4. Jika merasa gambar yang diinginkan bisa pindah page, dengan
                  mengeklik
                </h5>
                <Image
                  src={guideGambar7}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">
                  5. Kilk gambar yang diinginkan dan gambar akan muncul di text
                  editor
                </h5>
              </Accordion.Body>
            </Accordion.Item>
            {/* End of Guide 2 */}

            {/* Start of Guide 3 */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Cara Membuat Inbound Link</Accordion.Header>
              <Accordion.Body>
                {" "}
                <h5>
                  1. Pilih disebelah pojok kanan, untuk menambahkan inbound link
                </h5>
                <Image
                  src={guideGambar8}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">
                  2. Masukan URL yang akan menjadi Inbound Link
                </h5>
                <h5 className="mt-5">
                  3. Setelah Inbound Link terbuat, pilih logo pennsil
                </h5>
                <Image
                  src={guideGambar12}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">
                  4. Checklist pada bagian (Open in new tab) dan ganti text
                  (Baca Juga: ......)
                </h5>
                <Image
                  src={guideGambar9}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">5. Inbound Link sudah bisa terbuat</h5>
              </Accordion.Body>
            </Accordion.Item>
            {/* End of Guide 3 */}

            <Accordion.Item eventKey="3">
              <Accordion.Header>Cara Mereset Artikel</Accordion.Header>
              <Accordion.Body>
                <h5 className="mt-5">
                  1. Pilih pada bagian X di pojok kanan bawah
                </h5>
                <Image
                  src={guideGambar11}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">
                  2. Akan muncul popup konfirmasi untuk mereset artikel, klik
                  reset jika ingin meresetnya
                </h5>
                <Image
                  src={guideGambar10}
                  className="img-fluid w-auto mx-auto rounded-3"
                  style={{ height: "auto" }}
                  alt="guide gambar 7 "
                />
                <h5 className="mt-5">
                  3. Artikel akan terreset, dan akan kembali seperti awal
                </h5>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditorGuideModal;
