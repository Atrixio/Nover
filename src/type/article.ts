export interface Article {
  id: number;
  title?: string;
  content?: string;
  createTime: number;
  updateTime: number;
}

export type ArticleCreate = Omit<Article, "id" | "createTime" | "updateTime">;
export type ArticleGet = Pick<Article, "id">;
export type ArticleUpdate = Omit<Article, "createTime" | "updateTime">;
export type ArticleInfo = Omit<Article, "content">;
