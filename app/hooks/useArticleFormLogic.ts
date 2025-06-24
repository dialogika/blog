import { BlogArticleProps, BlogAuthorProps } from "@/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogPreviewState } from "../store/blogPreviewSlice";
import { setLocalStorageItem, StorageKeys } from "../utils/localStorageUtils";

interface UseArticleFormLogicProps {
  availableAuthors: BlogAuthorProps[];
}

const useArticleFormLogic = ({ availableAuthors }: UseArticleFormLogicProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const dispatch = useDispatch();

  // Function untuk mengambil value dari form yang ada di FormArticle.tsx
  // Hanya menerima event dari Form. Event lainnya seperti onClick, onMouseOver, dll tidak akan diterima
  const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
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
    const test = formData.get(`author-1`);
    console.log("THIS IS AUTHER GET:", test);
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
    return payload;
  };

  // Function untuk handle event saat copywriter akan submit artikelnya ke database
  const handleFormPublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    getFormData,
    dispatch,
    handleSaveProgress,
    handleFormPublish,
    handlePreview,
    isLoading,
    success,
    setSuccess,
    isFailed,
    setIsFailed,
  };
};

export default useArticleFormLogic;
