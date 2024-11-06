import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(location.state?.CartItemList || []);
    const [selectAll, setSelectAll] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Function to calculate total quantity and price based on selected items
    const calculateTotals = () => {
        const selectedItems = cartItems.filter(item => item.IsSelected);
        const totalQty = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        setTotalQuantity(totalQty);
        setTotalPrice(totalPrice);
    };

    // Call calculateTotals whenever cartItems changes
    useEffect(() => {
        calculateTotals();
    }, [cartItems]);

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setCartItems(cartItems.map(item => ({ ...item, IsSelected: isChecked })));
    };

    const handleItemCheckboxChange = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].IsSelected = !updatedCartItems[index].IsSelected;
        setCartItems(updatedCartItems);

        // Update the "Select All" state based on individual checkboxes
        const allSelected = updatedCartItems.every(item => item.IsSelected);
        setSelectAll(allSelected);
    };

    const handleIncrement = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
    };

    const handleDecrement = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) { // Ensure quantity doesn't go below 1
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
        }
    };


    const handleDelete = async (index, cartId) => {
        // Filter out the item at the specified index
        try {
            const id = parseInt(cartId, 10);
            const data = {
                id:id
                
            };

            const response = await axios.post('/api/cart/delete',data);
            var result = response.data;
            const updatedCartItems = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedCartItems);
         
        }
        catch (error)
        {
            if (error.response.status == 400) {
               /* navigate('/login');*/
            }

        }

      
    };


    // Function to handle checkout button click
    const handleCheckout = async () => {
        const selectedItems = cartItems.filter(item => item.IsSelected);
        if (selectedItems.length > 0) {
            try {
                navigate('/ShippingAddress', { state: { selectedItems: selectedItems } });
                
                //const response = await axios.post('/api/order/checkout', selectedItems);
                //if (response.status === 200) {
                //    // Handle successful checkout, such as navigating to a confirmation page
                //    console.log('Checkout successful:', response.data);
                //    navigate('/confirmation', { state: { checkoutData: response.data } });
                //}
            } catch (error) {
                console.error('Error during checkout:', error);
            }
        } else {
            alert('No items selected for checkout');
        }
    };


    return (
        <div className="flex items-start flex-row shadow mt-5 p-4 w-full">
            <div className="w-3/4">  {/*left side table */}
                <table className="table-fixed w-full border border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left px-4 py-2 font-semibold">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                /> Select All
                            </th>
                            <th className="text-left px-8 py-2 font-semibold">Image</th>
                            <th className="text-left px-4 py-2 font-semibold">Product</th>
                            <th className="text-left px-4 py-2 font-semibold">Price</th>
                            <th className="text-center px-4 py-2 font-semibold">Quantity</th>
                            <th className="text-center px-4 py-2 font-semibold">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={item.cartItemId} className="border-b">
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            checked={item.IsSelected}
                                            onChange={() => handleItemCheckboxChange(index)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <img src={item.imageUrl} className="w-16 h-16 object-cover cursor-pointer rounded-full border border-green-500 hover:border-blue-500" alt="Product" />
                                    </td>
                                    <td className="px-4 py-2">{item.productName}</td>
                                    <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 flex items-center">
                                        <button onClick={() => handleDecrement(index)} className="border px-3 py-1 text-lg">-</button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button onClick={() => handleIncrement(index)} className="border px-3 py-1 text-lg">+</button>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button onClick={() => handleDelete(index, item.id)} className="text-red-600 hover:underline">Delete</button>

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
            <div className="flex flex-col items-start justify-start w-1/4 px-4 space-y-2 shadow h-full leading-8"> {/*right side div */}
                <div className="flex flex-row justify-between w-full">
                    <div>Quantity:</div><div>{totalQuantity}</div>
                </div>
                {/*<div className="flex flex-row justify-between w-full">*/}
                {/*   */}{/* <div>Price:</div> <div>${totalPrice.toFixed(2)}</div>*/}
                {/*</div>*/}
                <div className="flex flex-row justify-between w-full">
                    <div>Total Price:</div>  <div>${totalPrice.toFixed(2)}</div>
                </div>
                <div className="mt-10 pt-10 mb-20 pb-40 ">
                    <button onClick={handleCheckout}  className="text-white w-full h-1/4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-2 py-1 text-center">
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;