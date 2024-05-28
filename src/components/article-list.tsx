import {
  apiCreateArticle,
  apiDeleteArticle,
  apiGetAllArticles,
  apiGetArticle,
} from "@/api/article";
import { useArticlesStore } from "@/store/use-articles-store";
import { useEditorState } from "@/store/use-editor-state";
import { Article } from "@/type/article";
import { useTimeout } from "usehooks-ts";

const ArticleList = () => {
  const [editorArticle, setArticle] = useEditorState((s) => [
    s.article,
    s.setArticle,
  ]);
  const [articles, setArticles] = useArticlesStore((s) => [
    s.articles,
    s.setArticles,
  ]);
  const get_all_articles = async () => {
    const resp = await apiGetAllArticles();
    if (resp && resp.success) {
      setArticles(resp.data.articles as Article[]);
    }
  };

  const editArticle = async (article: Article) => {
    if (article.id === editorArticle?.id) {
      return;
    }

    const resp = await apiGetArticle(article.id);
    if (resp?.success && resp.data.article) {
      setArticle(resp.data.article);
    }
  };

  const handleClickArticle = (article: Article) => editArticle(article);
  const refreshArticleList = () => get_all_articles();

  useTimeout(() => {
    void refreshArticleList();
  }, 0);

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteArticle(id);
    } catch (error) {
      console.log(error);
    } finally {
      void refreshArticleList();
    }
  };

  const handleCreateArticle = async () => {
    try {
      await apiCreateArticle({ title: "Untitled", content: "" });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("refresh");
      void refreshArticleList();
    }
  };

  return (
    <div className="m-4">
      <div className="flex justify-center">
        <button
          className="mx-auto mb-1 rounded border p-1"
          onClick={void handleCreateArticle}
        >
          create
        </button>
      </div>
      <ul>
        {articles.map((article) => (
          <li
            className="mb-1 flex justify-between rounded border px-10 py-2 text-center"
            key={article.id}
            onClick={() => void handleClickArticle(article)}
          >
            <span>{article.title}</span>
            <button onClick={() => void handleDelete(article.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
