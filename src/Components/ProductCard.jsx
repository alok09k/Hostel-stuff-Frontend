import React, { useState } from "react";
import white_heart from '../assets/white_heart.png';
import pink_heart from '../assets/pink_heart.png';
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from './AppContext';
import { useContext } from 'react';

const ProductCard = ({ product,productId }) => {
  const [heart, setHeart] = useState(false);
  const userId = localStorage.getItem('userId');
  const {apiUrl} = useContext(AppContext)

  const handleLike = (productId) => {
    if (!userId) {
      toast.error('Please login first');
      return;
    }
  
    const url = `${apiUrl}/liked-product`;
    const data = { userId, productId };
  
    axios.post(url, data)
      .then((res) => {
        console.log(res);
        setHeart((prev) => !prev);
        toast.success('Liked Success')
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handledisLike = () => {
    setHeart((prev) => !prev)
    
  }

  return (
    <div className="flex flex-col items-center border rounded-lg p-2 shadow-md hover:shadow-lg transition w-60 relative">
      {/* Product Image */}
      <div className="relative w-full">
        <img
          src={ product.imageurl}
          alt={product.productName}
          className="w-full h-40 object-cover rounded-md"
        />
        {/* Heart Icon Container */}
        <div className="absolute top-2 right-2">
          <div className="bg-white p-1 rounded-full shadow-sm">
            {heart ? <img
              src={pink_heart}
              className="w-5 h-5 cursor-pointer"
              onClick={handledisLike}
              /> :
              <img
                src={white_heart}
                className="w-5 h-5 cursor-pointer"
                onClick={()=>handleLike(productId)}

              />}
          </div>
        </div>
      </div>
      {/* Product Name */}
      <h3 className="text-sm font-semibold text-gray-800 text-center">{product.productName}</h3>
      {/* Product Rating */}
      <div className="flex items-center space-x-1 text-yellow-500 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.857 1.417 8.376L12 18.897l-7.417 4.642 1.417-8.376-6.001-5.857 8.332-1.151z" />
          </svg>
        ))}
      </div>
      {/* Product Description */}
      <p className="text-gray-600 mt-2 text-xs text-center">{product.productDescription}</p>
      {/* Product Price */}
      <p className="text-base font-bold text-gray-800 mt-2">₹{product.price}</p>
      {/* Buy Now Button */}
      <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md mt-3 hover:bg-blue-600 transition">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
