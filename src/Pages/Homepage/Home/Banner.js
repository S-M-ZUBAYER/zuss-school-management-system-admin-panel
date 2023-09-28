import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Banner = ({ currentShool }) => {


    const backgroundImage = currentShool?.schoolBackgroundImg || '';


    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };


    const { schoolName } = useContext(AuthContext);

    return (
        <div>
            <section className="relative" style={containerStyle}>
                {/* // className="relative bg-[url(https://i.ytimg.com/vi/wYaXaWjROOk/maxresdefault.jpg)] bg-cover bg-center bg-no-repeat" */}
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold text-lime-700 sm:text-5xl">
                            Welcome To

                            <strong className="block font-extrabold text-yellow-500">
                                {currentShool?.name}
                            </strong>
                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl text-cyan-800 sm:leading-relaxed">
                            Welcome to your another home to spend time with study and different activities...
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <Link
                                to={`/${schoolName}/login`}
                                className="block w-full rounded-tl-xl rounded-br-xl bg-gradient-to-t from-black via-purple-900 to-violet-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Log In
                            </Link>

                            <Link
                                to={`/${schoolName}/register`}
                                className="block w-full rounded-tl-xl rounded-br-xl bg-white px-12 py-3 text-sm font-medium bg-gradient-to-t from-red-200  to-orange-400 text-black shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;