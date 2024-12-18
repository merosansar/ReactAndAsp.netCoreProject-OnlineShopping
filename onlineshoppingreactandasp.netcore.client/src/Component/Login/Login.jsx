import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../AuthContext";
import Cookies from 'js-cookie';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const { login } = useAuth(); // Import the login function from context
    const { isLoggedIn } = useAuth();

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the API to authenticate the user
        let jwtToken = '';
        const userData = {
            email,
            passwordHash: password,
           jwtToken: jwtToken
        };
        try {
            const response = await fetch('/api/user/login', { // Ensure leading slash if proxied
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(userData),
            });

            if (!response.ok) {
                toast.error('Login failed. Please check your credentials.', {
                    position: 'top-right',
                    autoClose: 2000,
                    className: "bg-green-900 text-white font-semibold",
                    transition: Zoom,
                    onClose: () => {

                    }
                });
            }

            const data = await response.json();
            console.log('Response data:', data);
            // Assuming the JWT is part of the response data
            if (data.message=="SUCCESS") {
                // Read JWT token from the cookie if set by the server
                const jwtToken = Cookies.get('jwtToken');              

                if (jwtToken) {
                    login(); 
                    toast.success('Login successful!', {
                        position: 'top-right',
                        autoClose: 2000,
                        className: "bg-green-900 text-white font-semibold",
                        transition: Zoom,
                        onClose: () => {
                            // Navigate after the toast closes
                            login(); // Update your global auth state
                            navigate('/');
                        }
                    });
                }
                else {

                    toast.error('Login failed. Please check your credentials.', {
                        position: 'top-right',
                        autoClose: 2000,
                        className: "bg-green-900 text-white font-semibold",
                        transition: Zoom,
                        onClose: () => {
                           
                        }
                    });
                   
                }
            }
            /*  navigate('./Component/Login/Login');*/
        } catch (error) {
            toast.error('Login failed. Please check your credentials.', {
                position: 'top-right',
                autoClose: 2000,
                className: "bg-green-900 text-white font-semibold",
                transition: Zoom,
                onClose: () => {

                }
            });
        }
    };

    return (

        <div  className="flex  p-20 pt-0 pb-0">
            <div className="shadow ">
                <img src="/Login.jpg" />
            </div>
            <div className="flex-1  wrap" >
                <form onSubmit={handleSubmit}>
              
                <div className="p-4 border-5 shadow " >
                        <div className="bg-purple-600 text-center p-4  text-white font-bold"> Login</div>
                    <div className="flex-1 flex-row space-around mt-2">

                        <div>    <label className="mt-1 mr-2" >Email:</label>  </div>
                      
                        <div>  <input
                            type="email"
                            id="floatingInputemail"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        />
                            </div> 
                    </div>

                    <div className="flex-1 flex-row space-around mt-2">
                        <div>   <label> Password:</label></div>
                        <div>    <input
                            id="floatingPassword"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        />
                        </div>
                    </div>
                    <div className="flex-1 flex-row space-around mt-1">
                            <div>
                                <button type="submit" class="text-white w-full  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2">Login </button>


                        </div>

                    </div>


                    <div className="flex-1 flex-row space-around mt-2">
                        <div>
                        
                            <button
                                className="flex items-center justify-center w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                            >
                                <FcGoogle className="mr-2" size={24} />
                                Login with Google
                            </button>
                        </div>
                       
                    </div>
                   
                        <div className="flex-1 flex-row space-around   mt-2">
                            <div>

                                <label className="text-black">New User?</label>
                                <Link
                                    to="/signup"
                                    className="ml-2 text-blue-600 hover:underline"
                                >
                                    Register
                                </Link>
                            </div>

                        </div>

                    </div>
                </form>

                <ToastContainer />
            </div>
        </div>


       
    );
};

export default Login;