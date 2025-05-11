import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Article {
  id: string;
  documentId: string;
  title: string;
  content: string;
  cover: { url: string };
  publishedAt: Date;
}

const STRAPI_URL = "http://localhost:1337";

export default function AppComponent() {
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch articles from Strapi
  const getArticles = async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
      if (!response.ok) {
        console.error("Failed to fetch articles:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log("Fetched Articles:", data.data); // 👈 Check if documentId is included
      setArticles(data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Format Date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Fetch articles when the component mounts
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        React.js and Strapi Integration
      </h1>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <article
                key={article.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link to={`/articles/${article.documentId}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={STRAPI_URL + article.cover.url}
                    alt={article.title}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.content}</p>
                    <p className="text-sm text-gray-500">
                      Published: {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
