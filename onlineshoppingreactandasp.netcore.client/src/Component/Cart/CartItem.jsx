import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { CartItemList } = location.state || { CartItemList: [] };

    return (
        <div className="flex items-start flex-row shadow mt-5 p-4 w-full">
            <div className="w-3/4">  {/*left side table */}
                <table className="table-fixed w-full border border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left px-4 py-2 font-semibold"> <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" /> Select All</th>
                            <th className="text-left px-8 py-2 font-semibold">Image</th>
                            <th className="text-left px-4 py-2 font-semibold">Product</th>
                            <th className="text-left px-4 py-2 font-semibold">Price</th>
                            <th className="text-center px-4 py-2 font-semibold">Quantity</th>
                            <th className="text-center px-4 py-2 font-semibold">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CartItemList && CartItemList.length > 0 ? (
                            CartItemList.map((item, index) => (
                                <tr key={item.cartItemId} className="border-b">
                                    <td className="px-4 py-2">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked={item.IsSelected} />
                                    </td>
                                    <td className="px-4 py-2">
                                        {/* Placeholder for the image; replace with actual item image URL if available */}
                                        <img src={item.imageUrl} className="w-16 h-16 object-cover cursor-pointer rounded-full border border-green-500 hover:border-blue-500" alt="Product" />
                                    </td>
                                    <td className="px-4 py-2">{item.productName}</td>
                                    <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 flex items-center">
                                        <button className="border px-3 py-1 text-lg">-</button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button className="border px-3 py-1 text-lg">+</button>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-2">
                                    No items in the cart.
                                </td>
                            </tr>
                        )}              
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-start justify-start w-1/4 px-4 space-y-2"> {/*right side div */}
                <div>Quantity</div>
                <div>Price</div>
                <div>Total Price</div>
                <div>Quantity</div>
                <div>
                    <button  className="text-white w-full h-1/4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-2 py-1  text-center">
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CartItem;