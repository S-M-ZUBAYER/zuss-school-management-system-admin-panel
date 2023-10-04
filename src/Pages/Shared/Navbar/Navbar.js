import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../../Assets/Images/Astha.jpg"
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdOutlineArrowDropDown } from 'react-icons/md';
// import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Navbar = () => {

    const { logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen)

    const { schoolName, user, currentSchoolCode, setSchoolName } = useContext(AuthContext);


    useEffect(() => {
        const fetchSchoolName = async () => {


            try {
                const response = await fetch(` https://zuss-school-management-system-server-site.vercel.app/api/schools/school/${currentSchoolCode}`);
                if (response.ok) {
                    const schoolData = await response.json();


                    setSchoolName(schoolData?.name);

                } else {
                    throw new Error('Failed to fetch staffs');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchSchoolName();
    }, [currentSchoolCode]);

    const handleToLogOut = () => {
        // Removing the item with key "username" from local storage
        localStorage.removeItem("schoolUser");
        logOut()
            .then(() => { })
            .catch(err => {
                console.log(err)
            })
        toast.success("LogOut Successfully")
    }

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };
    const [isStaffSubmenuOpen, setIsStaffSubmenuOpen] = useState(false);

    const toggleStaffSubmenu = () => {
        setIsStaffSubmenuOpen(!isStaffSubmenuOpen);
    }
    const [isGenerateCertificateSubmenuOpen, setIsGenerateCertificateSubmenuOpen] = useState(false);

    const toggleGenerateCertificateSubmenu = () => {
        setIsGenerateCertificateSubmenuOpen(!isGenerateCertificateSubmenuOpen);
    };

    const [isAdmissionSubmenuOpen, setIsAdmissionSubmenuOpen] = useState(false);

    const toggleAdmissionSubmenu = () => {
        setIsAdmissionSubmenuOpen(!isAdmissionSubmenuOpen);
    };
    const [isSiteManagementSubmenuOpen, setIsSiteManagementSubmenuOpen] = useState(false);

    const toggleSiteManagementSubmenu = () => {
        setIsSiteManagementSubmenuOpen(!isSiteManagementSubmenuOpen);
    };


    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100 text-slate-200 bg-gradient-to-t from-blue-900 via-slate-900 to-black">
            <div className=" flex justify-between h-16 md:pr-10">

                <div className="flex items-center">
                    <div className="lg:hidden ">
                        <div className="dropdown ">
                            <label tabIndex={0} className="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 bg-gradient-to-t from-blue-900 via-slate-900 to-black">

                                <li><Link to={`/${schoolName}/admin/idCard`}>ID Card Generate</Link></li>
                                <li><Link to={`/${schoolName}/admin/addNotice`}>Add Notice</Link></li>

                                <div className="collapsible-submenu">
                                    <button className="submenu-toggle text-sm py-1 ml-4 flex items-center" onClick={toggleSiteManagementSubmenu}>
                                        Site Management <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown><span className={isSiteManagementSubmenuOpen ? "arrow-up" : "arrow-down"}></span>
                                    </button>
                                    <ul className={isSiteManagementSubmenuOpen ? "submenu" : "submenu hidden"}>
                                        <li><Link to={`/${schoolName}/admin/siteManagement`}>Site Management</Link></li>
                                        <li><Link to={`/${schoolName}/admin/addEvents`}>Add Events</Link></li>
                                        <li><Link to={`/${schoolName}/admin/calender`}>Academic Calendar</Link></li>
                                    </ul>
                                </div>



                                <div className="collapsible-submenu text-left">
                                    <button className="submenu-toggle text-sm py-1 ml-4 flex items-center" onClick={toggleSubmenu}>
                                        Student Management <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown> <span className={isSubmenuOpen ? "arrow-up" : "arrow-down"}></span>
                                    </button>
                                    <ul className={isSubmenuOpen ? "submenu" : "submenu hidden"}>
                                        <li><Link to={`/${schoolName}/admin/student`}>All Students</Link></li>
                                        <li><Link to={`/${schoolName}/admin/class`}>Add Class</Link></li>
                                        <li><Link to={`/${schoolName}/admin/addStudent`}>Add Student</Link></li>
                                        <li><Link to={`/${schoolName}/admin/paymentSystem`}>Payment System</Link></li>
                                        <li><Link to={`/${schoolName}/admin/term&subjects`}>Add Term & Subjects</Link></li>
                                        <li><Link to={`/${schoolName}/admin/classRoutine`}>Generate Class Routine</Link></li>
                                    </ul>
                                </div>

                                <div className="collapsible-submenu">
                                    <button className="submenu-toggle text-sm py-1 ml-4 flex items-center" onClick={toggleAdmissionSubmenu}>
                                        Admission <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown><span className={isAdmissionSubmenuOpen ? "arrow-up" : "arrow-down"}></span>
                                    </button>
                                    <ul className={isAdmissionSubmenuOpen ? "submenu" : "submenu hidden"}>
                                        <li><Link to={`/${schoolName}/admin/admission`}>Add Admission Info</Link></li>
                                        <li><Link to={`/${schoolName}/admin/admissionProcess`}>Admission</Link></li>
                                    </ul>
                                </div>


                                <div className="collapsible-submenu">
                                    <button className="submenu-toggle text-sm py-1 ml-4 flex items-center" onClick={toggleGenerateCertificateSubmenu}>
                                        Generate Certificate <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown><span className={isGenerateCertificateSubmenuOpen ? "arrow-up" : "arrow-down"}></span>
                                    </button>
                                    <ul className={isGenerateCertificateSubmenuOpen ? "submenu" : "submenu hidden"}>
                                        <li><Link to={`/${schoolName}/admin/transfer`}>Transfer Certificate</Link></li>
                                        <li><Link to={`/${schoolName}/admin/character`}>Character Certificate</Link></li>
                                        <li><Link to={`/${schoolName}/admin/completion`}>Completion Certificate</Link></li>
                                    </ul>
                                </div>



                                <div className="collapsible-submenu">
                                    <button className="submenu-toggle text-sm py-1 ml-4 flex items-center" onClick={toggleStaffSubmenu}>
                                        Staff Management <MdOutlineArrowDropDown className="font-bold text-3xl"></MdOutlineArrowDropDown><span className={isStaffSubmenuOpen ? "arrow-up" : "arrow-down"}></span>
                                    </button>
                                    <ul className={isStaffSubmenuOpen ? "submenu" : "submenu hidden"}>
                                        <li><Link to={`/${schoolName}/admin/staff`}>All Staffs</Link></li>
                                        <li><Link to={`/${schoolName}/admin/salary`}>Add Salary</Link></li>
                                        <li><Link to={`/${schoolName}/admin/addStaff`}>Add Staff</Link></li>
                                        <li><Link to={`/${schoolName}/admin/atnTime`}>Set Attendance Time</Link></li>
                                        <li><Link to={`/${schoolName}/admin/Teacher_attendance`}>Staff Attendance Sheet</Link></li>
                                    </ul>
                                </div>

                            </ul>
                        </div>

                    </div>
                    <Link rel="noopener noreferrer" to={`/${schoolName}/admin`} aria-label="Back to homepage" className="flex items-center p-2">
                        <img className="h-10 w-10 rounded-full" src={img} alt="school logo" />
                    </Link>

                    <p className="flex justify-start">
                        <Link to={`/${schoolName}/admin`} className="flex items-center justify-start font-semibold px-4 -mb-1  dark:border-transparent">Admin Dashboard</Link>
                    </p>
                </div>


                <div className="items-center flex-shrink-0 flex ">
                    <Link to={`/${schoolName}/adminRegister`} className="hidden md:block mr-8">Create Admin Account</Link>
                    <Link to={`/${schoolName}/teacherRegister`} className="hidden md:block mr-8">Create Teacher Account</Link>
                    {
                        user?.email ?
                            <Link to={`/${schoolName}/login`} onClick={handleToLogOut}>Log Out</Link> :
                            <Link to={`/${schoolName}/login`}><button className="self-center px-8 py-3 rounded">Sign in</button></Link>
                    }


                </div>


            </div>
        </header>
    );
};

export default Navbar;