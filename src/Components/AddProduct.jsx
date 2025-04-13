import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { useContext } from 'react';


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {apiUrl} = useContext(AppContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = new FormData(); // Use FormData to handle file uploads
    productData.append('productName', productName);
    productData.append('productDescription', productDescription);
    productData.append('price', price);
    productData.append('image', image);
    productData.append('userId', localStorage.getItem('userId'));

    const url = `${apiUrl}/add-product`;
    axios.post(url, productData)
      .then((res) => {
        toast.success('Product Add Succesfully')
        setTimeout(() => {
          navigate('/')
        }, 2000);
        
      })
      .catch((err) => {
        console.log(err)
      })

  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Product</h2>
      <form className="space-y-4" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {image && (
          <div className="mt-4">
            <p className="text-gray-600">Selected Image:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}
        <button
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={loading}
          type='submit'
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
