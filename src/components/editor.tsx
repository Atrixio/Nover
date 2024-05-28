"use client";

import { useEffect, useRef } from "react";
import { convertPlainTextToHTML, getInnerText } from "../lib/utils";
import { useEditorState } from "@/store/use-editor-state";
import { apiUpdateArticle } from "@/api/article";

const Editor = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [article] = useEditorState((s) => [s.article, s.setArticle]);

  const handleContentChange = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (!article || !article.id) {
      return;
    }
    const content = getInnerText(e.currentTarget);
    void apiUpdateArticle({
      id: article.id,
      content,
    });
  };

  const handleTitleChange = () => {
    if (!article || !article.id || !titleRef.current) {
      return;
    }
    const title = titleRef.current.value;
    void apiUpdateArticle({
      id: article.id,
      title,
    });
  };

  useEffect(() => {
    if (!titleRef.current) {
      return;
    }
    titleRef.current.value = article?.title ? article.title : "";
  }, [article]);

  return (
    <div className="m-4 h-full rounded border p-4">
      <div className="mb-4">
        <input
          className="w-full rounded border bg-slate-50 p-1"
          type="text"
          ref={titleRef}
          onChange={handleTitleChange}
        />
      </div>
      <div
        className="h-auto items-center break-words border bg-slate-100 p-1 outline-none"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{
          __html: convertPlainTextToHTML(
            article?.content ? article.content : ""
          ),
        }}
        onInput={handleContentChange}
      ></div>
    </div>
  );
};

export default Editor;
