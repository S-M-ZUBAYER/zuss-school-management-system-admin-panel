// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// const AutoImageSlider = () => {
//     const settings = {
//         dots: true, // Show navigation dots
//         infinite: true, // Enable infinite loop
//         speed: 1000, // Transition speed in milliseconds (1 second per slide)
//         autoplay: true, // Enable autoplay
//         autoplaySpeed: 3000, // Autoplay interval in milliseconds (3 seconds per slide)
//         slidesToShow: 1, // Number of slides to show at a time
//         slidesToScroll: 1, // Number of slides to scroll at a time
//     };
//     const images = [
//         'https://tse2.mm.bing.net/th?id=OIP.oo8b8EY8YZoB4ZUv6o6ESwHaE8&pid=Api&P=0&h=180',
//         'https://tse2.mm.bing.net/th?id=OIP.P8_dOOg-pnMN9lPiKJhlrgHaDt&pid=Api&P=0&h=180',
//         'https://tse3.mm.bing.net/th?id=OIP.z-na1-TqpuGJwCN3MTd0HAHaFA&pid=Api&P=0&h=180',
//         // Add more image URLs here
//     ];
//     return (
//         <Slider {...settings}>
//             {images.map((image, index) => (
//                 <div key={index}>
//                     <img src={image} alt={`Image ${index}`} />
//                 </div>
//             ))}
//         </Slider>
//     );
// };

// export default AutoImageSlider;

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AutoImageSlider = () => {
    return (
        <div className="bg-gradient-to-l rounded-lg pt-24 from-blue-900 via-slate-900 to-black text-slate-100 lg:px-24">

            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={3000} // Change slides every 1 second
                showArrows={false} // Hide arrow navigation
                showStatus={false} // Hide status indicator
                showThumbs={false} // Hide thumbnail navigation
            >

                <div className="w-10/12 mx-auto h-96 ">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.oo8b8EY8YZoB4ZUv6o6ESwHaE8&pid=Api&P=0&h=180" alt="Image 1" />
                </div>
                <div>
                    <img src="https://tse2.mm.bing.net/th?id=OIP.P8_dOOg-pnMN9lPiKJhlrgHaDt&pid=Api&P=0&h=180" alt="Image 2" />
                </div>
                <div>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.z-na1-TqpuGJwCN3MTd0HAHaFA&pid=Api&P=0&h=180" alt="Image 3" />
                </div>
                <div>
                    <img src="https://tse2.mm.bing.net/th?id=OIP.P8_dOOg-pnMN9lPiKJhlrgHaDt&pid=Api&P=0&h=180" alt="Image 4" />
                </div>
                <div>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.z-na1-TqpuGJwCN3MTd0HAHaFA&pid=Api&P=0&h=180" alt="Image 5" />
                </div>
                {/* Add more images as needed */}

            </Carousel>
        </div>
    );
};

export default AutoImageSlider;
