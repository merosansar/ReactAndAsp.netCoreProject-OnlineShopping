


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';*/
import NavBar from './Component/Navbar/NavBar'; // Adjust the path if necessary
import Footer from './Component/Footer/Footer'; // Adjust the path if necessary
import UpperFooter from './Component/UpperFooter/UpperFooter'; // Adjust the path if necessary

/*import HomePage from './Component/Pages/HomePage'; // Example page component*/
import Login from './Component/Login/Login'; // Example page component*/
import Register from './Component/Register/Register'; // Example page component
import UserList from './Component/UserList/UserList'; // Example page component
import EditUser from './Component/UserList/EditUser';
import DetailUser from './Component/UserList/DetailUser';
import Carousel from './Component/Carousel/Carousel';
import Product from './Component/Product/Product';
import Category from './Component/Category/Category';
import CategoryList from './Component/Category/CategoryList';
import CreateProduct from './Component/Product/CreateProduct';
import AddCart from './Component/Product/AddCart';
import CreateProductDetails from './Component/ProductDetails/CreateProductDetails';
import CartItem from './Component/Cart/CartItem';
import ShippingAddress from './Component/ShippingAddress/ShippingAddress';

import PaymentMethods from './Component/Payment/PaymentMethods';




const slids = [
    "/Hill.jpg", 
    "/shop.jpg",
    "/bags.jpg",
   
  
];
const HomePage = () => {
    return (
        <div>
            <Carousel slids={slids} /> {/* Carousel component */}
            <CategoryList /> {/* Product component */}
        </div>
    );
}


const App = () => {
   

    return (
        <Router>
            <div>
                <NavBar /> {/* Navbar will always be displayed */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ShippingAddress" element={<ShippingAddress />} />
                    <Route path="/PaymentMethods" element={<PaymentMethods />} />
                     <Route path="/Cartitemlist" element={<CartItem  />} />

                    
                    <Route path="/ProductDetails" element={<CreateProductDetails />} />
                    <Route path="/createproduct" element={<CreateProduct />} />
                    <Route path="/addcart" element={<AddCart />} />
                  {/*  <Route path="/" element={<UserList />} />*/}
                    <Route path="/signup" element={<Register />} /> {/* Correct path for register */}
                    <Route path="/login" element={<Login />} /> {/* Correct path for login */}
                    <Route path="/EditUser/:id" element={<EditUser />} />
                    <Route path="/DetailUser/:id" element={<DetailUser />} />
                    <Route path="/category" element={<Category />} />
                   
                </Routes>
                <Footer /> {/* Footer will always be displayed */}
            </div>
        </Router>
    );
}
export default App;