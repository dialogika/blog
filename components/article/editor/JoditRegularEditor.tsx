"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-pro-react"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const JoditRegularEditor = () => {
  const [editorValue, setEditorValue] = useState(
    `<div class="row">

        <!-- 2 first paragraph of the draft -->
        <div class="col-lg-7 mt-4">
            <p style="line-height: 32px;"> <span class="fw-lighter"><span style="color: rgb(153, 153, 153);">Ganti dengan keyword - Bagian awal HARUS ada dua (2) paragraph, ini bagian paragraph pertama
            </p>
            <p style="line-height: 32px;">Bagian awal HARUS ada dua (2) paragraph, ini bagian paragraph kedua</p>
        </div>

        <div class="col-lg-5 mt-4">
            <div class="card card-body key-take">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong class="title-b3">Key Takeaways</strong></li>
                    <li class="list-group-item">key takeaway 1</li>
                    <li class="list-group-item">key takeaway 2</li>
                    <li class="list-group-item">key takeaway 3</li>
                    <li class="list-group-item">key takeaway 4</li>
                    <li class="list-group-item">key takeaway 5</li>
                </ul>
            </div>
        </div>
        <p><br></p>
        <p>Konten-konten dimasukkan kesini. Replace bagian ini dengan isi dari artikelnya, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. </p>
        <p><br></p>

        <div id="call-to-action" class="call-to-action">
            <img src="https://img.freepik.com/free-photo/woman-asking-questions-podcast_23-2149029335.jpg?w=2000&amp;t=st=1702424624~exp=1702425224~hmac=8ef22a8fb4c913b576a1fefecfe57e6e9f84a118e0f24b78674d7e4105d2d7b1"
                alt="Menawar, negosiasi, murah">
            <div class="container-fluid">
                <div class="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                    <div class="col-xl-12">
                        <div class="text-center">
                            <h3 style="color: #f1f7fd;">Tanya Aja Dulu</h3>
                            <p>Susah dan Gugup Ngomong di Depan Umum? Konsul Aja Dulu</p>
                            <a class="cta-btn title-change-consultation" href="https://wa.link/q8jnnv" target="_blank">Tanya
                                Admin</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p><br></p>
        <h2>Penutup/Kesimpulan (Pilih satu)</h2>
        <p>Isi penutup/kesimpulan</p>

        <blockquote>
            <p>
                <br>
            </p>
            <figcaption class="blockquote-footer">
                Ann Lander
            </figcaption>
            “Bukan apa yang Anda lakukan untuk anak-anak Anda, tapi apa yang Anda ajarkan kepada mereka untuk
            dilakukan bagi diri mereka sendiri, itulah yang akan menjadikan mereka manusia sukses.”
            <p><br></p>
        </blockquote>
      </div>`
  );

  useEffect(() => {
    const savedContent = localStorage.getItem("joditEditorContent");
    if (savedContent) setEditorValue(savedContent);
  }, []);

  const showImageSelectionDialog = (
    images: any[],
    query: string,
    editorInstance: any,
    page: number
  ) => {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 9999,
    });

    const dialog = document.createElement("div");
    Object.assign(dialog.style, {
      position: "fixed",
      top: "10vh",
      left: "5vw",
      right: "5vw",
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      maxHeight: "80vh",
      overflowY: "auto",
      zIndex: 10000,
    });

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    Object.assign(closeBtn.style, {
      position: "sticky",
      top: "5px",
      right: "5px",
      backgroundColor: "transparent",
      padding: "10px 10px",
      border: "none",
      fontSize: "40px",
      fontWeight: "bold",
      color: "#e74c3c",
      cursor: "pointer",
    });
    closeBtn.onclick = () => {
      document.body.removeChild(dialog);
      document.body.removeChild(overlay);
    };
    dialog.appendChild(closeBtn);

    const title = document.createElement("h3");
    title.textContent = `Pilih Gambar untuk "${query}"`;
    title.style.marginBottom = "15px";
    dialog.appendChild(title);

    const gallery = document.createElement("div");
    gallery.style.display = "grid";
    gallery.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    gallery.style.gap = "12px";
    dialog.appendChild(gallery);

    images.forEach((image, index) => {
      const container = document.createElement("div");
      container.style.cursor = "pointer";

      const img = document.createElement("img");
      img.src = image.src.medium;
      img.alt = `${query} image ${index + 1}`;
      img.style.width = "100%";
      img.style.borderRadius = "6px";

      const credit = document.createElement("div");
      credit.textContent = `${image.photographer}`;
      credit.style.fontSize = "11px";
      credit.style.textAlign = "center";

      container.onclick = () => {
        const html = `
          <div class="img-control mt-4">
            <a href="${image.src.original}" class="glightbox">
              <img src="${image.src.medium}" class="img-fluid rounded visible" alt="${query}">
              <img src="https://www.dialogika.co/assets/img/logo.webp" class="img-logo-image" alt="${query}">
            </a>
            <a href="https://wa.link/3rwk8y" target="_blank">
              <span class="badge bg-success"><i class="bi bi-whatsapp"></i> +62 851 6299 2597</span>
            </a>
            <span class="badge bg-primary"><i class="bi bi-instagram"></i> @dialogika.co</span>
          </div>
        `;
        editorInstance.selection.insertHTML(html);
        document.body.removeChild(dialog);
        document.body.removeChild(overlay);
      };

      container.appendChild(img);
      container.appendChild(credit);
      gallery.appendChild(container);
    });

    const pagination = document.createElement("div");
    pagination.style.display = "flex";
    pagination.style.justifyContent = "space-between";
    pagination.style.marginTop = "20px";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅️";
    prevBtn.disabled = page <= 1;
    prevBtn.style.padding = "6px 14px";
    prevBtn.style.borderRadius = "6px";
    prevBtn.style.border = "1px solid #ccc";
    prevBtn.style.cursor = "pointer";
    prevBtn.onclick = async () => {
      document.body.removeChild(dialog);
      document.body.removeChild(overlay);
      fetchImages(query, editorInstance, page - 1);
    };

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "➡️";
    nextBtn.style.padding = "6px 14px";
    nextBtn.style.borderRadius = "6px";
    nextBtn.style.border = "1px solid #ccc";
    nextBtn.style.cursor = "pointer";
    nextBtn.onclick = async () => {
      document.body.removeChild(dialog);
      document.body.removeChild(overlay);
      fetchImages(query, editorInstance, page + 1);
    };

    pagination.appendChild(prevBtn);
    pagination.appendChild(nextBtn);
    dialog.appendChild(pagination);

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);
  };

  const fetchImages = async (query: string, editor: any, page: number = 1) => {
    try {
      const res = await fetch("/blog/api/pexels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, page }),
      });

      const data = await res.json();
      if (data.photos?.length) {
        showImageSelectionDialog(data.photos, query, editor, page);
      } else {
        alert("Tidak ditemukan gambar.");
      }
    } catch (error) {
      alert("Gagal mengambil gambar.");
      console.error(error);
    }
  };

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Mulai mengetik...",
      language: "id",
      buttons: "source",
      extraButtons: [
        {
          name: "pexelsImage",
          iconURL:
            "https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/pexels_photo_free-512.png",
          exec: (editor: any) => {
            const overlay = document.createElement("div");
            Object.assign(overlay.style, {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "10000",
              padding: "16px",
            });

            const dialog = document.createElement("div");
            Object.assign(dialog.style, {
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 10px 30px",
              textAlign: "center",
            });

            const title = document.createElement("h2");
            title.textContent = "Cari Gambar di Pexels";
            title.style.marginBottom = "12px";

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Masukkan kata kunci gambar...";
            Object.assign(input.style, {
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            });

            const buttonContainer = document.createElement("div");
            buttonContainer.style.display = "flex";
            buttonContainer.style.justifyContent = "space-between";
            buttonContainer.style.gap = "10px";
            buttonContainer.style.flexWrap = "wrap";

            const searchBtn = document.createElement("button");
            searchBtn.textContent = "Cari Gambar";
            Object.assign(searchBtn.style, {
              flex: 1,
              padding: "12px",
              backgroundColor: "#0b2f6e",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              borderRadius: "8px",
              cursor: "pointer",
            });

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Batal";
            Object.assign(cancelBtn.style, {
              flex: 1,
              padding: "12px",
              backgroundColor: "#bdc3c7",
              color: "#000",
              border: "none",
              fontSize: "16px",
              borderRadius: "8px",
              cursor: "pointer",
            });

            searchBtn.onclick = () => {
              const qword = input.value.trim();
              if (!qword) {
                alert("Masukkan kata kunci dulu ya!");
                return;
              }
              document.body.removeChild(overlay);
              fetchImages(qword, editor, 1);
            };

            cancelBtn.onclick = () => {
              document.body.removeChild(overlay);
            };

            buttonContainer.appendChild(cancelBtn);
            buttonContainer.appendChild(searchBtn);

            dialog.appendChild(title);
            dialog.appendChild(input);
            dialog.appendChild(buttonContainer);

            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
          },

          tooltip: "Masukkan Gambar dari Pexels",
        },
      ],
    }),
    []
  );

  return (
    <div className="my-5">
      <label htmlFor="formEditor" className="fw-bold text-primary fs-5 mb-1">
        Text Editor Artikel
      </label>
      <p className="fst-italic" style={{ fontSize: 12, opacity: 0.85 }}>
        Masukkan konten artikel blog Anda di area editor di bawah ini. Gunakan
        toolbar untuk memformat konten sesuai kebutuhan. Jika masih bingung,
        klik tombol &quot; Buka Guide &quot; di kanan bawah untuk mendapatkan
        panduan lengkap.
      </p>
      <JoditEditor
        value={editorValue}
        name="formEditor"
        config={joditConfig}
        onChange={(newContent: string) => {
          localStorage.setItem("joditEditorContent", newContent);
          setEditorValue(newContent);
        }}
      />
    </div>
  );
};

export default JoditRegularEditor;
