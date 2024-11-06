import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToggleButton() {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    // Logout function to call the API endpoint
    //const logout = () => {
    //    axios.post('/api/user/logout')
    //        .then((response) => {
    //            if (response.status === 200) {
    //                // Redirect the user to the login page or home page after logout

    //                toast.success('Logout Success', {
    //                    position: 'top-right',
    //                    autoClose: 2000,
    //                    className: "bg-green-900 text-white font-semibold",
    //                    transition: Zoom,
    //                    onClose: () => {


    //                        navigate('/');
    //                    }
    //                });

                    
    //            }
    //        })
    //        .catch((error) => {

    //            toast.success('Error in  logging out:', {
    //                position: 'top-right',
    //                autoClose: 2000,
    //                className: "bg-green-900 text-white font-semibold",
    //                transition: Zoom,
    //                onClose: () => {


                        
    //                }
    //            });

               
    //        });
    //};

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
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded" > <a href="#" >Sign Out</a></div>
                   {/* <div className="cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={logout}> <a href="#" onClick={(e) => e.preventDefault()}>Sign Out</a></div>*/}
                 {/*   <ToastContainer />*/}
                </div>
            )}
          
        </div>
    );
}
export default ToggleButton;