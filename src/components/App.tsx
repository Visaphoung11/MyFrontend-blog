import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  cover: {
    url: string;
  };
  author: {
    id: number;
    username: string;
    email: string;
    avatar?: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  };
}

const STRAPI_URL = "http://localhost:1337";

export default function AppComponent() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        // Basic fetch, no need to populate further since Strapi already includes it
        const res = await fetch(`${STRAPI_URL}/api/articles?populate[author][populate]=avatar&populate=cover`);
        const json = await res.json();

        // Map nested data if your response is inside `data` array
        const articles = json.data.map((item: any) => {
          const a = item;
          return {
            id: a.id,
            documentId: a.documentId,
            title: a.title,
            description: a.description,
            slug: a.slug,
            publishedAt: a.publishedAt,
            cover: {
              url: a.cover?.formats?.medium?.url || a.cover?.url,
            },
            author: {
              id: a.author.id,
              username: a.author.username,
              email: a.author.email,
              avatar: {
                url:
                  a.author.avatar?.formats?.thumbnail?.url ||
                  a.author.avatar?.url,
              },
            },
          };
        });

        setArticles(articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    getArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Blog Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/articles/${article.documentId}`} key={article.id}>
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
    <img
      src={STRAPI_URL + article?.cover.url}
      alt={article.title}
      className="w-full h-48 object-cover rounded"
    />
    <h2 className="text-xl font-bold mt-4">{article.title}</h2>
    <p className="text-gray-600 text-sm mt-1">{article.description}</p>
    <div className="flex items-center mt-4">
      <img
        src={
          article.author.avatar?.url
            ? STRAPI_URL + article.author?.avatar.url
            : "/uploads/default_avatar.png"
        }
        alt={article.author.username}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <p className="text-sm text-gray-800">{article.author.username}</p>
    </div>
  </div>
</Link>
        ))}
      </div>
    </div>
  );
}
