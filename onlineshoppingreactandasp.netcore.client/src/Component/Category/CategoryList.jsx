import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
/*import $ from 'jquery';*/
import { FaHeart, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import axios from 'axios'

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If products are passed from NavBar, use them; otherwise, fetch all categories
        if (location.state?.products) {
            setCategoryList(location.state.products);
        } else {
            populateCategoryData();
        }
    }, [location.state]);

    async function populateCategoryData() {
        try {
            const response = await axios.get('api/category/index');
           /* , { withCredentials: true }*/
            const data = response.data; // No need for response.json() when using axios
            setCategoryList(data);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    }

    // Function to handle Add to Cart
  const handleAddToCart = (product) => {
   /* console.log('Add to Cart clicked:', product);*/
    navigate('/addcart', { state: { product } });
};



    return (
        <div className="category-list  flex flex-wrap justify-start mx-0 px-8 gap-2 ">
            {categoryList.map((product, index) => (
                <div key={index} className="flex  mb-4 pb-4">
                    <div className="max-w-[14rem] bg-white border border-gray-200 rounded-lg shadow-md mt-2 ml-2">
                        <div className="p-2 mb-4">
                            {/* Product Image */}
                            <div className="relative">
                                <img
                                    className="rounded-t-lg w-[15rem] h-[15rem] object-cover"
                               

                                    src={product.imageUrl}                                      

                                    alt={product.name}
                                   
                                />
                            </div>

                            {/* Product Information */}
                            <h5 className="text-sm font-semibold tracking-tight text-gray-900 mt-2">
                                {product.name}
                            </h5>
                            <p className="text-s  text-orange-400">
                                Rs: ${product.price.toFixed(2)}
                            </p>

                            {/* Wishlist and Buy Buttons */}
                            <div className="flex justify-between items-center mt-3">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                                    <FaHeart className="w-3 h-3" />
                                    <span className="text-xs">Wishlist</span>
                                </button>
                                <button onClick={() => handleAddToCart(product)}    style={{ fontSize: '10px' }} className="text-white w-1/2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-2 py-1 text-center">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;