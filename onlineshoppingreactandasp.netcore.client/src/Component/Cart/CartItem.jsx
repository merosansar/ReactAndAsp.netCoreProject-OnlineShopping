import React from "react";


const CartItem = () => {
    return (
        <div className="flex items-start flex-row shadow mt-5 p-4 w-full">
            <div className="w-3/4">
                <table className="table-fixed w-full border border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left px-4 py-2 font-semibold">Select</th>
                            <th className="text-left px-8 py-2 font-semibold">Image</th>
                            <th className="text-left px-4 py-2 font-semibold">Price</th>
                            <th className="text-center px-4 py-2 font-semibold">Quantity</th>
                            <th className="text-center px-4 py-2 font-semibold">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" /></td>
                            <td className="px-4 py-2">
                                <img src="/bags.jpg" className="w-16 h-16 object-cover cursor-pointer rounded-full" alt="Product" />
                            </td>
                            <td className="px-4 py-2">5.00</td>
                            <td className="px-4 py-2 ">
                                <button className="border px-3 py-1 text-lg">-</button>
                                <span className="px-2">Quantity</span>
                                <button className="border px-3 py-1 text-lg">+</button>
                            </td>
                            <td className="px-4 py-2 text-center">Delete button</td>
                        </tr>
                     
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-start justify-start w-1/4 px-4 space-y-2">
                <div>Quantity</div>
                <div>Price</div>
                <div>Total Price</div>
                <div>Quantity</div>
            </div>
        </div>
    );
};

export default CartItem;