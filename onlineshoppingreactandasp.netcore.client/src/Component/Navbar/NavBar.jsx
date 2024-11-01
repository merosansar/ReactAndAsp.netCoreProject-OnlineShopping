import React, { useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NavBar() {

    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const handleSearch = async () => {
        try {
            const response = await axios.get(`api/category/searchproduct`, {
                params: { searchText: searchText },
            });
            const data = response.data;
            navigate('/',{ state: { products: data } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <header>
            <nav className="bg-sky-600 py-2 m-0 flex flex-row justify-end">
                <div className="container  flex justify-between items-center flex-row">
                    <div className="flex  items-center text-2xl font-bold flex-row ">
                        <a href="/" className="text-white  mx-2">E-Shop</a>
                        <div className="flex  items-center border border-white-300 rounded-lg overflow-hidden flex-row mx-4">
                            {/*  <!-- Search Icon -->*/}
                            <input
                                type="text" placeholder="Search in E-Shop"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full px-6 py-1 focus:outline-none text-base  text-black-400"
                            />
                            <span className="pl-3 cursor-pointer" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            {/*  <!-- Search Input -->*/}
                        </div>

                        {/* Cart Icon with Item Count */}
                        <a href="/Cartitemlist" className="pl-4 cursor-pointer relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm12 0c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm-3-7H8.6l-1.6-7H5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 6h2.4a2.4 2.4 0 002.4-2.4 2.4 2.4 0 00-2.4-2.4H7.6a2.4 2.4 0 00-2.4 2.4A2.4 2.4 0 007.6 6H10" />
                            </svg>
                            {/* Badge for cart item count */}
                           
                                <span className="absolute bottom-4 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    1
                                </span>
                           
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-4  ">
                        <a href="/login" className="text-white hover:bg-sky-900 px-3 py-2 rounded-md text-sm font-medium"> Login </a> <a className="text-white hover:bg-sky-900 px-3 py-2 rounded-md text-sm font-medium"> |</a>
                        <a href="/signup" className="text-white hover:bg-sky-900 px-3 py-2 rounded-md text-sm font-medium"> SignUp </a>
                    </div>
                    <div class="md:hidden flex items-center">
                        <button click="open = !open" className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/*  <!-- Mobile Menu -->*/}
                <div x-data="{ open: false }" x-show="open" className="md:hidden">
                    <div className="flex flex-col mt-2 space-y-2">
                        <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Login</a>
                        <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">SignUp</a>
                    </div>
                </div>
                <div className="flex  justify-end ml-10  pr-10">
                    <ToggleButton />
                </div>
            </nav>
        </header>
    );
}
export default NavBar;
