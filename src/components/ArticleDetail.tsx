// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const STRAPI_URL = "http://localhost:1337";

// export default function ArticleDetail() {
//   const { id } = useParams(); // Get article id from the URL
//   const [article, setArticle] = useState<any>(null); // State for the article data
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   // Function to fetch article data from the API
//   const getArticle = async (id: string) => {
//     try {
//       const response = await fetch(
//         `${STRAPI_URL}/api/articles/${id}?populate=*`
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch article: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setArticle(data.data); // Set the article data to state
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getArticle(id); // Fetch article details when id changes
//     }
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>; // Show loading text while the article is being fetched
//   }

//   if (error) {
//     return <p>Error: {error}</p>; // Show error message if there's an issue fetching the article
//   }

//   if (!article) {
//     return <p>Article not found.</p>; // Show a message if no article is found
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
//       <img
//         className="w-full h-64 object-cover mb-4"
//         src={STRAPI_URL + article.cover.url} // Image URL from Strapi
//         alt={article.title}
//       />
//       <p className="text-lg mb-4">{article.description}</p>
//       <div className="text-base">
//         {article.blocks.map((block: any, index: number) => {
//           switch (block.__component) {
//             case "shared.rich-text":
//               return (
//                 <div
//                   key={index}
//                   dangerouslySetInnerHTML={{ __html: block.body }}
//                 />
//               );
//             case "shared.quote":
//               return (
//                 <blockquote
//                   key={index}
//                   className="mb-4 p-4 border-l-4 border-gray-500"
//                 >
//                   <p className="italic">"{block.body}"</p>
//                   <footer className="text-right font-semibold">
//                     {block.title}
//                   </footer>
//                 </blockquote>
//               );
//             case "shared.media":
//               return (
//                 <div key={index} className="my-4">
//                   <p>Media component here (could be a video or image)</p>
//                 </div>
//               );
//             case "shared.slider":
//               return (
//                 <div key={index} className="my-4">
//                   <p>Slider component content</p>
//                 </div>
//               );
//             default:
//               return null;
//           }
//         })}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const STRAPI_URL = "http://localhost:1337";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/articles/${id}?populate[cover]=true&populate[blocks]=true&populate[author][populate]=avatar`
        );
        if (!res.ok) throw new Error("Failed to fetch article");

        const data = await res.json();
        setArticle(data.data); // data.data is your article object
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found</p>;

  // Access article fields directly, no attributes wrapper
  const coverUrl = article.cover ? STRAPI_URL + article.cover.url : null;

  const author = article.author;
  const avatarUrl = author?.avatar ? STRAPI_URL + author.avatar.url : null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      {coverUrl && (
        <img
          src={coverUrl}
          alt="Cover"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {author && (
        <div className="flex items-center space-x-4 mb-6">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Author Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <span className="text-lg font-medium">{author.name}</span>
        </div>
      )}

      <p className="text-lg mb-4">{article.description}</p>

      <div className="text-base">
        {article.blocks?.map((block: any, index: number) => {
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
                  <p>Media block</p>
                </div>
              );
            case "shared.slider":
              return (
                <div key={index} className="my-4">
                  <p>Slider block</p>
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
