// File ini dibuat agar mudah untuk mengetahui dan tracking item-item localStorage yg digunakan di project ini
// Bila ingin menambahkan item baru untuk disimpan di localStorage, tinggal masukkan di object "StorageKeys" dibawah ini

export enum StorageKeys {
  // Nama_Variabel = "nama key yg menjelaskan item yg akan disimpan di localStorage"
  NEW_ARTICLE_DRAFT = "newArticleDraft",  // draft progress untuk Create New Article di page /blog/admin/new-story/
  COPYWRITER_DATA = "copywriterUserData",
}

// Function untuk memasukkan value kedalam item kemudian menyimpannya di localStorage
export const setLocalStorageItem = (key: StorageKeys, value: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Function untuk mengambil item yang disimpan di localStorage. Hanya memerlukan key dari item tersebut untuk digunakan.
export const getLocalStorageItem = <Type>(key: StorageKeys): Type | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Type) : null;
  }
  return null;
};

// Function untuk menghapus item & valuenya yang disimpan di localStorage.
export const removeLocalStorageItem = (key: StorageKeys): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
