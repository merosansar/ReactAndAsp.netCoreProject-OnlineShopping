import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';



const CreateProductDetails = () => {
    const location = useLocation();
    const [productid, setProductId] = useState(location.state?.productId || ''); // Retrieve productId from location state
    const [listbrand, setListBrand] = useState([]);
    const [listcolor, setListColor] = useState([]);
    const [id] = useState('0');
   /* const [productid] = useState('0');*/
    const [specification, setSpecification] = useState('');
    const [brandid, setBrandId] = useState('');
    const [colorid, setColorId] = useState('');
    const [productmodel, setProductModel] = useState('');
    const [warranty, setWarranty] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [weight, setWeight] = useState('');
    /*const [promotion, setPromotion] = useState('');*/
    const [description, setDescription] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [material, setMaterial] = useState('');
    const navigate = useNavigate();

    // Fetch Brand list on component mount
    useEffect(() => {
        const GetBrandList = async () => {
            try {
                const response = await axios.get('/api/dropdown/getdropdownlist', {
                    params: {
                        param1: 'BrandData',
                        param2: '',
                        param3: 'Brand'
                    }
                });
                setListBrand(response.data);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };
        GetBrandList();
    }, []);

    // Fetch color list on component mount
    useEffect(() => {
        const GetColorList = async () => {
            try {
                const response = await axios.get('/api/dropdown/getdropdownlist', {
                    params: {
                        param1: 'ColorData',
                        param2: '',
                        param3: 'Color'
                    }
                });
                setListColor(response.data);
            } catch (error) {
                console.error('Error fetching color data:', error);
            }
        };
        GetColorList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: 0, // or whatever the value is
                productId: productid,
                description: description,
                specifications: specification,
                brandId: brandid,
                productModel: productmodel,
                warranty: warranty,
                material: material,
                colorId: colorid,
                dimensions: dimensions,
                length: length,
                width: width,
                height: height,
                weight: parseFloat(weight) // Make sure weight is a number
              
            };

            const response = await axios.post('/api/productdetails/create',data );
            console.log('Product created successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="flex shadow border-4">
            <div className="mt-2 mb-2">
                <img src="/Category.jpg" className="w-100" alt="Category" />
            </div>

            <form onSubmit={handleSubmit} className="w-full p-3">
                <div className="bg-purple-500 font-bold text-center text-white p-3">Add Product Details</div>

                {/* Specification input */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Specification:</label>
                    <input
                        type="text"
                        value={specification}
                        onChange={(e) => setSpecification(e.target.value)}
                        required
                        placeholder="Specification"
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Brand dropdown */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Brand :</label>
                    <select
                        value={brandid}
                        onChange={(e) => setBrandId(e.target.value)}
                        required
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    >
                        {listbrand.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Model */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Product Model:</label>
                    <input
                        type="text"
                        value={productmodel}
                        onChange={(e) => setProductModel(e.target.value)}
                        required
                        placeholder="Product Model"
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Warranty */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Warranty:</label>
                    <input
                        type="text"
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                        required
                        placeholder="Warranty"
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Color dropdown */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Color:</label>
                    <select
                        value={colorid}
                        onChange={(e) => setColorId(e.target.value)}
                        required
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    >
                        {listcolor.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dimensions */}
                <div className="mt-3 ">
                    <label className="block text-gray-700 font-bold mb-1">Dimensions:</label>
                    <div className="mt-3  flex flex-row  gap-x-2">
                        <input
                            type="text"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            required
                            placeholder="Width"
                            className="block w-1/3 px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="text"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                            placeholder="Height"
                            className="block w-1/3 px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="text"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            required
                            placeholder="Length"
                            className="block w-1/3 px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                        />
                    </div>
                </div>

                {/* Weight */}
                <div className="mt-3">
                    <label className="block text-gray-700 font-bold mb-1">Weight:</label>
                    <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        placeholder="Weight"
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Promotion */}
                {/*<div className="mt-3">*/}
                {/*    <label className="block text-gray-700 font-bold mb-1">Promotion:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={promotion}*/}
                {/*        onChange={(e) => setPromotion(e.target.value)}*/}
                {/*        required*/}
                {/*        placeholder="Promotion"*/}
                {/*        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"*/}
                {/*    />*/}
                {/*</div>*/}

                <button type="submit" className="text-white mt-5 mb-3 mx-20 w-1/2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateProductDetails;