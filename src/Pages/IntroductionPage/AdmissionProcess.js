import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import BtnSpinner from '../Shared/Spinners/BtnSpinner';
import { AiOutlineDownload } from 'react-icons/ai';
import DisplaySpinner from '../Shared/Spinners/DisplaySpinner';

const AdmissionProcess = () => {
    const [applications, setApplications] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [searchClasses, setSearchClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [applicationName, setApplicationName] = useState('');
    const [classSearchQuery, setClassSearchQuery] = useState('');
    const [nameSearchQuery, setNameSearchQuery] = useState('');
    const [date, setDate] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const { currentSchoolCode } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/application/${currentSchoolCode}`, {
                    params: { date }
                });
                setApplications(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching applications:', error);
            }
        };

        const fetchClassInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
                const classInfoData = response.data?.classInfo;
                if (classInfoData) {
                    const classNames = classInfoData?.map((element) => element?.name);
                    setAllClasses(classNames);
                    setSearchClasses(classNames);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching classInfo:', error);
            }
        };

        fetchApplications();
        fetchClassInfo();
    }, [currentSchoolCode, date]);

    const handleClassSearch = (event) => {
        const selectedClassName = event.target.value;
        setClassName(selectedClassName);
        setSearchClasses(allClasses.filter(cls => cls === selectedClassName))
        setClassSearchQuery(selectedClassName);
    };

    const handleNameSearch = (event) => {
        const searchName = event.target.value;
        setNameSearchQuery(searchName);
        setApplicationName(searchName);
    };

    function getAllYears(startYear) {
        const currentYear = new Date().getFullYear();
        const years = [];

        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }

        return years;
    }

    const years = getAllYears(2020);

    //create a function to download or print admit card
    const handleToGenerateCard = (application) => {
        // const admitCardData = {
        //     address: "Kamalapur Kushtia",
        //     applicationId: "20237202242559481",
        //     averageMark: "92.33",
        //     className: "Class 1",
        //     date: "2023",
        //     designation: "Student",
        //     district: "Khulna",
        //     division: "Kushtia",
        //     email: "sm@gmail.com",
        //     extraInfo: "No ",
        //     fatherName: "Abu sayed",
        //     gender: "",
        //     image: "https://i.ibb.co/ZNJFwH9/zubayer-pic.jpg",
        //     motherName: "Lota Khatun",
        //     name: "Suaib Sayed",
        //     number: "",
        //     phone: "+904358543",
        //     previousClass: "Class 1",
        //     schoolCode: "3333",
        //     schoolName: "Kamalapur High School"
        //     // ... other data
        // };

        // Create an HTML string for the admit card
        const admitCardHtml = `
        <div class="admit-card">
            <h2 class="flex justify-center mb-4">Admit Card</h2>
            <div class="admit-card-content flex">
                <div class="student-image-container">
                    <img src="${application.image}" alt="Student Image" class="student-image-small h-24 w-32">
                </div>
                <div class="student-info">
                    <p><strong>Application ID:</strong> ${application.applicationId}</p>
                    <p><strong>Name:</strong> ${application.name}</p>
                    <p><strong>Gender:</strong> ${application.gender}</p>
                    <p><strong>Father Name:</strong> ${application.fatherName}</p>
                    <p><strong>Mother Name:</strong> ${application.motherName}</p>
                    <p><strong>Email:</strong> ${application.email}</p>
                    <p><strong>Guardian Phone:</strong> ${application.phone}</p>
                    <p><strong>Class Name:</strong> ${application.className}</p>
                    <p><strong>School Name:</strong> ${application.schoolName}</p>
                    <p><strong>District:</strong> ${application.district}</p>
                    <p><strong>Division:</strong> ${application.division}</p>
                    <p><strong>Address:</strong> ${application.address}</p>
                    <!-- Add other data here -->
                </div>
            </div>
        </div>
    `;


        // Create a new window and populate it with the HTML content
        const newWindow = window.open('', '_blank');
        newWindow.document.write(admitCardHtml);
        newWindow.document.close();

        // Print the content
        newWindow.print();
    }

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }
    return (
        <div className="pt-8">
            <h1 className="text-3xl font-bold text-lime-300 mb-8">
                Application list{' '}
                <span className="bg-black">
                    <select className="bg-black px-2" value={date} onChange={(e) => setDate(e.target.value)}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </span>
            </h1>
            <div className="flex items-center justify-center mb-5">
                <select
                    id="classList"
                    value={classSearchQuery}
                    onChange={handleClassSearch}
                    className="bg-yellow-100 px-3 py-1 rounded-lg mr-3"
                >
                    <option value="" disabled>Select a class</option>
                    {allClasses.map((classItem, index) => (
                        <option key={index} value={classItem}>{classItem}</option>
                    ))}
                </select>
                <input
                    type="text"
                    className="bg-yellow-100 px-3 py-1 rounded-lg"
                    placeholder="Search by name"
                    value={nameSearchQuery}
                    onChange={handleNameSearch}
                />
            </div>
            <div className="text-white">
                {searchClasses
                    .map((className, index) => (
                        <div key={index} className="gradient-text text-2xl mb-20 font-semibold">
                            {className}
                            <table className="border-collapse border mt-2 w-10/12 mx-auto">
                                <thead>
                                    <tr>
                                        <th className="border p-2">Application ID</th>
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Average Mark</th>
                                        <th className="border p-2">District</th>
                                        <th className="border p-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-base">
                                    {applications
                                        .filter(application => application.className === className)
                                        .filter(application => application.name.toLowerCase().includes(applicationName.toLowerCase()))
                                        .map((application, appIndex) => (
                                            <tr key={appIndex} className="hover:bg-lime-500">
                                                <td className="border p-2">{application.applicationId}</td>
                                                <td className="border p-2">{application.name}</td>
                                                <td className="border p-2">{application.averageMark}</td>
                                                <td className="border p-2">{application.district}</td>
                                                <td className="border p-2 flex justify-center">{
                                                    application?.accept ?
                                                        <button>Accepted</button> :

                                                        application?.admitCard ?
                                                            <AiOutlineDownload className="w-8 h-8 flex justify-center" onClick={() => handleToGenerateCard(application)}></AiOutlineDownload>
                                                            :
                                                            <BtnSpinner className="w-10 h-10" title="Processing" ></BtnSpinner>


                                                }

                                                </td>

                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AdmissionProcess;
