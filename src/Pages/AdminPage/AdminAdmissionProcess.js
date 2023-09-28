import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import DisplaySpinner from '../Shared/Spinners/DisplaySpinner';

const AdminAdmissionProcess = () => {
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
                                        <th className="border p-2">Details</th>
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
                                                <td className="border p-2">
                                                    <Link to={`details/${application.applicationId}`}>
                                                        <button className="bg-green-500 text-white py-1 px-3 rounded">
                                                            Details
                                                        </button>
                                                    </Link>
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

export default AdminAdmissionProcess;
