import React from 'react';
import { GiTeamIdea } from 'react-icons/gi';

const ShortOverView = () => {
    return (
        <section className="p-6 py-6  lg:px-24 bg-gradient-to-l from-blue-900 via-slate-900 to-black pt-12 text-gray-200">
            <div data-aos="fade-down" data-aos-duration="2000" className="mb-5 mt-32">
                <h2 className=" mb-6 text-3xl md:text-5xl text-green-400 font-bold">Short Overview</h2>
                <p className="text-gray-200 px-10 md:px-20 text-base font-semibold">When starting a business, one key task is to create a business plan that outlines your goals and how you aim to achieve them. Your business overview is a necessary section that presents these ideas more broadly and provides your audience with background information about your company.</p>
            </div>
            <div className="container grid grid-cols-1 gap-6 mt-20 mx-auto md:grid-cols-2 xl:grid-cols-3">
                <div data-aos="fade-right" data-aos-duration="2000" className="flex py-8 px-8 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                        <GiTeamIdea className="w-10 h-10"></GiTeamIdea>
                    </div>
                    <div className="flex justify-start flex-col  align-middle">
                        <p className="text-3xl font-semibold leading-none">15000+</p>
                        <p className="capitalize text-2xl">Students</p>
                    </div>
                </div>
                <div data-aos="fade-right" data-aos-duration="2000" className="flex py-8 px-8 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 text-gray-800">
                            <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                            <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                            <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                            <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                        </svg>
                    </div>
                    <div className="flex flex-col justify-start align-middle">
                        <p className="text-3xl font-semibold leading-none text-start">50+</p>
                        <p className="capitalize text-2xl">Teachers</p>
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="2000" className="flex py-8 px-8 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 text-gray-800">
                            <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                            <rect width="32" height="32" x="80" y="264"></rect>
                            <rect width="32" height="32" x="240" y="128"></rect>
                            <rect width="32" height="32" x="136" y="168"></rect>
                            <rect width="32" height="32" x="400" y="264"></rect>
                            <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">28+</p>
                        <p className="capitalize text-2xl">Staffs</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ShortOverView;