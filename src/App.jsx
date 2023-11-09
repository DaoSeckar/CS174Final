import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [textValue, setTextValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submittedItems, setSubmittedItems] = useState([]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 300;
          canvas.height = 300;
          ctx.drawImage(img, 0, 0, 300, 300);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.9);
        };
      };
    });
  };

  const handleSubmit = async () => {
    // Validate that both text and image are provided
    if (!textValue || !imageFile) {
      alert('Please enter text and upload an image.');
      return;
    }

    // Resize the image
    const resizedImageBlob = await resizeImage(imageFile);

    // Create a new submitted item
    const newItem = {
      text: textValue,
      image: URL.createObjectURL(resizedImageBlob),
    };

    // Update the list of submitted items
    setSubmittedItems([...submittedItems, newItem]);

    // Clear the form after submission (optional)
    setTextValue('');
    setImageFile(null);
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center'>
        <input
          type='text'
          value={textValue}
          onChange={handleTextChange}
          placeholder='Enter text...'
          className='border p-2 mb-4'
        />
        <input
          type='file'
          accept='image/jpeg'
          onChange={handleImageChange}
          className='mb-4'
        />
        <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded'>
          Submit
        </button>

        {/* Display submitted items */}
        <div className='mt-4'>
          {submittedItems.map((item, index) => (
            <div key={index} className='mb-2'>
              <p>{item.text}</p>
              <img src={item.image} alt='Submitted' className='max-w-full h-auto' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
