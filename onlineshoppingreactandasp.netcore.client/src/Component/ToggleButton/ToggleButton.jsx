import React, { useState } from 'react';
function ToggleButton() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div className="flex items-center justify-center  bg-sky-600 mr-10">
            {/* Round Button */}
            <button onClick={toggleOptions}   className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 focus:outline-none"  > P</button>
            {/* Options Div */}
            {showOptions && (
                <div className="absolute top-12 p-4 mt-2 space-y-2 bg-white rounded-lg shadow-lg">
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded"><a href="/createproduct"> Add Product </a></div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded"><a href="/category">Add Category</a></div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded"> <a href="/ProductDetails">Add Product Details</a></div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded"> <a href="#">Sign Out</a></div>
                </div>
            )}
        </div>
    );
}
export default ToggleButton;