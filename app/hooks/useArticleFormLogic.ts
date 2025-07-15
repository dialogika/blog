import { BlogArticleProps, BlogAuthorProps } from "@/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogPreviewState } from "../store/blogPreviewSlice";
import { setLocalStorageItem, StorageKeys } from "../utils/localStorageUtils";
import { generateIdArticle } from "@/lib/generateIdArticle";

interface UseArticleFormLogicProps {
  availableAuthors: BlogAuthorProps[];
}

const useArticleFormLogic = ({ availableAuthors }: UseArticleFormLogicProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const dispatch = useDispatch();

  // const { editorValue, setEditorValue, joditConfig } = useJoditEditorLogic();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaData, setMetaData] = useState("");
  const [cardsDescription, setCardsDescription] = useState("");
  const [writerNote, setWriterNote] = useState("");
  const [externalTitle, setExternalTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [editorContent, setEditorContent] = useState(`<div class="row">

        <!-- 2 first paragraph of the draft -->
        <div class="col-lg-7 mt-4">
            <p style="line-height: 32px;"><span style="color: rgb(153, 153, 153);" class="fw-lighter">Ganti dengan keyword - </span> Bagian awal HARUS ada dua (2) paragraph Ini paragraph pertama</p>
            <p style="line-height: 32px;">ini bagian paragraph kedua</p>
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
      </div>`);

  const loadArticleToForm = (article: BlogArticleProps) => {
    setTitle(article.title || "");
    setThumbnail(article.thumbnail || "https://www.dialogika.co/assets/img/logo.webp");
    setKeywords(article.keywords || "");
    setMetaData(article.metaData || "");
    setCardsDescription(article.cardsDescription || "");
    setWriterNote(article.writerNote || "");
    setExternalTitle(article.outBoundLink?.title || "Medium");
    setExternalLink(article.outBoundLink?.link || "https://medium.com/dialogika");
    setEditorContent(article.content || "");
  };

  // Function untuk mengambil value dari form yang ada di FormArticle.tsx
  // Hanya menerima event dari Form. Event lainnya seperti onClick, onMouseOver, dll tidak akan diterima
  const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
    // payload ini akan digunakan untuk menampung semua data dari FormArticle
    const payload: Partial<BlogArticleProps> = {};

    // Set tgl publish
    payload.publishedAt = new Date().toISOString();

    // Ambil link/URL untuk thumbnail blog
    payload.thumbnail = thumbnail.length < 5 ? "https://www.dialogika.co/assets/img/logo.webp" : thumbnail;

    // Ambil judul blog dan buat id dari judul tersebut
    if (!title || title.length <= 2) return alert("Judul Blog Belum dimasukkan");
    payload.title = title;

    payload.idArticle = generateIdArticle(title); // Contoh hasil: /rahasia-membuat-pembukaan...

    // Ambil metadata untuk blog
    if (!metaData) return;
    if (metaData.length > 160)
      return alert("Metada tidak boleh lebih dari 160 karakter. Spasi, angka, simbol termasuk karakter !!");
    payload.metaData = metaData;

    if (!cardsDescription) return;
    payload.cardsDescription = cardsDescription;

    // Ambil keyword untuk blog
    if (!keywords) return;
    payload.keywords = keywords;

    // Ambil writer notes untuk blog
    if (!writerNote) return;
    payload.writerNote = writerNote;

    // Ambil outbound title & link untuk blog. Bila tidak ada, gunakan link medium dialogika
    payload.outBoundLink = {
      title: externalTitle || "Medium",
      link: externalLink || "https://medium.com/dialogika",
    };

    const formData = new FormData(event.currentTarget);
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
    // const content = formData.get("formEditor") as string;
    payload.content = editorContent;
    return payload;
  };

  // Function untuk handle event saat copywriter akan submit artikelnya ke database
  const handleFormPublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!window.confirm("Apa anda yakin ingin publish Blog ini ?")) return;
    const payload = getFormData(event);
    try {
      setSuccess(false);
      setIsFailed(false);
      setIsLoading(true);
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

      //   Kirim perintah ke github untuk rebuild sehingga artikel baru akan dibuatkan halamannya
      const rebuildGithub = await fetch(
        "https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/build/triggerGithubRebuild/",
        { method: "POST" }
      );

      if (!rebuildGithub.ok) {
        const errorText = await rebuildGithub.text();
        console.log("🚀 ~ handleFormPublish ~ errorText:", errorText);
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

  // Function untuk handle event saat copywriter ingin melihat hasil artikelnya sebelum di submit ke database
  const handlePreview = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const formEvent = handleMouseEvent(event); // Ubah dulu mouse event (button click) menjadi form event(submit form)
    if (!formEvent) return;
    const payload = getFormData(formEvent);
    dispatch(updateBlogPreviewState(payload));
    if (payload) setLocalStorageItem(StorageKeys.NEW_ARTICLE_DRAFT, payload); // Store payload ke localStorage
    window.open("/blog/admin/preview-article/", "_blank");
  };

  // Function untuk menyimpan progress artikel ke mongoDB dan localStorage
  const handleSaveProgress = (event: React.MouseEvent<HTMLButtonElement>) => {
    const formEvent = handleMouseEvent(event); // Ubah dulu mouse event (button click) menjadi form event(submit form)
    if (!formEvent) return;
    const payload = getFormData(formEvent);
    if (payload) setLocalStorageItem(StorageKeys.NEW_ARTICLE_DRAFT, payload); // Store payload ke localStorage
    alert("Progress is saved !!!");
  };

  const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const findForm = event.currentTarget.closest("#FormArticle");
    if (!findForm) return alert("Failed to get data, try again later! Please report this to the HTML writer TEAM !!!");

    // Buat event-like object dengan currentTarget as sebagai <form>
    const fakeEvent = { currentTarget: findForm } as React.FormEvent<HTMLFormElement>;
    return fakeEvent;
  };

  return {
    isLoading,
    success,
    isFailed,
    setIsFailed,
    setSuccess,
    handlePreview,
    handleFormPublish,
    handleSaveProgress,
    loadArticleToForm,
    // Form field states
    title,
    thumbnail,
    keywords,
    metaData,
    cardsDescription,
    writerNote,
    externalTitle,
    externalLink,
    editorContent,
    // Form field setters
    setTitle,
    setThumbnail,
    setKeywords,
    setMetaData,
    setCardsDescription,
    setWriterNote,
    setExternalTitle,
    setExternalLink,
    setEditorContent,
  };
};

export default useArticleFormLogic;
