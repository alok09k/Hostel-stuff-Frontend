import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './AppContext';

const MyProduct = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const { apiUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${apiUrl}/my-product`, { userId });
        setLikedProducts(response.data.product);
      } catch (err) {
        setError('Error fetching liked products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId, apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {likedProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found in your wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center border rounded-lg p-2 shadow-md hover:shadow-lg transition w-60 relative"
            >
              <div className="relative w-full">
                <img
                  src={product.imageurl}
                  alt={product.productName || 'Product image'}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 text-center">{product.productName}</h3>
              <div className="flex items-center space-x-1 text-yellow-500 mt-1">
                {Array.from({ length: product.rating || 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.857 1.417 8.376L12 18.897l-7.417 4.642 1.417-8.376-6.001-5.857 8.332-1.151z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mt-2 text-xs text-center">{product.productDescription}</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹{product.price}</p>
              <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md mt-3 hover:bg-blue-600 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
