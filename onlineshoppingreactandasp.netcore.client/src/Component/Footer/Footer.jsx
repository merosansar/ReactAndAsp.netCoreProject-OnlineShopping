
import React from 'react';


const Footer = () => {
    return (
        <footer className=" bottom-0 mb-0 pb-0  mx-0 w-full flex flex-col justify-center py-2  text-white  text-center mt-0 pt-0  ">

            <div>
            {/*    <div className="bg-gray-100 px-3 py-7 ">*/}
              
            {/*    <button  type="button" class="w-[30%] text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Load More</button>*/}
              
            {/*</div>*/}
                <div className="bg-sky-600  mb-0 pb-0 py-5  ">
                    <p className="text-sm pb-5">&copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.</p>
                </div></div>
           
        </footer>
    );
};

export default Footer;