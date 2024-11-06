import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShippingAddress() {
    const location = useLocation();
    const navigate = useNavigate();

    // Set initial state from location data (selectedItems)
    const [cartItems, setCartItems] = useState(location.state?.selectedItems || []);
    const [shippingAddress, setShippingAddress] = useState('');
    const [phoneNo, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'shippingAddress') setShippingAddress(value);
        if (id === 'phoneNumber') setPhoneNumber(value);
        if (id === 'emailAddress') setEmailAddress(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //// Validate if required fields are filled
        //if (!shippingAddress || !phoneNo || !emailAddress || cartItems.length === 0) {
        //    alert('Please fill in all fields and select at least one item.');
        //    return;
        //}

        // Prepare the order data
        const orderData = {
            cartItemList: cartItems,
            shippingAddress,
            phoneNo,
            emailAddress,
            id:0
        };

        try
        {
            // Submit the data to the backend API for order placement
            const response = await axios.post('/api/order/checkout', orderData);
            var result = response.data;
            if (result == 'SUCCESS')
            {
                console.log('Order placed successfully:', result);
                

                /*  navigate('/PaymentMethods');*/
                navigate('/');
            }
            else
            {
                console.error('Failed to place order:', response);
            }
        }
        catch (error)
        {
            console.error('Error during order placement:', error);
        }
    };





    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-96 bg-white p-6 rounded shadow-md">
                <h2 className="text-center text-2xl font-semibold mb-4">User Shipping Address</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="shippingAddress">Shipping Address</label>
                        <input
                            type="text"
                            id="shippingAddress"
                            value={shippingAddress}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your shipping address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNo}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="emailAddress">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            value={emailAddress}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="text-white w-full  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ShippingAddress;