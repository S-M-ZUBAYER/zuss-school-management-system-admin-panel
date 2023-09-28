import React from 'react';
import img from "../../../Assets/Images/School_img.jpg"

const About = ({ currentShool }) => {
    return (
        <div className="bg-gradient-to-l from-blue-900 via-slate-900 to-black text-slate-100 lg:px-24">
            <h1 className=" md:pt-20 text-3xl md:text-5xl font-bold text-yellow-300">About Us</h1>
            <div className="md:grid md:grid-cols-2 md:gap-8 mt-20">
                <div className="px-10 md:px-0 mb-10 sm:mb-0 flex items-center">
                    <img className="w-fulls md:w-5/6 rounded-2xl shadow-lg" src={currentShool?.schoolBannerImg} alt="" />
                </div>
                <div className="flex items-center">
                    <p className="px-10 md:px-0 text-white">{currentShool?.aboutSchool}</p>
                </div>
            </div>

        </div>
    );
};

export default About;