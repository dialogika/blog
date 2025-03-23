"use client";
import React, { useEffect, useState } from "react";
import { TextInput, DynamicInput, DynamicAuthorInput, TextAreaInput } from "@/components/forms";
import { BlogArticleProps, BlogAuthorProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthorsState } from "@/app/store/authorsSlice";
import { RootState } from "@/app/store";
import ImageUrl from "@/components/forms/ImageUrl";
import JoditRegularEditor from "./JoditRegularEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface FormArticleProps {
  authors: BlogAuthorProps[];
}

const FormArticle: React.FC<FormArticleProps> = ({ authors }) => {
  const availableAuthors = useSelector((state: RootState) => state.authors.authorsDetail);
  const dispatch = useDispatch();
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [totalKeyword, setTotalkeyword] = useState(0);
  // Gunakan useEffect untuk meng-update store dengan data author yang diterima
  useEffect(() => {
    dispatch(updateAuthorsState(authors));
  }, [authors, dispatch]);

  // Fungsi untuk menangani submit form
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // payload ini akan digunakan untuk menampung semua data dari FormArticle
    const payload: Partial<BlogArticleProps> = {};

    // Set tgl publish
    payload.publishedAt = new Date().toISOString();

    // Ambil link/URL untuk thumbnail blog
    const thumbnailImage = formData.get("thumbnail-image")?.toString();
    payload.thumbnail = thumbnailImage;

    // Ambil judul blog dan buat id dari judul tersebut
    const title = formData.get("title")?.toString();
    if (!title) return;
    payload.title = title;

    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter seperti simbol (!,@,:,;) dari judul untuk dijadikan id atau urlnya
      .trim()
      .replace(/\s+/g, "-");
    payload.idArticle = id; // Contoh hasil: /rahasia-membuat-pembukaan...

    // Ambil metadata untuk blog
    const metadata = formData.get("metadata")?.toString();
    if (!metadata) {
      return;
    }
    if (metadata.length > 160) {
      alert("Metada tidak boleh lebih dari 160 karakter. Spasi, angka, simbol termasuk karakter !!");
      return;
    }
    payload.metaData = metadata;

    // Ambil deskripsi untuk digunakan di card di blog/index
    const blogDescription = formData.get("blogDescription")?.toString();
    if (!blogDescription) return;
    payload.cardsDescription = blogDescription;

    // Ambil keyword untuk blog
    const keywords = formData.get("keyword")?.toString();
    if (!keywords) return;
    payload.keywords = keywords;

    // Ambil writer notes untuk blog
    const writernote = formData.get("writernote")?.toString();
    if (!writernote) return;
    payload.writerNote = writernote;

    // Ambil outbound title & link untuk blog. Bila tidak ada, gunakan link medium dialogika
    const externalTitle = formData.get("externalTitle")?.toString();
    const externalLink = formData.get("externalLink")?.toString();

    payload.outBoundLink = {
      title: externalTitle || "Medium",
      link: externalLink || "https://medium.com/dialogika",
    };

    // Ambil nilai input untuk tags (tags-0, tags-1, ..., tags-9)
    const tags: string[] = [];
    for (let i = 0; i < 10; i++) {
      const tagValue = formData.get(`tags-${i}`);
      if (tagValue) tags.push(tagValue.toString());
    }
    if (tags.length < 1) tags.push("#Dialogika", "#PublicSpeaking"); // Bila tags kosong tambah value Dialogika & PublicSpeaking

    payload.tags = tags;

    // Ambil value authors
    const selectedAuthors: string[] = [];
    const authorsPayload: BlogAuthorProps[] = [];
    for (let i = 0; i < 3; i++) {
      const selectedAuthorNames = formData.get(`author-${i}`); // Ambil nama-nama author yang ada dari input DynamicAuthorInput
      if (selectedAuthorNames) selectedAuthors.push(selectedAuthorNames.toString());
    }
    selectedAuthors.forEach((author) => {
      const findAuhor = availableAuthors.find((item) => item.authorName == author);
      if (findAuhor) authorsPayload.push(findAuhor);
    });
    payload.authors = authorsPayload;

    // Ambil value dari text editor (menggunakan jodit editor)
    const content = formData.get("formEditor") as string;
    payload.content = content;

    try {
      setIsLoading(true);
      setSuccess(false);
      setIsFailed(false);
      event.preventDefault();
      console.log("Submitting Article ...");
      const res = await fetch("https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setIsLoading(false);
        setSuccess(false);
        setIsFailed(true);
        throw new Error(`Failed to create article: ${res.statusText}`);
      }
      setIsLoading(false);
      setIsFailed(false);
      setSuccess(true);

      const rebuildGithub = await fetch(
        "https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/build/triggerGithubRebuild/",
        { method: "POST" }
      );

      if (!rebuildGithub.ok) {
        const errorText = await rebuildGithub.text();
        console.log("🚀 ~ handleFormSubmit ~ errorText:", errorText);
      } else {
        console.log("Berhasil redeploy github pages");
      }
    } catch (error: any) {
      setIsLoading(false);
      setSuccess(false);
      setIsFailed(true);
      console.error("Error submitting article:", error);
      alert(`Error submitting article: ${error}`);
    }
  };

  return (
    <>
      <form
        id="FormArticle"
        onSubmit={handleFormSubmit}
        className="w-100 d-flex flex-column mt-5 mt-md-0 p-3 "
        style={{ height: "auto" }}>
        <div className="blog-form-container p-4">
          {/* Thumbnail Image Section */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                <i className="fas fa-image text-primary"></i>
              </div>
              <h5 className="mb-0 fw-bold text-primary">Thumbnail</h5>
            </div>
            <div className="p-3 border border-dashed rounded-3 bg-light">
              <ImageUrl
                inputPlaceholder={
                  "Masukkan link gambar untuk thumbnail. Disarankan untuk menggunakan gambar Landscape dibandingkan Portrait"
                }
                name={"thumbnail-image"}
              />
              <div className="mt-2 text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Gambar landscape akan ditampilkan lebih baik dibandingkan portrait di halaman utama blog
              </div>
            </div>
          </div>

          {/* Judul */}
          <div className="">
            <div className="d-flex align-items-center mb-2 pt-4">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                <i className="fas fa-heading text-primary"></i>
              </div>
              <h5 className="mb-0 fw-bold text-primary">
                Judul <span className="text-danger">*</span>
              </h5>
            </div>
            <div className="p-2">
              <TextInput
                type="text"
                name="title"
                labelTitle=""
                required={true}
                hideAsterisk={true}
                placeholder="Masukkan judul blog yang menarik..."
                inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
              />
              <div className="mt-2 text-muted small d-flex align-items-start gap-2">
                <i className="fas fa-lightbulb text-warning mt-1"></i>
                <span
                  className="fst-italic"
                  style={{ fontSize: "12px", opacity: "0.9" }}>
                  Pastikan judul representatif, mengandung keyword, dan menarik perhatian pembaca. Idealnya di bawah 60
                  karakter agar tidak terpotong di hasil pencarian.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Keyword */}

        <div className="mb-4 px-4">
          <div className="d-flex align-items-center mb-2 pt-4">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
              <i className="fas fa-heading text-primary"></i>
            </div>
            <h5 className="mb-0 fw-bold text-primary">
              Keyword Blog <span className="text-danger">*</span>
            </h5>
          </div>
          <div className="p-2">
            <TextInput
              type="text"
              name="keyword"
              labelTitle=""
              hideAsterisk={true}
              required={true}
              placeholder="Masukkan keyword disini..."
              inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
            />
            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Berupa kata, frasa, dan klausa yang relevan dalam artikel (berjumlah 2-4). Keyword harus ada pada judul,
                meta description, dan berulang pada isi artikel (1-2% dari total kata).
              </span>
            </div>
          </div>
        </div>

        {/* outbound link */}
        <div className="mb-4 px-4">
          <div className="d-flex align-items-center mb-2 pt-4">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
              <i className="fas fa-link text-primary"></i>
            </div>
            <h5 className="mb-0 fw-bold text-primary">Outbound</h5>
          </div>

          <div className="p-2">
            <TextInput
              type="text"
              name="externalTitle"
              labelTitle="Outbound Title"
              hideAsterisk={true}
              required={false}
              placeholder="Stoicism: Kunci Kebijaksanaan dan Hidup Tenang"
              inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
            />
            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Judul tautan yang mengarah ke situs lain
              </span>
            </div>
          </div>

          <div className="p-2">
            <TextInput
              type="text"
              name="externalLink"
              labelTitle="Outbound Link"
              hideAsterisk={true}
              required={false}
              placeholder="https://medium.com/dialogika"
              inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
            />
            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Tautan yang mengarah ke situs lain. Tautkan ke situs yang kredibel (seperti jurnal penelitian) dan
                relevan dengan isi artikel.
              </span>
            </div>
          </div>
        </div>

        {/* Input untuk metadata, deskripsi, keyword, writer's note */}
        <div className="px-4">
          <div className="">
            <div className="d-flex align-items-center pt-4">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                <i className="fas fa-link text-primary"></i>
              </div>
              <h5 className="mb-0 fw-bold text-primary">
                Meta Description <span className="text-danger">*</span>
              </h5>
            </div>
          </div>

          <div className="card-body">
            <div className="position-relative">
              <TextAreaInput
                rows={8}
                maxLength={160}
                name="metadata"
                required={true}
                placeholder="Masukkan metadata blog disini..."
                divClassName="mb-0"
                textAreaClassName="form-control fs-6 w-100 border border-light-subtle rounded-3 shadow-sm p-3"
                style={{ resize: "none", backgroundColor: "#f8f9fa" }}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  const valueLength = event.target.value.length;
                  setTotalkeyword(valueLength);
                }}
              />
              <div className="position-absolute bottom-0 end-0 p-3">
                <div className="text-muted small">
                  <div className="text-end mt-1">
                    <small
                      className={`${
                        totalKeyword > 160 ? "text-danger" : totalKeyword >= 150 ? "text-success" : "text-muted"
                      }`}>
                      {totalKeyword}/160 karakter
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Ringkasan artikel yang terdiri 150–160 karakter. Usahakan menarik atau membuat pembaca penasaran. 
              </span>
            </div>
          </div>
        </div>

        {/* deskripsi blog */}
        <div className="px-4">
          <div className="">
            <div className="d-flex align-items-center pt-4">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                <i className="fas fa-link text-primary"></i>
              </div>
              <h5 className="mb-0 fw-bold text-primary">
                Deskripsi Blog <span className="text-danger">*</span>
              </h5>
            </div>
          </div>

          <div className="card-body">
            <div className="position-relative">
              <TextAreaInput
                maxLength={160}
                rows={8}
                required={true}
                name="blogDescription"
                placeholder="Masukkan deskripsi blog disini..."
                divClassName="mb-0"
                textAreaClassName="form-control fs-6 w-100 border border-light-subtle rounded-3 shadow-sm p-3"
                style={{ resize: "none", backgroundColor: "#f8f9fa" }}
              />
            </div>

            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Berbeda dengan Meta Description, bagian ini menjelaskan isi blog secara overview (bukan ringkasan).
                Contoh: “Artikel ini menjelaskan cara menulis blog, mulai dari brainstorming hingga penulisan HTML.”
              </span>
            </div>
          </div>
        </div>

        {/* writer's note */}
        <div className="px-4">
          <div className="">
            <div className="d-flex align-items-center pt-4">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                <i className="fas fa-link text-primary"></i>
              </div>
              <h5 className="mb-0 fw-bold text-primary">
                Writer`s Note <span className="text-danger">*</span>
              </h5>
            </div>
          </div>

          <div className="card-body">
            <div className="position-relative">
              <TextAreaInput
                maxLength={160}
                rows={8}
                required={true}
                name="writernote"
                placeholder="Masukkan writer's note disini..."
                divClassName="mb-0"
                textAreaClassName="form-control fs-6 w-100 border border-light-subtle rounded-3 shadow-sm p-3"
                style={{ resize: "none", backgroundColor: "#f8f9fa" }}
              />
            </div>

            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Catatan dari penulis. Isinya bebas. So be creative!
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 px-4">
          <div
            className="d-flex align-items-center
           pt-4">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
              <i className="fas fa-tags text-primary"></i> {/* Ikon tags buat relevan */}
            </div>
            <h5 className="mb-0 fw-bold text-primary">
              Tags <span className="text-danger">*</span>
            </h5>
          </div>

          <div className="px-2 d-flex flex-column justify-content-center align-items-center ">
            <DynamicInput
              name="tags"
              maxInputs={5}
              placeholder="#tags"
              // className="text-input fs-6 w-100 p-2 border border-light shadow-sm rounded-2"
            />
            <div className="mt-2 text-muted small d-flex align-items-start gap-2">
              <i className="fas fa-lightbulb text-warning mt-1"></i>
              <span
                className="fst-italic"
                style={{ fontSize: "12px", opacity: "0.9" }}>
                Masukkan 4-6 tags yang berkaitan dengan artikel (dapat berasal dari keywords). Selalu masukkan
                #PublicSpeaking meski tidak banyak berkaitan dengan isi.
              </span>
            </div>
          </div>
        </div>

        {/* Input untuk Author */}
        <div className="d-flex align-items-center px-4 pt-4">
          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
            <i className="fas fa-link text-primary"></i>
          </div>
          <h5 className="mb-0 fw-bold text-primary">
            Authors <span className="text-danger">*</span>
          </h5>
        </div>
        <div className="row mb-5">
          <DynamicAuthorInput
            maxInputs={3}
            name="author"
            data-bs-toggle="modal"
            description="Penulis Article Blog"
            required={true}
          />
        </div>

        <JoditRegularEditor />

        {/* <button
          type="button"
          className="yellow-dialogika-btn rounded-3 mt-4 mb-3">
          Preview Blog
        </button> */}

        <button
          type="submit"
          className="rev-appointment-btn ">
          Publish Article Blog
        </button>
      </form>
      {isLoading && <LoadingIndicator />}
      {isSuccess && <SuccessIndicator onClose={() => setSuccess(false)} />}
      {isFailed && <FailedIndicator onClose={() => setIsFailed(false)} />}
    </>
  );
};

export default FormArticle;

/* ==============================
22-03-2025
Dibawah ini komponen untuk menampilkan indikator proses publish : loading, success, dan failed
============================== */
interface IndicatorProps {
  onClose?: () => void;
}

const SuccessIndicator: React.FC<IndicatorProps> = ({ onClose }) => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-success">
    <FontAwesomeIcon
      icon={faCheck}
      beat
      style={{ width: 50, height: 50 }}
    />
    <strong>Success!</strong> Article submitted successfully.
    <button
      type="button"
      className="btn btn-primary"
      onClick={onClose}>
      Close
    </button>
  </div>
);

const LoadingIndicator: React.FC<IndicatorProps> = () => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-warning">
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      style={{ width: 50, height: 50 }}
    />
    <strong>Uploading !</strong> Please Wait.
  </div>
);

const FailedIndicator: React.FC<IndicatorProps> = ({ onClose }) => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-danger">
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      style={{ width: 50, height: 50 }}
    />
    <strong>Failed ! Cant publish new article</strong> Please try again later!
    <button
      type="button"
      className="btn btn-primary"
      onClick={onClose}>
      Close
    </button>
  </div>
);
