interface Article {
    id: number;
    title: string;
    content: string;
  }
  
  // 今回は固定値として表示
  const demoArticles = [
    {
      id: 1,
      title: "Nuxt3入門",
      content:
        "Nuxt3が公式リリースされました。Nuxt3ではVue3対応だけでなく、NitroやVite等様々な改善が施されています。",
    },
    {
      id: 2,
      title: "Jest再入門",
      content:
        "今回はJestのモックについて整理していきます。Jestはビルトインでマッチャーが提供され、これ単体で多くのユースケースをサポートします。",
    },
  ];
  
  export function useArticles() {
    const articles = ref<Article[]>([]);
    const article = ref<Article | null>(null);
  
    // 将来的にはAPIアクセス
    const fetchArticles = (): void => {
      articles.value = demoArticles;
    };
    const fetchArticle = (id: number): void => {
      article.value = demoArticles.find((article) => id === article.id) || null;
    };
  
    return {
      articles,
      article,
      fetchArticle,
      fetchArticles,
    };
  }