"use client";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  DynamicInput,
  DynamicAuthorInput,
  LabelInput,
  TextAreaInput,
} from "@/components/forms";
import { BlogArticleProps, BlogAuthorProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthorsState } from "@/app/store/authorsSlice";
import { RootState } from "@/app/store";
import ImageUrl from "@/components/forms/ImageUrl";
import JoditRegularEditor from "./JoditRegularEditor";
import EditorModal from "@/components/layout/modals/EditorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface FormArticleProps {
  authors: BlogAuthorProps[];
}

const FormArticle: React.FC<FormArticleProps> = ({ authors }) => {
  const availableAuthors = useSelector(
    (state: RootState) => state.authors.authorsDetail
  );
  const dispatch = useDispatch();
  const [showGuide, setShowGuide] = useState(false); // State untuk menampilkan model GUIDE penggunaan text editor
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
      alert(
        "Metada tidak boleh lebih dari 160 karakter. Spasi, angka, simbol termasuk karakter !!"
      );
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

    // Ambil outbound title untuk blog
    const externalTitle = formData.get("externalTitle")?.toString();
    const externalLink = formData.get("externalLink")?.toString();

    if (externalTitle && externalLink) {
      payload.outBoundLink = {
        title: externalTitle || "Medium",
        link: externalLink || "https://medium.com/dialogika",
      };
    }

    // Ambil nilai input untuk tags (tags-0, tags-1, ..., tags-9)
    const tags: string[] = [];
    for (let i = 0; i < 10; i++) {
      const tagValue = formData.get(`tags-${i}`);
      if (tagValue) tags.push(tagValue.toString());
    }
    payload.tags = tags;

    // Ambil nilai input untuk keyTakeaway (keyTakeaway-0, keyTakeaway-1, ...)
    // const keyTakeaway: string[] = [];
    // for (let i = 0; i < 10; i++) {
    //   const takeawayValue = formData.get(`keyTakeaway-${i}`);
    //   if (takeawayValue) keyTakeaway.push(takeawayValue.toString());
    // }
    // payload.keyTakeaway = keyTakeaway;

    // Ambil value authors
    const selectedAuthors: string[] = [];
    const authorsPayload: BlogAuthorProps[] = [];
    for (let i = 0; i < 3; i++) {
      const selectedAuthorNames = formData.get(`authors-${i}`); // Ambil nama-nama author yang ada dari input
      if (selectedAuthorNames)
        selectedAuthors.push(selectedAuthorNames.toString());
    }
    selectedAuthors.forEach((author) => {
      const findAuhor = availableAuthors.find(
        (item) => item.authorName == author
      );
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
      const res = await fetch(
        "https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        setIsLoading(false);
        setSuccess(false);
        setIsFailed(true);
        throw new Error(`Failed to create article: ${res.statusText}`);
      }
      setIsLoading(false);
      setIsFailed(false);
      setSuccess(true);

      // DELETE ENGKE CENGGG
      // const rebuildGithub = await fetch(
      //   "/blog/api/admin/article/build/triggerGithubRebuild/",
      //   { method: "POST" }
      // );

      // if (!rebuildGithub.ok) {
      //   const errorText = await rebuildGithub.text();
      //   console.log("🚀 ~ handleFormSubmit ~ errorText:", errorText);
      // } else {
      //   console.log("Berhasil redeploy github pages");
      // }

      // UNCOMMENT MEN BRANCH main-nextjs READY
      // const rebuildGithub = await fetch(
      //   "https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/build/triggerGithubRebuild/",
      //   { method: "POST" }
      // );

      // if (!rebuildGithub.ok) {
      //   const errorText = await rebuildGithub.text();
      //   console.log("🚀 ~ handleFormSubmit ~ errorText:", errorText);
      // } else {
      //   console.log("Berhasil redeploy github pages");
      // }

      // Tampilkan payload di console untuk debugging
      console.log("🚀 ~ Article Created here is the payload:", payload);
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
        style={{ height: "auto" }}
      >
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
                  "Masukkan link gambar untuk thumbnail. Disarankan untuk menggunakan gambar Landscape"
                }
                name={"thumbnail-image"}
              />
              <div className="mt-2 text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Gambar landscape akan ditampilkan lebih baik di halaman utama
                blog
              </div>
            </div>
          </div>

          {/* Judul */}
          <div className="mb-4">
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
                // labelTitle="Judul"
                required={true}
                hideAsterisk={true}
                placeholder="Masukkan judul blog yang menarik"
                inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
              />
              <div className="mt-2 text-muted small">
                <i className="fas fa-lightbulb me-1"></i>
                Judul yang baik biasanya memiliki 8-15 kata dan mengandung kata
                kunci utama
              </div>
            </div>
          </div>
        </div>

        <TextInput
          type="text"
          name="keyword"
          labelTitle="Keyword Blog"
          required={true}
          description="Keyword bisa lebih dari 1. Gunakan koma (,)"
          placeholder="Masukkan keyword disini"
          divClassName="mt-4"
          inputClassName="text-input fs-6 w-100"
        />

        {/* Keyword */}
        <div className="mb-4">
          <div className="d-flex align-items-center mb-2 pt-4">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
              <i className="fas fa-heading text-primary"></i>
            </div>
            <h5 className="mb-0 fw-bold text-primary">Keyword Blog</h5>
          </div>
          <div className="p-2">
            <TextInput
              type="text"
              name="keyword"
              labelTitle="Judul"
              required={true}
              placeholder="Masukkan judul blog yang menarik"
              inputClassName="text-input fs-6 w-100 p-3 border border-light shadow-sm rounded-3"
            />
            <div className="mt-2 text-muted small">
              <i className="fas fa-lightbulb me-1"></i>
              Judul yang baik biasanya memiliki 8-15 kata dan mengandung kata
              kunci utama
            </div>
          </div>
        </div>

        {/* Input untuk metadata, deskripsi, keyword, writer's note */}
        <div className="card border-0 shadow rounded-4 overflow-hidden my-4">
          <div className="card-header bg-primary bg-gradient text-white p-3 d-flex align-items-center">
            <i className="fas fa-pencil-alt me-2"></i>
            <h5 className="mb-0 fw-bold">Metadata</h5>
          </div>

          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-light p-2 rounded-circle me-3">
                <i className="fas fa-info text-primary"></i>
              </div>
              <p
                className="text-secondary mb-0 fst-italic"
                style={{ fontSize: "0.9rem" }}
              >
                Metadata antara 150-160 karakter. Spasi termasuk
              </p>
            </div>
            <div className="position-relative mt-3">
              <TextAreaInput
                maxLength="160"
                rows="8"
                name="metadata"
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
                        totalKeyword > 160
                          ? "text-danger"
                          : totalKeyword >= 150
                          ? "text-success"
                          : "text-muted"
                      }`}
                    >
                      {totalKeyword}/160 karakter
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <TextInput
          type="text"
          name="blogDescription"
          labelTitle="Deskripsi Blog"
          required={true}
          description="Deskripsi blog akan digunakan di halaman utama blog"
          placeholder="Masukkan deskripsi blog disini"
          divClassName="mt-4"
          inputClassName="text-input fs-6 w-100"
        /> */}

        <div className="card border-0 shadow rounded-4 overflow-hidden my-4">
          <div className="card-header bg-primary bg-gradient text-white p-3 d-flex align-items-center">
            <i className="fas fa-pencil-alt me-2"></i>
            <h5 className="mb-0 fw-bold">Deskripsi Blog</h5>
          </div>

          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-light p-2 rounded-circle me-3">
                <i className="fas fa-info text-primary"></i>
              </div>
              <p
                className="text-secondary mb-0 fst-italic"
                style={{ fontSize: "0.9rem" }}
              >
                Deskripsi blog akan digunakan di halaman utama blog
              </p>
            </div>
            <div className="position-relative mt-3">
              <TextAreaInput
                rows="8"
                name="blogDescription"
                placeholder="Masukkan deskripsi blog disini..."
                divClassName="mb-0"
                textAreaClassName="form-control fs-6 w-100 border border-light-subtle rounded-3 shadow-sm p-3"
                style={{ resize: "none", backgroundColor: "#f8f9fa" }}
              />
            </div>
          </div>
        </div>

        {/* <TextInput
          type="text"
          name="writernote"
          labelTitle="Writer's Note"
          required={true}
          description="Menjelaskan blog ini ditujukan untuk siapa. Mahasiswa?, Orang tua?, Guru?, dll "
          placeholder="Masukkan writer's note disini"
          divClassName="mt-4"
          inputClassName="text-input fs-6 w-100"
        /> */}

        <div className="card border-0 shadow rounded-4 overflow-hidden my-4">
          <div className="card-header bg-primary bg-gradient text-white p-3 d-flex align-items-center">
            <i className="fas fa-pencil-alt me-2"></i>
            <h5 className="mb-0 fw-bold">Writer's Note</h5>
          </div>

          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-light p-2 rounded-circle me-3">
                <i className="fas fa-info text-primary"></i>
              </div>
              <p
                className="text-secondary mb-0 fst-italic"
                style={{ fontSize: "0.9rem" }}
              >
                Menjelaskan blog ini ditujukan untuk siapa. Mahasiswa?, Orang
                tua?, Guru?, dll
              </p>
            </div>
            <div className="position-relative mt-3">
              <TextAreaInput
                rows="8"
                name="writenote"
                placeholder="Masukkan writer's note disini..."
                divClassName="mb-0"
                textAreaClassName="form-control fs-6 w-100 border border-light-subtle rounded-3 shadow-sm p-3"
                style={{ resize: "none", backgroundColor: "#f8f9fa" }}
              />
              {/* <div className="position-absolute bottom-0 end-0 p-3">
                <div className="text-muted small">
                  <i className="far fa-edit me-1"></i>
                  Tuliskan siapa target audiensmu
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Input untuk outbound link */}
        {/* <div className="d-inline-flex flex-row gap-4 my-4 overflow-hidden">
          <TextInput
            type="text"
            name="externalTitle"
            labelTitle="Outbound Title"
            description="Link yang mengarah ke blog se-topik yang diluar dari dialogika. Misal blog dari medium"
            placeholder="Stoicism: Kunci Kebijaksanaan dan Hidup Tenang"
            divClassName="col-5 col-md-6"
            inputClassName="text-input fs-6 w-100"
          />
          <TextInput
            type="text"
            name="externalLink"
            labelTitle="Outbound Link"
            placeholder="https://medium.com/dialogika"
            divClassName="col-5 col-md-6"
            inputClassName="text-input fs-6 w-100"
          />
        </div> */}

        <div className="card p-3 my-4 border-0 shadow-sm">
          <div className="d-flex flex-row gap-4 flex-wrap justify-content-between">
            <div className="col-12 col-md-6 mb-3">
              <TextInput
                type="text"
                name="externalTitle"
                labelTitle="Outbound Title"
                description="Link yang mengarah ke blog se-topik yang diluar dari dialogika. Misal blog dari medium"
                placeholder="Stoicism: Kunci Kebijaksanaan dan Hidup Tenang"
                divClassName="w-100"
                inputClassName="form-control fs-6 w-100 border-0 shadow-sm rounded-2"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextInput
                type="text"
                name="externalLink"
                labelTitle="Outbound Link"
                placeholder="https://medium.com/dialogika"
                divClassName="w-100"
                inputClassName="form-control fs-6 w-100 border-0 shadow-sm rounded-2"
              />
            </div>
          </div>
        </div>

        {/* Input untuk Tags dan Key Takeaway */}
        <div className="d-inline-flex flex-column flex-md-row justify-content-md-around gap-4 my-4">
          <div className="d-inline-flex justify-content-start align-items-start flex-column gap-3">
            <LabelInput
              htmlFor={"tags"}
              // description={description}
              required={true}
              title={"Tags"}
            />
            <DynamicInput name="tags" maxInputs={8} placeholder="#tags" />
          </div>
        </div>

        {/* Input untuk Author */}
        <div className="row mb-5">
          <DynamicAuthorInput
            maxInputs={3}
            name="authors"
            data-bs-toggle="modal"
            description="Penulis Article Blog"
            required={true}
          />
        </div>
        <button
          type="button"
          className="appointment-btn"
          onClick={() => setShowGuide(true)}
          style={{ width: "fit-content" }}
        >
          Buka Guide
        </button>
        <EditorModal show={showGuide} onHide={() => setShowGuide(false)} />
        {/* NOTES : GUNAKAN JODIT REGULAR BILA ADA MASALAH DENGAN UI/UX KARNA LEBIH STABIL YANG REGULAR DIBANDINGKAN DENGAN PRO */}
        <JoditRegularEditor />

        <button type="submit" className="appointment-btn mt-4 align-self-end">
          Publish Article
        </button>
      </form>
      {isLoading && <LoadingIndicator />}
      {isSuccess && <SuccessIndicator onClose={() => setSuccess(false)} />}
      {isFailed && <FailedIndicator onClose={() => setIsFailed(false)} />}
    </>
  );
};

export default FormArticle;

interface IndicatorProps {
  onClose?: () => void;
}

const SuccessIndicator: React.FC<IndicatorProps> = ({ onClose }) => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-success">
    <FontAwesomeIcon icon={faCheck} beat style={{ width: 50, height: 50 }} />
    <strong>Success!</strong> Article submitted successfully.
    <button type="button" className="btn btn-primary" onClick={onClose}>
      Close
    </button>
  </div>
);

const LoadingIndicator: React.FC<IndicatorProps> = () => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-warning">
    <FontAwesomeIcon icon={faSpinner} spin style={{ width: 50, height: 50 }} />
    <strong>Uploading !</strong> Please Wait.
  </div>
);

const FailedIndicator: React.FC<IndicatorProps> = ({ onClose }) => (
  <div className="fixed-top gap-3 d-flex flex-column justify-content-center align-items-center w-100 h-100 alert alert-danger">
    <FontAwesomeIcon icon={faSpinner} spin style={{ width: 50, height: 50 }} />
    <strong>Failed ! Cant publish new article</strong> Please try again later!
    <button type="button" className="btn btn-primary" onClick={onClose}>
      Close
    </button>
  </div>
);
