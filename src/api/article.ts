import { ArticleCreate, ArticleUpdate } from "@/type/article";
import makeApiRequest, { Resonse } from "@/lib/fetcher";

async function apiCreateArticle(
  article?: ArticleCreate
): Promise<Resonse | undefined> {
  try {
    return await makeApiRequest("create", "post", article);
  } catch (error) {
    console.error("Failed to create article:", error);
  }
}

async function apiGetArticle(id: number): Promise<Resonse | undefined> {
  try {
    return await makeApiRequest("get", "post", { id });
  } catch (error) {
    console.error("Failed to get article:", error);
  }
}

async function apiGetAllArticles(): Promise<Resonse | undefined> {
  try {
    return await makeApiRequest("get_all", "post");
  } catch (error) {
    console.error("Failed to get all articles:", error);
  }
}

async function apiUpdateArticle(
  article: ArticleUpdate
): Promise<Resonse | undefined> {
  try {
    return await makeApiRequest("update", "post", { ...article });
  } catch (error) {
    console.error("Failed to update article:", error);
  }
}

async function apiDeleteArticle(id: number): Promise<Resonse | undefined> {
  try {
    return await makeApiRequest("delete", "post", { id });
  } catch (error) {
    console.error("Failed to delete article:", error);
  }
}

export {
  apiCreateArticle,
  apiGetAllArticles,
  apiGetArticle,
  apiUpdateArticle,
  apiDeleteArticle,
};
