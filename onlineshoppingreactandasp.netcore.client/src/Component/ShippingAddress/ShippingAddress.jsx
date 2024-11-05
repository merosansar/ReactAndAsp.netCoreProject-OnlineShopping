import React from 'react';

function ShippingAddress() {
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
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your shipping address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="emailAddress">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ShippingAddress;