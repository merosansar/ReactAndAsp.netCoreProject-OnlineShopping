import React from 'react';

function PaymentMethods() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-80 bg-white p-6 rounded shadow-md">
                <h2 className="text-center text-2xl font-semibold mb-4">Payment Methods</h2>
                <div className="space-y-4">
                    <button
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Credit / Debit Card
                    </button>
                    <button
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Cash On Hand
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethods;