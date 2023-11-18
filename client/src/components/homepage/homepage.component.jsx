import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import imgLoad from "../../../public/loading.gif";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [expandedContent, setExpandedContent] = useState({});

  const handleReadMore = (postId) => {
    setExpandedContent((prevExpandedContent) => ({
      ...prevExpandedContent,
      [postId]: !prevExpandedContent[postId],
    }));
  };
  const user_id = localStorage.getItem('userUid');

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

  const handleDeletePost = async (post_id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-post/${user_id}/${post_id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        window.location.reload();
      } else if (response.status === 404) {
        alert('Post not found');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post', error);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="grid gap-4 p-20">
      <h1 className="text-center text-xl">Your Blog Posts</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <img src={imgLoad} alt="Loading" />
        </div>
      ) : (
        blogPosts.map((post) => (
          <div key={post.post_id} className="relative border p-6 rounded-lg shadow-md bg-white">
            <div className="flex items-center m-4">
              <img 
                src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(post.img.data)))}`} 
                alt={`Post ${post.post_id}`} 
                className="w-32 h-32 object-cover rounded-full mr-4" 
              />
              <div>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-500 text-sm">{formatCreatedAt(post.created_at)}</p>
              </div>
            </div>
            <p className="text-gray-700">
              {expandedContent[post.post_id] || post.content.length <= 200
                ? post.content
                : `${post.content.substring(0, 200)}... `}
              {post.content.length > 200 && !expandedContent[post.post_id] && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleReadMore(post.post_id)}
                >
                  Read More
                </span>
              )}
            </p>
            <div className="absolute bottom-0 right-0 p-2">
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleDeletePost(post.post_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))    
      )}
    </div>
  );
}

export default Home;
