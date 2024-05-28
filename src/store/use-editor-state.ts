import { Article } from "@/type/article";
import { create } from "zustand";

type EditorState = {
  article?: Article;
  setArticle: (a: Article) => void;
};

export const useEditorState = create<EditorState>()((set) => ({
  article: undefined,
  setArticle: (a) => set({ article: a }),
}));
