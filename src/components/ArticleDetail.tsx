import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const STRAPI_URL = "http://localhost:1337";

export default function ArticleDetail() {
  const { id } = useParams(); // Get article id from the URL
  const [article, setArticle] = useState<any>(null); // State for the article data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Function to fetch article data from the API
  const getArticle = async (id: string) => {
    try {
      const response = await fetch(
        `${STRAPI_URL}/api/articles/${id}?populate=*`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
      }
      const data = await response.json();
      setArticle(data.data); // Set the article data to state
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle(id); // Fetch article details when id changes
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading text while the article is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if there's an issue fetching the article
  }

  if (!article) {
    return <p>Article not found.</p>; // Show a message if no article is found
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img
        className="w-full h-64 object-cover mb-4"
        src={STRAPI_URL + article.cover.url} // Image URL from Strapi
        alt={article.title}
      />
      <p className="text-lg mb-4">{article.description}</p>
      <div className="text-base">
        {article.blocks.map((block: any, index: number) => {
          switch (block.__component) {
            case "shared.rich-text":
              return (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.body }}
                />
              );
            case "shared.quote":
              return (
                <blockquote
                  key={index}
                  className="mb-4 p-4 border-l-4 border-gray-500"
                >
                  <p className="italic">"{block.body}"</p>
                  <footer className="text-right font-semibold">
                    {block.title}
                  </footer>
                </blockquote>
              );
            case "shared.media":
              return (
                <div key={index} className="my-4">
                  <p>Media component here (could be a video or image)</p>
                </div>
              );
            case "shared.slider":
              return (
                <div key={index} className="my-4">
                  <p>Slider component content</p>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
