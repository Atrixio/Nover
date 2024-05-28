import { Article } from "@/type/article";
import { create } from "zustand";

type ArticleStoreState = {
  articles: Article[];
  setArticles: (a: Article[]) => void;
};

export const useArticlesStore = create<ArticleStoreState>()((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
}));
