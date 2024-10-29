import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"; // Import necessary Swiper modules
import "swiper/css"; // Main Swiper styles
import "swiper/css/navigation"; // Navigation module styles
import "swiper/css/pagination"; // Pagination module styles
import "swiper/css/effect-fade"; // Fade effect styles
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const Carousel = ({ slids }) => {
    const mainSwiperRef = useRef(null); // Reference for the main swiper
    const thumbsSwiperRef = useRef(null); // Reference for the thumbnail swiper

    return (
        <div className="flex flex-row pb-10 w-full mt-4 px-8 ">
            {/* Carousel Section */}
            <div className="w-3/4 ml-2 mr-2">
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]} // Include necessary modules
                        navigation={false} // Disable built-in navigation if using custom buttons
                        pagination={{
                            clickable: true, // Make pagination dots clickable
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={1}
                        effect="fade" // Set fade effect
                        className="h-full"
                        onSwiper={(swiper) => (mainSwiperRef.current = swiper)} // Reference to main swiper
                    >
                        {slids.map((s, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={s}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full"
                                    style={{ height: `25em`, objectFit: "cover" }} // Use objectFit for better image handling
                                />
                            </SwiperSlide>
                        ))}

                        {/* Custom Navigation Arrows */}
                        <div className="absolute top-0 h-full w-full flex justify-between items-center px-4">
                            <button
                                className="swiper-button-prev text-white bg-black bg-opacity-50 rounded-full p-2"
                                onClick={() => mainSwiperRef.current.slidePrev()} // Use ref to access swiper instance
                            >
                                <FaArrowCircleLeft size={40} />
                            </button>
                            <button
                                className="swiper-button-next text-white bg-black bg-opacity-50 rounded-full p-2"
                                onClick={() => mainSwiperRef.current.slideNext()} // Use ref to access swiper instance
                            >
                                <FaArrowCircleRight size={40} />
                            </button>
                        </div>
                    </Swiper>
                </div>

                {/* Thumbnail Section below Carousel section*/}
                {/*<div className="mt-4  h-2rem mx-8 px-8">*/}
                {/*    <Swiper*/}
                {/*        modules={[Navigation]} // Only navigation module for thumbnail swiper*/}
                {/*        spaceBetween={10}*/}
                {/*        slidesPerView={3} // Show 3 thumbnails at once*/}
                {/*        onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Reference to thumbnail swiper*/}
                {/*        className="cursor-pointer"*/}
                {/*    >*/}
                {/*        {slids.map((s, index) => (*/}
                {/*            <SwiperSlide key={index}>*/}
                {/*                <img*/}
                {/*                    src={s}*/}
                {/*                    alt={`Thumbnail ${index + 1}`}*/}
                {/*                    className="w-full h-auto object-cover cursor-pointer"*/}
                {/*                    onClick={() => mainSwiperRef.current.slideTo(index)} // Navigate to the corresponding slide*/}
                {/*                />*/}
                {/*            </SwiperSlide>*/}
                {/*        ))}*/}
                {/*    </Swiper>*/}
                {/*</div>*/}
            </div>

            {/* Optional Side Section for other purpose  */}
            <div className="w-1/4 shadow p-4">
                {/* Add content for the right side here */}
                <h2 className="text-lg font-bold">Optional Side Content</h2>
                <p>Your additional content goes here.</p>
            </div>
        </div>
    );
};

export default Carousel;