// app/[id]/layout.tsx
import { basePath } from "@/next.config";
import { Metadata } from "next";
import React from "react";
import star from "@/public/assets/img/next.png";
import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStrava } from "@fortawesome/free-brands-svg-icons";
// Global metadata
export const metadata: Metadata = {
  title: "Cara menggunakan .... - Kursus Public Speaking",
  description:
    "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
  keywords: "Blog Dialogika, Blog, blog, dialogika",
  authors: [{ name: "Dialogika Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Dialogika Blog - Kursus Public Speaking",
    description:
      "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
    url: "https://www.dialogika.co/blog/",
    siteName: "Dialogika | Kelas Public Speaking",
    images: [{ url: "https://www.dialogika.co/assets/img/logo.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dialogika_co",
    title: "Dialogika Blog - Kursus Public Speaking",
    description:
      "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.",
    images: ["https://www.dialogika.co/assets/img/logo.webp"],
  },
  icons: {
    icon: `${basePath}/assets/img/favicon.webp`,
    apple: `/${basePath}assets/img/apple-touch-icon.webp`,
  },
};

export default function articleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased">
      {/* Main content */}
      <main className="main">{children}</main>
      <a
        href="#tagging-up"
        className="back-to-top d-flex align-items-center justify-content-center active">
        <Image
          src={`${star}`}
          width={10}
          height={10}
          alt=""
        />
      </a>
    </div>
  );
}





{/* <section id="blog-details" class="blog-details">
    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row ">
    
        <div class="col-lg-7 mt-4">
          <article class="article">
            <div class="post-img" style="border-radius:10px;">
              <img
                src="https://images.unsplash.com/photo-1515603403036-f3d35f75ca52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" class="img-fluid">
            </div>

            <h1 class="title">Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi: Tips Persiapan Maksimal
            </h1>

            <div class="meta-top">
              <ul>
                <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="#">Jessica Caesya
                    Agustin</a></li>
                <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="#">Yoga Pangestu</a></li>
                <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-details.html"><time
                      datetime="04/02/2025">04 Februari 2025</time></a></li>
              </ul>
            </div><!-- End meta top -->

            <div class="content">
              <div class="row">

                <!-- 2 first paragraph of the draft -->
                <div class="col-lg-7 mt-4">
                  <p> <span class="fw-lighter">Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi -
                    </span>Sidang skripsi merupakan momen yang penuh tantangan sekaligus menjadi tonggak penting bagi
                    mahasiswa yang sedang menyelesaikan jenjang pendidikan tinggi. Dalam sidang ini, mahasiswa diberi
                    kesempatan untuk mempresentasikan hasil penelitian yang telah mereka kerjakan selama
                    berbulan-bulan atau bahkan bertahun-tahun.
                  </p>

                  <p>Proses ini tidak hanya menguji pemahaman mendalam mahasiswa terhadap topik yang mereka pilih,
                    tetapi juga kemampuan mereka dalam menyampaikan ide secara jelas dan meyakinkan di hadapan dosen
                    penguji. Mempelajari karakter dan preferensi dosen penguji menjadi salah satu strategi penting
                    dalam menghadapi sidang skripsi.
                    Setiap dosen memiliki pendekatan, gaya bertanya, dan fokus perhatian yang berbeda, sehingga
                    memahami hal ini dapat membantu mahasiswa mempersiapkan diri secara lebih efektif. Oleh karena
                    itu, artikel ini akan membahas mengenai pentingnya mempelajari dosen penguji sebelum sidang
                    skripsi sebagai sebuah langkah persiapan yang maksimal.</p>
                </div>

                <!-- Key Takeaways -->
                <div class="col-lg-5 mt-4">
                  <div class="card card-body key-take">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b class="title-b3">Key Takeaways</b></li>
                      <li class="list-group-item">Dosen penguji yang berfokus pada keaslian penelitian</li>
                      <li class="list-group-item">Dosen penguji yang memperhatikan presentasi</li>
                      <li class="list-group-item">Dosen penguji yang bertanya mengenai aspek teoritis</li>
                    </ul>
                  </div>
                </div>
              </div>


              <!-- The rest of the draft goes here -->
              <h2>Tipe-Tipe Dosen Saat Menguji Skripsi</h2>

              <ol style="list-style: none;">
                <li>
                  <h4>1. Dosen penguji yang berfokus pada keaslian penelitian</h4>
                  <!-- Infographic here -->
                  <div class="img-control mt-4">
                    <a href="https://vivahr.com/wp-content/uploads/2023/10/economist-job-description-template.jpg"
                      class="glightbox">
                      <img src="https://vivahr.com/wp-content/uploads/2023/10/economist-job-description-template.jpg"
                        class="img-fluid rounded visible"
                        alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" />
                      <img src="asset/img/logo.webp" class="img-logo-image"
                        alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" />
                      <a href="https://wa.link/3rwk8y" target="_blank">
                        <span class="badge bg-success"><i class="bi bi-whatsapp"></i> +62 851 6299 2597</span>
                      </a>
                      <span class="badge bg-primary"><i class="bi bi-instagram"></i> @dialogika.co</span>
                    </a>
                  </div>
                  <p>Dosen penguji dengan tipe ini biasanya sangat memperhatikan <mark class="yellow">keaslian naskah
                      skripsi</mark>. Mereka akan sangat anti terhadap kegiatan plagiarisme.
                  </p>
                  <b>tips :</b>
                  <p>Ketika menghadapi dosen dengan tipe ini, mahasiswa harus teliti akan pengambilan kutipan maupun
                    parafrase dari referensi yang digunakan.</p>
                </li>
                <li>
                  <h4>2. Dosen penguji yang memperhatikan presentasi</h4>
                  <p>Tipe dosen ini sebenarnya dapat ditebak langsung oleh mahasiswa dengan mengenal karakter mereka
                    saat mengajar di kelas.
                    Fokus mereka adalah pada <mark class="yellow">cara mahasiswa mempresentasikan hasil
                      penelitian</mark>. Mereka tidak akan berfokus pada struktur maupun isi skripsi.
                  </p>
                  <b>tips :</b>
                  <p>Siapkan presentasi dengan maksimal apabila menemui dosen dengan tipe seperti ini. Mulailah dengan
                    membuat slide presentasi yang menarik tetapi tetap relevan dengan penelitian. Susun presentasi
                    menggunakan
                    poin-poin singkat dan padat.
                  </p>
                  <div class="card card-body link-content d-flex">
                    <a href="https://www.dialogika.co/blog/cara-membuat-PPT-seminar-proposal-skripsi-yang-menarik-siap-bikin-dosen-penguji-terpukau.html"
                      class="align-items-center">
                      <i class="fa-solid fa-link"></i>
                      Baca Juga: <b>Cara Membuat PPT Seminar Proposal Skripsi yang Menarik
                      </b>
                    </a>
                  </div>
                </li>
                <li>
                  <h4>3. Dosen penguji yang bertanya mengenai aspek teoritis</h4>
                  <p>Dosen dengan tipe ini akan lebih berfokus pada aspek teoritis dan konseptual dari penelitian.
                    Mereka akan banyak menanyakan mengenai <mark class="yellow">kerangka teori yang digunakan maupun
                      relevansi konsep dengan penelitian yang dilakukan.</mark>
                  </p>
                  <b>tips :</b>
                  <ol style="list-style: none;">
                    <li>1. Pahami kerangka teori yang digunakan dengan baik.</li>
                    <li>2. Elaborasi secara detail antara teori dengan hasil penelitian.</li>
                  </ol>
                </li>
                <li>
                  <h4>4. Dosen penguji yang berfokus pada metodologi</h4>
                  <!-- Infographic here -->
                  <div class="img-control mt-4">
                    <a href="https://www.unas.ac.id/wp-content/gallery/workshop-penjaminan-mutu-program-studi-s1-dan-s2-bidang-informatika-dan-komputer-ftki-unas/14.jpg"
                      class="glightbox">
                      <img
                        src="https://www.unas.ac.id/wp-content/gallery/workshop-penjaminan-mutu-program-studi-s1-dan-s2-bidang-informatika-dan-komputer-ftki-unas/14.jpg"
                        class="img-fluid rounded visible"
                        alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" />
                      <img src="asset/img/logo.webp" class="img-logo-image"
                        alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" />
                      <a href="https://wa.link/3rwk8y" target="_blank">
                        <span class="badge bg-success"><i class="bi bi-whatsapp"></i> +62 851 6299 2597</span>
                      </a>
                      <span class="badge bg-primary"><i class="bi bi-instagram"></i> @dialogika.co</span>
                    </a>
                  </div>
                  <p>Tipe dosen ini akan lebih memberikan perhatian pada aspek metodologi. Mereka akan meninjau
                    tentang <mark class="yellow">pendekatan, metode, dan analisis data yang digunakan dalam
                      penelitian.</mark>
                  </p>
                  <b>tips :</b>
                  <ol style="list-style: none;">
                    <li>1. Pahami metode penelitian yang digunakan dan sertakan kelebihan maupun kelemahan.</li>
                    <li>2. Jelaskan secara detail mengenai cara analisis data.</li>
                  </ol>
                </li>
                <li>
                  <h4>5. Dosen penguji yang mengajukan pertanyaan kritis</h4>
                  <!-- Iklan Basic Plus -->
                  <div class="img-control mt-4">
                    <a href="https://www.dialogika.co/program/basic-class.html" target="_blank">
                      <img src="asset/img/iklan/basic-plus-1x1-erico.webp" class="img-fluid rounded"
                        alt="Program kelas online dialogika" />
                    </a>
                  </div>
                  <p>Dosen dengan tipe ini akan banyak mengajukan pertanyaan kritis. Hal ini dilakukan untuk memeriksa
                    sejauh mana mahasiswa paham dengan penelitian yang mereka lakukan. Selain itu, tipe dosen ini juga
                    ingin melihat <mark style="list-style: none;">cara dan kemampuan mahasiswa dalam menjawab
                      pertanyaan tersebut</mark>.
                  </p>
                  <b>tips :</b>
                  <ol style="list-style: none;">
                    <li>1. Persiapkan diri dengan memahami materi penelitian dengan baik, khususnya teori dan hasil
                      temuan.</li>
                    <li>2. Pelajari topik penelitian secara mendalam.</li>
                    <li>3. Prediksikan pertanyaan dan latihlah menjawab pertanyaan tersebut. Buat argumen yang kuat
                      dan logis.</li>
                  </ol>
                </li>
              </ol>

              <div id="call-to-action" class="call-to-action">
                <img
                  src="https://img.freepik.com/free-photo/woman-asking-questions-podcast_23-2149029335.jpg?w=2000&t=st=1702424624~exp=1702425224~hmac=8ef22a8fb4c913b576a1fefecfe57e6e9f84a118e0f24b78674d7e4105d2d7b1"
                  alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi">

                <div class="container-fluid">
                  <div class="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                    <div class="col-xl-12">
                      <div class="text-center">
                        <h3 style="color: #f1f7fd;">Tanya Aja Dulu</h3>
                        <p>Susah dan Gugup Ngomong di Depan Umum? Konsul Aja Dulu</p>
                        <a class="cta-btn title-change-consultation" href="https://wa.link/q8jnnv"
                          target="_blank">Tanya Admin</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2>Penutup</h2>
              <p>Mempelajari karakter dan preferensi dosen penguji sebelum sidang skripsi adalah langkah strategis
                yang dapat meningkatkan peluang kesuksesan. Dengan memahami gaya berpikir, fokus penelitian, dan
                ekspektasi mereka, mahasiswa dapat mempersiapkan diri dengan lebih matang dan percaya diri.
              </p>
              <p>Langkah ini bukan hanya membantu menjawab pertanyaan dengan tepat, tetapi juga menunjukkan keseriusan
                dan kesiapan dalam mempertahankan skripsi. Pada akhirnya, usaha ini akan memberikan kesan positif dan
                mendukung kelancaran sidang skripsi.</p>

              <blockquote>
                <p>
                <figcaption class="blockquote-footer">
                  Winston Churchill
                </figcaption>
                “Success consists of going from failure to failure without loss of enthusiasm”
                </p>
              </blockquote>


            </div><!-- End post content -->

            <div class="meta-bottom">
              <i class="bi bi-folder"></i>
              <ul class="cats">
                <li><a target="_blank"
                    href="https://www.asuransireceh.co.id/blog/anxiety-bukan-kecemasan-biasa">Anxiety, Bukan Kecemasan
                    Biasa
                  </a></li>
              </ul>
            </div>
          </article><!-- End post article -->

        </div>
    
      </div>
    </div>

    </div>

  </section>

  

</main><!-- End #main -->

<!-- ======= Footer & Counter Area ======= -->
<main-footer></main-footer>
<!-- ======= End Footer & Counter Area ======= -->

<!-- ======= Modal Pop-up Form Gabung ======= -->
<footer-modal></footer-modal>

<!-- ======= Modal Pop-up Iklan Program ======= -->
<pop-up-program></pop-up-program>

<a href="#tagging-up" class="back-to-top d-flex align-items-center justify-content-center"><i
    class='bx bx-star bx-tada'></i></a>

<!-- Modal 2 -->
<div class="modal popup-box fade" id="download-cheatsheet" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog popup-box-dialog modal-dialog-centered">
    <div class="modal-content popup-box-content">
      <div class="popup-card" style="width:100%">
        <button type="button" class="btn popup2-btn ms-auto" data-bs-dismiss="modal"><i
            class="fa-solid fa-xmark"></i></button>
        <img
          src="https://img.freepik.com/premium-photo/minimal-progress-bar-part-symbol-with-bright-glowing-futuristic-blue-neon-lights-black-background_989822-3875.jpg?size=626&ext=jpg&ga=GA1.1.1527285527.1702255139&semt=sph"
          class="card-img-top" alt="Contoh Public Speaking yang Baik"
          style="border-top-left-radius: 7px;border-top-right-radius: 7px;border:0px;max-height: 200px;">
        <div class="card-body popup-card-body">
          <div class="popup-title-area">
            <p class="popup-sub">Free Download</p>
            <h5 class="card-title popup-title"><strong>Cheatsheet Files</strong></h5>
          </div>
          <a href="https://www.youtube.com/watch?v=-oeLrO7nHv0" class="btn popup-play glightbox"><i
              class="fa-solid fa-play"></i></a>
        </div>
        <form method="post" id="cheatsheets" class="popup-form" onsubmit="downloadForm()">
          <div class="row gy-3 mb-3">
            <div class="col-lg-12">
              <label for="name" class="form-label">Full Name</label>
              <input type="text" name="Name" class="form-control" pattern="[a-zA-Z\s]{3,100}"
                placeholder="Nama Lengkap*" required>
            </div>
            <div class="col-lg-6">
              <label for="work" class="form-label">Profesi</label>
              <input type="text" class="form-control" name="Job" pattern="[a-zA-Z\s]{3,100}" placeholder="Profesi*"
                required>
            </div>
            <div class="col-lg-6">
              <label for="whatsapps" class="form-label">Whatsapp</label>
              <input type="tel" class="form-control" name="Whatsapp" pattern="[0-9]{10,15}" placeholder="Whatsapp*"
                required="">
            </div>

          </div>
          <button class="custom-btn2" type="submit">Download File</button>
        </form>
      </div>
    </div>
  </div>
</div> */}



