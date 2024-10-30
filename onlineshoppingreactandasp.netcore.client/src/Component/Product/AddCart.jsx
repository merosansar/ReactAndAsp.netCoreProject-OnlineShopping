import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';




const AddCart = () => {
    const location = useLocation();
    const { product } = location.state;  // Extract the product data passed via state
    const [quantity, setQuantity] = useState(1);

   

    const handleQuantityChange = (value,highlimit) => {
        if (value >= 1 && value <= highlimit) {
            setQuantity(value);
        }
       
    };
    return (
        <div className="flex flex-col  bg-white   px-20 mx-10">
        <div className="flex justify-center p-6">
            {/* Left side: Product Image */}
                <div className="w-1/4 border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300  p-2 ">
                    <div className="flex flex-col items-center space-y-4 ">
                    {/* Main Product Image */}
                    <img
                            src={product.imageUrl} 
                            alt={product.name} 
                        className="w-[15rem] h-[20rem] object-cover cursor-pointer"
                    />                 
                </div>
                  
            </div>
            {/* Right side: Product Details */}
            <div className="w-3/4 pl-10">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                <div className="flex items-center my-2">
                    <span className="text-yellow-500 text-xs">⭐⭐⭐⭐</span>
                    <span className="ml-2 text-sm">(2 Ratings)</span>
                </div>
                    <p className="text-lg text-red-600 font-bold">Rs. {product.price.toFixed(2)}</p>
                <p className="text-gray-500 text-sm mb-4">Min. spend Rs. 9,999</p>

                {/* Color Family */}
                <div className="my-4">
                    <p className="font-semibold mb-2">Color Family</p>
                    <div className="flex space-x-2">
                        <img
                            src="/images/color1.jpg"
                            alt="Pink"
                            className="w-12 h-12 object-cover border border-gray-200 p-1 cursor-pointer"
                        />
                        <img
                            src="/images/color2.jpg"
                            alt="Purple"
                            className="w-12 h-12 border border-gray-200 p-1 cursor-pointer"
                        />
                    </div>
                </div>

                    {/* Size Selector */}
                    <div className="my-4">
                        <p className="font-semibold mb-2">Size</p>
                        <div className="flex space-x-2">
                            {["M", "42", "44", "S", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    className="border border-gray-300 py-2 px-4 w-12 text-xs rounded cursor-pointer hover:border-orange-500 hover:text-gray-700"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
               
            </div>
         {/*   third div in right*/}
                <div className="flex justify-start flex-col p-2  w-1/4 h-full  space-y-4">

                    <div>  <span> Quantity : {quantity}</span></div>
                    <div ><span> Price  : {product.price}</span></div>
                    <div ><span> Total Amount   :  {product.price * quantity}</span></div> 
                </div>
         
            </div>
            <div className="flex flex-row pt-0 mt-0">

                <div className="w-1/4">
                    <div className="my-4 flex  space-x-4    w-1/4" >
                       {/* Left Arrow */}
                        <button className="text-gray-400 hover:text-gray-600 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            </button>
                     
                        {/* Thumbnail Section */}
                        <div className="flex flex-row space-x-2 border border-gray-300 py-2 px-4 w-40 hover:border-orange-500">
                            {/* Thumbnails */}
                            <img
                                src="/path-to-image/thumb1.jpg"
                                alt="Thumbnail 1"
                                className="w-16 h-12 object-cover border border-gray-200 cursor-pointer"
                            />

                        </div>
                      
                        {/* Right Arrow */}
                        <button className="text-gray-400 hover:text-gray-600 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            </button>
                      
                    </div>

                </div>
                <div className="w-3/4 flex flex-col  pl-10 pt-0 mt-0">
               

                {/* Quantity Selector */}
                <div className="my-4">
                    <p className="font-semibold mb-2">Quantity</p>
                    <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1, product.quantity)}
                            className="border px-3 py-1 text-lg"
                        >
                            -
                            </button>
                            <span>{quantity}</span>
                        <button
                                onClick={() => handleQuantityChange(quantity + 1, product.quantity)}
                            className="border px-3 py-1 text-lg"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-4 mb-10">
                        <button className="bg-sky-500 text-white px-10 py-1 rounded hover:bg-sky-600">Buy Now</button>
                        <button className="bg-orange-500 text-white px-10 py-1 rounded hover:bg-orange-600">Add to Cart</button>
                          
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCart;





















