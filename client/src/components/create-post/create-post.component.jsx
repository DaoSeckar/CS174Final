import { useState } from "react";
import {auth} from '../../firebase-config'
//const axios = require('axios');
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    img: null,
    title: "",
    postText: "",
  };
  
const CreatePost = () => {
  let navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, postText } = formFields;
  const [img, setImg] = useState(null); // Separate state for image

  const handleChange = (event) => {
    const { name, value, files } = event.target;
  
    if (name === "img") {
      setImg(files[0]);
    } else {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

      try {
        const formData = new FormData();
        formData.append("userId", auth?.currentUser?.uid);
        formData.append("img", img || "");
        formData.append("title", title);
        formData.append("content", postText);
        const response = await fetch("http://localhost:3000/create-post", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
            setFormFields(defaultFormFields);
            setImg(null);
            navigate('/homepage');
        } else {
            throw new Error("Failed to submit post");
        }
      } catch (error) {
          console.error("Error posting data:", error);
      }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create a Post</h2>

      <form className="mt-4" onSubmit={handleSubmitPost}>
        <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Image
              </label>
              <input
                accept="image/*"
                type="file"
                onChange={handleChange}
                name="img"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
              {img && (
                  <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Selected Image Preview:</p>
                      <img
                          src={URL.createObjectURL(img)}
                          alt="Selected"
                          className="max-w-full h-auto rounded-md"
                      />
                  </div>
              )}
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            onChange={handleChange}
            placeholder="Title..."
            name="title"
            value={title}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postText" className="block text-sm font-medium text-gray-600">
            Post
          </label>
          <textarea
            required
            onChange={handleChange}
            name="postText"
            placeholder="Post..."
            value={postText}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;