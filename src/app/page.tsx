"use client";

import ArticleList from "@/components/article-list";
import Editor from "@/components/editor";

export default function Home() {
  return (
    <main>
      <Editor />
      <ArticleList />
    </main>
  );
}
