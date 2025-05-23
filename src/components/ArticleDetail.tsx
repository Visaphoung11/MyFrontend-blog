import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const STRAPI_URL = "http://localhost:1337";

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  cover?: { url: string };
  author?: {
    name: string;
    avatar?: { url: string };
  };
}

export const ArticleDetail = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${STRAPI_URL}/api/articles?filters[documentId][$eq]=${documentId}&populate=*`
        );
        const found = res.data.data[0]; // Strapi returns an array
        if (found) {
          setArticle(found);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        setError("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [documentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>No article found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {article.cover && (
        <img
          className="mb-4 rounded"
          src={STRAPI_URL + article.cover.url}
          alt={article.title}
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">{article.description}</p>
      <p className="text-sm text-gray-400 mb-4">
        Published: {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};
