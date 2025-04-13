"use client";
import dynamic from "next/dynamic";
import React from "react";
import useJoditEditorLogic from "@/app/hooks/useJoditEditorLogic";
import "/public/assets/css/jodit-button-generator.css";

const JoditEditor = dynamic(() => import("jodit-pro-react"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const JoditRegularEditor = () => {
  const { editorValue, setEditorValue, joditConfig } = useJoditEditorLogic();

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
