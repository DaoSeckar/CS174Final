import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [expandedContent, setExpandedContent] = useState({});

  const handleReadMore = (postId) => {
    setExpandedContent({ ...expandedContent, [postId]: true });
  };
  const user_id = auth.currentUser.uid;

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-post/${user_id}`);
        const data = await response.json();
        if (response.status === 200) {
          setBlogPosts(data);
          setIsLoading(false);
        } else {
          throw new Error("Error");
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getUserPosts();
  }, []);

  const formatCreatedAt = (createdAt) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
    return new Date(createdAt).toLocaleString('en-US', options);
  };

  return (
    <div className="grid gap-4 p-20">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <img src="loading.gif" alt="Loading" />
        </div>
      ) : (
        blogPosts.map((post) => (
          <div key={post.id} className="border p-20 rounded-lg">
            <div className="flex items-center m-4">
              <img 
                src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(post.img.data)))}`} 
                alt={`Post ${post.id}`} 
                className="w-24 h-24 object-cover m-4" 
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-500 text-sm">{formatCreatedAt(post.created_at)}</p>
              </div>
            </div>
            <p className="text-gray-700">
              {expandedContent[post.id] || post.content.length <= 200
                ? post.content
                : `${post.content.substring(0, 200)}... `}
              {post.content.length > 200 && !expandedContent[post.id] && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More
                </span>
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;