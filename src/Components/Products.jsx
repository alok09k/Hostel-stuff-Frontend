import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { AppContext } from './AppContext';
import { useContext } from 'react';

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
    const {apiUrl} = useContext(AppContext)

  // Simulate fetching products from backend
  const url =`${apiUrl}/get-product`; // Replace with your actual API URL

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.product || []); // Ensure fallback to an empty array
        setIsLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Also stop loading in case of an error
      });
  }, []); 
 

  return (
    <div className="container mx-auto p-6 bg-gray-100" id="products">
      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8">
         Products
      </h2>

      {isLoading ? (
        // Loading Spinner
        <div className="flex justify-center items-center h-96">
          <img
            src="/loading-spinner.svg"
            alt="Loading..."
            className="h-16 w-16 animate-spin"
          />
        </div>
      ) : (
        // Products Grid
        <div className="flex flex-wrap items-center justify-center gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} productId={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
