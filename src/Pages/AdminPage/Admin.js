import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { AuthContext } from '../../context/UserContext';

const Admin = () => {
    const [isStudentOpen, setIsStudentOpen] = useState(false);
    const [isTeacherOpen, setIsTeacherOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen)

    const toggleStudentMenu = () => {
        setIsTeacherOpen(false)
        setIsStudentOpen(!isStudentOpen);
    }
    const toggleTeacherMenu = () => {
        setIsStudentOpen(false)
        setIsTeacherOpen(!isTeacherOpen);
    }
    const { schoolName } = useContext(AuthContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                    <Outlet></Outlet>


                </div>
                <div className="drawer-side text-gray-200 font-bold text-xl bg-gradient-to-l from-blue-900 via-slate-900 to-black">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu py-4 w-70 text-base">

                        {
                            // isAdmin && 
                            <>

                                <li><Link to={`/${schoolName}/admin/idCard`}>ID Card Generate</Link></li>
                                <li><Link to={`/${schoolName}/admin/addNotice`}>Add Notice</Link></li>
                                <li><Link to={`/${schoolName}/admin/siteManagement`}>Site Management</Link></li>
                                <li><Link to={`/${schoolName}/admin/addEvents`}>Add Events</Link></li>
                                <li><Link to={`/${schoolName}/admin/calender`}>Academic Calender</Link></li>


                            </>
                        }
                        <>


                            <li>
                                <div>
                                    <button className="relative flex  items-center justify-between" onClick={toggleStudentMenu}>
                                        <>Student Management</>
                                        <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown>
                                    </button>
                                    {isStudentOpen && (
                                        <div className=" z-20 absolute left-0 top-10 mt-2 w-60 text-start text-base text-white shadow-lg bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                <Link
                                                    to={`/${schoolName}/admin/student`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    All Students
                                                </Link>


                                                <Link
                                                    to={`/${schoolName}/admin/class`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Add Class
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/addStudent`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Add Student
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/paymentSystem`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >Payment System
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/term&subjects`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Add Term & Subjects
                                                </Link>

                                                <Link
                                                    to={`/${schoolName}/admin/classRoutine`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Generate Class Routine
                                                </Link>

                                                <Link
                                                    to={`/${schoolName}/admin/admission`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Add Admission Info
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/admissionProcess`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleStudentMenu}
                                                >
                                                    Admission
                                                </Link>


                                                <div className="pl-4 pt-1 relative hover:bg-gray-100  hover:text-gray-900">
                                                    <button className="relative flex  items-center justify-between" onClick={toggleMenu}>
                                                        <>Certificate Generate</>
                                                        <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown>
                                                    </button>
                                                    {isOpen && (
                                                        <div className=" z-20 absolute left-0 top-10 mt-2 w-45 text-base text-start text-white shadow-lg bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                                                            <div
                                                                className="py-1"
                                                                role="menu"
                                                                aria-orientation="vertical"
                                                                aria-labelledby="options-menu"
                                                            >
                                                                <Link
                                                                    to={`/${schoolName}/admin/transfer`}
                                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={toggleMenu}
                                                                >
                                                                    Transfer Certificate
                                                                </Link>
                                                                <Link
                                                                    to={`/${schoolName}/admin/character`}
                                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={toggleMenu}
                                                                >
                                                                    Character Certificate
                                                                </Link>
                                                                <Link
                                                                    to={`/${schoolName}/admin/completion`}
                                                                    className="block mb-5 px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                                    role="menuitem"
                                                                    onClick={toggleMenu}
                                                                >
                                                                    Course Completion Certificate
                                                                </Link>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </li>

                            <li>
                                <div>
                                    <button className="relative flex  items-center justify-between" onClick={toggleTeacherMenu}>
                                        <>Staff Management</>
                                        <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown>
                                    </button>
                                    {isTeacherOpen && (
                                        <div className=" z-20 absolute left-0 top-10 mt-2 w-60 text-start text-base text-white shadow-lg bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                <Link
                                                    to={`/${schoolName}/admin/staff`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleTeacherMenu}
                                                >
                                                    All Staffs
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/salary`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleTeacherMenu}
                                                >
                                                    Add Salary
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/addStaff`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleTeacherMenu}
                                                >
                                                    Add Staff
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/atnTime`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleTeacherMenu}
                                                >
                                                    Set Attendance Time
                                                </Link>
                                                <Link
                                                    to={`/${schoolName}/admin/Teacher_attendance`}
                                                    className="block px-4 py-2 text-base text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                    onClick={toggleTeacherMenu}
                                                >
                                                    Staff Attendance Sheet
                                                </Link>





                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Admin;