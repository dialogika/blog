export interface BlogArticleProps {
  id: string;
  title: string;
  thumbnail: string;
  metaData: string;
  keywords: string;
  cta?: string;
  cardsDescription?: string;
  canonical?: string;
  content: string;
  images: Array<{
    name: string;
    src: string;
  }>;
  authors: Array<{
    authorName: string;
    imgPath: string;
    quotes?: string;
  }>;
  writerNote: string;
  publishedAt: string;
  keyTakeaway?: string[];
  tags?: string[];
  articleQuote: {
    figure: string;
    quote: string;
  };
}

export const blogArticleDummy: BlogArticleProps[] = [
  {
    id: "pentingnya-mempelajari-dosen-penguji-sebelum-sidang-skripsi-tips-persiapan-maksimal",
    title: "Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi: Tips Persiapan Maksimal",
    thumbnail:
      "https://images.unsplash.com/photo-1515603403036-f3d35f75ca52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    metaData:
      "Pelajari tipe-tipe dosen penguji sidang skripsi untuk persiapan maksimal. Temukan tips praktis menghadapi tipe dosen guna menunjang kelancaran sidang skripsi.",
    keywords: "Pentingnya Mempelajari Dosen Penguji Sebelum Sidang Skripsi",
    cta: "testing",
    cardsDescription:
      "Kenali gaya dan preferensi dosen penguji sebelum sidang skripsi agar lebih siap menghadapi pertanyaan mereka! 🎓 Dengan strategi yang tepat, kamu bisa menyusun jawaban yang lebih meyakinkan dan meningkatkan peluang sukses. Simak tips persiapannya di sini! ✅",
    content: "lorem ipsum, hellow world !",
    images: [
      {
        name: "gambar-1",
        src: "https://images.unsplash.com/photo-1515603403036-f3d35f75ca52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    authors: [
      {
        authorName: "Jessica Caesya Agustin",
        imgPath: "https://www.dialogika.co/blog/asset/img/intern/jessica-caesya-agustin.webp",
      },
      {
        authorName: "Yoga Pangestu",
        imgPath: "https://www.dialogika.co/blog/asset/img/intern/yoga-pangestu.jpg",
      },
    ],
    writerNote: "Artikel ini ditulis untuk orang-orang",
    publishedAt: "2025-05-13",
    keyTakeaway: ["key Takeaway 1", "key takeaway 2"],
    tags: ["tags 1", "tags 2"],
    articleQuote: { figure: "ligma", quote: "ballls" },
  },
  {
    id: "mengapa-pitching-sangat-penting-dalam-dunia-bisnis-ini-dia-alasannya",
    title: "Mengapa Pitching Sangat Penting dalam Dunia Bisnis? Ini Dia Alasannya!",
    thumbnail: "https://i.pinimg.com/736x/0d/bd/66/0dbd66bf02b96a91e5f242eed49235bd.jpg",
    metaData: "Pelajari cara pitching karna sangat penting bila ingin terjun kedalam dunia bisnis",
    keywords: "Pelajari cara pitching karna sangat penting bila ingin terjun kedalam dunia bisnis",
    cta: "pitching",
    cardsDescription: "Kenali gaya dan cara untuk pitching investor-investormu bangh.",
    content: "lorem ipsum, hellow world !",
    images: [
      {
        name: "gambar-1",
        src: "https://images.unsplash.com/photo-1515603403036-f3d35f75ca52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "gambar-1",
        src: "https://i.pinimg.com/736x/0d/bd/66/0dbd66bf02b96a91e5f242eed49235bd.jpg",
      },
    ],
    authors: [
      {
        authorName: "Jessica Caesya Agustin",
        imgPath: "https://www.dialogika.co/blog/asset/img/intern/jessica-caesya-agustin.webp",
      },
      {
        authorName: "Yoga Pangestu",
        imgPath: "https://www.dialogika.co/blog/asset/img/intern/yoga-pangestu.jpg",
      },
    ],
    writerNote: "Artikel ini ditulis untuk orang-orang",
    publishedAt: "2025-03-13",
    keyTakeaway: ["key Takeaway 1", "key takeaway 2"],
    tags: ["tags 1", "tags 2"],
    articleQuote: { figure: "ligma", quote: "ballls" },
  },
];
