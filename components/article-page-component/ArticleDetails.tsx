"use client";
import Script from "next/script";
import React from "react";

const ArticleDetails = () => {
  return (
    <>
      <div className="blog-details-area clearfix">
        <div className="blog-details-bottom">
          <div className="row align-items-baseline">
            <div className="col-xl-6 col-md-7">
              <div className="blog-details-tags">
                <ul className="list-wrap mb-0">
                  <li>
                    <a onClick={() => false}>Help Us</a>
                  </li>
                  <li>
                    <a onClick={() => false}>To</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-md-5">
              <div className="blog-details-share">
                <h6 className="share-title">Rate This Article:</h6>
                <form
                  className="rate"
                  id="rate-us"
                  // onClick={()=>HeroForm()}
                >
                  <input
                    type="radio"
                    id="star5"
                    name="Rating"
                    value="5"
                  />
                  <label
                    htmlFor="star5"
                    title="text">
                    5 stars
                  </label>
                  <input
                    type="radio"
                    id="star4"
                    name="Rating"
                    value="4"
                  />
                  <label
                    htmlFor="star4"
                    title="text">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="star3"
                    name="Rating"
                    value="3"
                  />
                  <label
                    htmlFor="star3"
                    title="text">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="star2"
                    name="Rating"
                    value="2"
                  />
                  <label
                    htmlFor="star2"
                    title="text">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="star1"
                    name="Rating"
                    value="1"
                  />
                  <label
                    htmlFor="star1"
                    title="text">
                    1 star
                  </label>
                  <input
                    name="Keyword"
                    className="d-none"
                    value="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-author d-md-flex align-items-center ">
        <img
          src="asset/img/intern/jessica-caesya-agustin.webp"
          className="rounded-circle flex-shrink-0 mt-4"
          loading="lazy"
          alt="Jessica Caesya Agustin"
        />
        <div className="mt-4">
          <h4>Jessica Caesya Agustin</h4>
          <div className="social-links">
            <i className="fa-solid fa-feather"></i>
            <i className="fa-solid fa-circle-chevron-right"></i>
            About <b>Writer</b>
          </div>
          <p>
            Setiap orang memiliki jalannya masing-masing. Tak perlu terlalu terburu-buru. Pada akhirnya, hidup bukanlah
            sebuah kompetisi.
          </p>
        </div>
      </div>
      <div className="blog-author d-md-flex align-items-center">
        <img
          src="asset/img/intern/yoga-pangestu.jpg"
          className="rounded-circle flex-shrink-0 mt-4"
          loading="lazy"
          alt="Yoga Pangestu"
        />
        <div className="mt-4">
          <h4>Yoga Pangestu</h4>
          <div className="social-links">
            <i className="fa-solid fa-laptop-code"></i>
            <i className="fa-solid fa-circle-chevron-right"></i>
            About <b>Developer</b>
          </div>
          <p>
            Jangan takut akan perubahan. Kita mungkin kehilangan sesuatu yang baik, namun kita akan peroleh sesuatu yang
            lebih baik lagi
          </p>
        </div>
      </div>
      <div className="comments">
        <h4 className="comments-count">Writer Notes</h4>

        <div
          id="comment-2"
          className="comment">
          <div className="d-flex">
            <div className="comment-img">
              <img
                src="asset/img/intern/jessica-caesya-agustin.webp"
                alt="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi"
                loading="lazy"
                className="rounded"
              />
            </div>
            <div>
              <h5>
                <a href="">Jessica Caesya Agustin</a>{" "}
                <a
                  href="#"
                  className="reply">
                  <i className="bi bi-card-heading"></i>
                  Notes
                </a>
              </h5>
              <time dateTime="04/02/2025">04 Februari 2025</time>
              <p>
                Artikel ini ditujukan bagi para mahasiswa yang hendak melakukan sidang skripsi. Dengan mengenal dosen
                penguji skripsi, mahasiswa akan dapat mempersiapkan presentasi sekaligus cara menjawab pertanyaan saat
                sidang.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="reply-form">
  <h4>Asking About Us</h4>
  <p>Jika kamu penasaran mengenai program, kelas, in house, hingga internship dan career di Dialogika
    silahkan masukkan pertanyaan dibawah ini</p>
  <form id="myForm" role="form">
    <div className="row">

      <div className="col-md-12 form-group">
        <input type="text" name="Name" className="form-control" placeholder="Nama Lengkap*" id="names"
          required />
      </div>

      <div className="col-md-6 form-group">
        <input type="tel" className="form-control" name="Whatsapp" placeholder="Whatsapp*" required />
      </div>

      <div className="col-md-6 form-group">
        <input type="text" className="form-control" name="Location" placeholder="Domisili*" id="domisilis"
          required />
      </div>

      <select className="d-none" name="Timestamp">
        <option id="timestamp"></option>
      </select>
      <input className="d-none" name="Program" value="Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi" />

      <div className="col-md-12">
        <textarea className="form-control" name="Ket" id="messages" rows={17}
          placeholder="Yang ingin ditanyakan?"></textarea>
      </div>

      <div className="col-md-12 text-center">
        <button type="submit" onClick='SubForm()' className="btn-primary send_contact">Send Whatsapp</button>
      </div>

    </div>
  </form>

</div>  */}

        <div className="reply-form">
          <h4>Komentar</h4>
          <div id="disqus_thread"></div>
        </div>
      </div>
      {/* disqus  */}
      <Script src="./asset/js/disqus.js"></Script>
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </>
  );
};

export default ArticleDetails;
