import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { AuthContext } from '../../context/UserContext';

const Introduction = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { schoolName } = useContext(AuthContext);

    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                    {/* <div className="text-white pt-12 pb-5">
                        <img data-aos="fade-down" data-aos-duration="2000" className="h-40 w-40 rounded-full border-8 border-x-fuchsia-500 border-yellow-300 mx-auto"
                        src={user?.photoURL} alt="" 
                        />
                        <div data-aos="fade-up" data-aos-duration="2000">
                            <h1 className="text-2xl font-bold" >
                                Hi <span className="text-lime-400">{user?.displayName}</span>
                                Hi
                            </h1>
                            <p className="text-xl text-green-300">
                                Welcome to your dashboard
                            </p>
                        </div>

                    </div> */}
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side text-gray-200 font-bold text-xl bg-gradient-to-l from-blue-900 via-slate-900 to-black">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu py-4 w-70 text-base ">


                        <li><Link to={`/${schoolName}/intro/schoolIntro`}>Our School</Link></li>
                        <li><Link to={`/${schoolName}/intro/notice`}>Notice</Link></li>
                        <li><Link to={`/${schoolName}/intro/allStaffIntro`}>School Team</Link></li>
                        <li><Link to={`/${schoolName}/intro/activities`}>School Events</Link></li>
                        <li><Link to={`/${schoolName}/intro/calender`}>Academic Calender</Link></li>
                        <li><Link to={`/${schoolName}/intro/admissionProcess`}>Admission</Link></li>
                        <li><Link to={`/${schoolName}/intro/ClassRoutine`}>Class Routine</Link></li>



                        {/* <Link className="text-left" to={`/${schoolName}`}>
                            <button className='px-4 py-2 mt-8 ml-0 font-semibold text-black lg:text-lg rounded bg-green-300'>
                                Back to homepage
                            </button>
                        </Link> */}
                    </ul>

                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Introduction;