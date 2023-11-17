import { useState } from "react";
import {auth} from '../../firebase-config'
//const axios = require('axios');

const defaultFormFields = {
    img: '',
    title: '',
    postText: '',
}

const CreatePost = ({isAuth}) =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {img, title, postText} = formFields;

    console.log(auth.currentUser.displayName)
    const handleChange= (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    console.log(auth.currentUser.displayName)
    // const handleSubmitPost = async () =>{
    //     try {
    //         const postData = {
    //             userId: auth?.currentUser?.uid,
    //             username: auth?.currentUser?.displayName || "",
    //         }
    //     }
    // }

    return ( 
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create a Post</h2>

            <form className="mt-4" >
                <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                    Image
                </label>
                <input
                    id="image"
                    type="file"
                    required
                    onChange={handleChange}
                    name="image"
                    value={img}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
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
                <label htmlFor="post" className="block text-sm font-medium text-gray-600">
                    Post
                </label>
                <textarea
                    required
                    onChange={handleChange}
                    name="post"
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

    )
}

export default CreatePost