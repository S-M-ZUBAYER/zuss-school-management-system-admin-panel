import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';


const ApplicationDetails = () => {
    const [application, setApplication] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [className, setClassName] = useState('');
    const [classNameElement, setClassNameElement] = useState({});
    const [sectionElement, setSectionElement] = useState({});
    const [shiftElement, setShiftElement] = useState({});
    const [sectionName, setSectionName] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [allClasses, setAllClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [classRoll, setClassRoll] = useState([]);

    const { currentSchoolCode, schoolName } = useContext(AuthContext);

    const handleAcceptClick = (application) => {
        setShowModal(true);
    };

    console.log(application)

    const handleModalAccept = async () => {
        try {
            // Make POST request to backend
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/students', {
                name: application?.name,
                studentId: application?.applicationId,
                year: application?.date,
                image: application?.image,
                schoolName,
                schoolCode: currentSchoolCode,
                className: className,
                section: sectionName,
                shift: shiftName,
                gender: application?.gender,
                classRoll: classRoll,
                fatherName: application?.fatherName,
                motherName: application?.motherName,
                designation: application?.designation,
                phone: application?.phone,
                email: application?.email,
                division: application?.division,
                district: application?.district,
                address: application?.address
            });

            if (response) {
                axios.put(`https://zuss-school-management-system-server-site.vercel.app/api/application/${application?.applicationId}`, { accept: true })
                    .then(response => {
                        console.log('Updated application:', response.data);
                        // Handle success or update your UI
                    })
                    .catch(error => {
                        console.error('Error updating application:', error);
                        // Handle error or display an error message
                    });
            }


            toast.success('Staff information added successfully');
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to add staff information');
        }
        console.log(application, className, sectionName, shiftName)
        navigate("/:school/admin/admissionProcess")
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/:schoolName/admin/admissionProcess`;
        navigate(path);
    }

    const path = window.location.pathname;
    const segments = path.split("/");
    const applicationId = segments[segments.length - 1];

    const handleToReject = async (id) => {

        const confirmed = window.confirm('Are you sure you want to reject and delete this application?');

        if (confirmed) {
            try {
                await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/application/${id}`);
                toast.error("Application reject and delete successfully");
                routeChange();
            } catch (error) {
                console.error('Error rejecting application:', error);
                toast.error("Failed to reject and delete this application");

            }
        }
    };

    const handleToGenerateCard = async (id, admitCard) => {
        const confirmed = window.confirm('Are you sure you want to select to generate admit card?');

        if (confirmed) {
            // Send a PUT request to update the admitCard field
            axios.put(`https://zuss-school-management-system-server-site.vercel.app/api/application/admitCard/${id}`, {
                admitCard: true, // Set to true since we want to generate the admit card
            })
                .then(response => {
                    toast.success("Generate the admit card successfully")
                    routeChange();
                    // setAdmitCard(true); // Update the local state to true
                })
                .catch(error => {
                    console.error('Error generating admit card:', error);
                    toast.error("Failed to generate admit card successfully")
                });
        }
    }



    useEffect(() => {
        // Fetch class information based on schoolCode
        const fetchClassInfo = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
                const classInfoData = response.data?.classInfo;
                setClassInfo(classInfoData)
                if (classInfoData) {
                    const classNames = classInfoData.map((element) => element?.name);
                    // setClassInfo(classInfoData?.classInfo)
                    setAllClasses(classNames);
                    setClassNameElement(classInfoData.filter(everyClass => everyClass?.name === className));
                    if (className) {
                        console.log(classNameElement)
                    }
                }

            } catch (error) {
                console.error('Error fetching classInfo:', error);
            }
        };


        fetchClassInfo();
    }, [currentSchoolCode]);


    const handleToSelectClassName = (e) => {
        classInfo?.map(info => {
            if (info.name === className) {
                setSections(info.sections);
                setSectionElement(info);
            }
        })


    }

    const handleToShiftName = (e) => {
        className && sectionName && (sectionElement?.sections)?.map(info => {
            if (info.name === sectionName) {
                setShifts(info.shifts);
                setShiftElement(info);
            }
        })

    }


    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/application/details/${applicationId}`);
                setApplication(response.data);
            } catch (error) {
                console.error('Error fetching application details:', error);
            }
        };

        fetchApplicationDetails();
    }, [applicationId]);





    return (
        <div>
            <div className="flex justify-center p-8 text-white">
                <div className="mr-8">
                    <img src={application?.image} alt="Application Image" className="w-72 h-auto" />
                </div>
                <div className=" mt-auto text-left">
                    <h2 className="text-2xl font-semibold">{application?.name}</h2>
                    <span className="text-gray-200 text-xl">{application?.applicationId}</span>
                </div>
            </div>
            <div>
                {/* Application Info */}
                <div className=" text-white">

                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Application Id:</span> {application?.applicationId}</p>
                        <p><span className="font-semibold">Name:</span> {application?.name}</p>
                    </div>

                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">School:</span> {application?.schoolName}</p>
                        <p><span className="font-semibold">School Code:</span> {application?.schoolCode}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Phone No:</span> {application?.phone}</p>
                        <p><span className="font-semibold">Email:</span> {application?.email}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Previous School:</span> {application?.previousSchool}</p>
                        <p><span className="font-semibold">Previous Class:</span> {application?.previousClass}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Average Mark:</span> {application?.averageMark}</p>
                        <p><span className="font-semibold">Class Name:</span> {application?.className}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Father Name:</span> {application?.fatherName}</p>
                        <p><span className="font-semibold">Mother Name:</span> {application?.motherName}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Extra Information:</span> {application?.extraInfo}</p>
                        <p><span className="font-semibold">Address:</span> {application?.address}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Gender:</span> {application?.gender}</p>
                        <p><span className="font-semibold">District:</span> {application?.district}</p>
                    </div>
                    <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                        <p><span className="font-semibold">Division:</span> {application?.division}</p>
                    </div>
                    {
                        application?.number && <>
                            <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                                <p><span className="font-semibold">Agent Number:</span> {application?.number}</p>
                                <p><span className="font-semibold">Agent Name:</span> {application?.agentName}</p>
                            </div>
                            <div className="grid grid-cols-2 text-left md:mx-32 mb-2">
                                <p><span className="font-semibold">Transaction Id:</span> {application?.transactionId}</p>
                                <p><span className="font-semibold">Amount:</span> {application?.amount}</p>
                            </div>
                        </>
                    }

                </div>

                {
                    application?.accept ? "" :
                        <div className="flex justify-center mt-8 mb-12">
                            <button onClick={() => handleToReject(application._id)} className="px-4 py-2 mr-2 bg-red-500 text-white rounded">Reject</button>
                            <button onClick={() => handleToGenerateCard(application._id, application?.admitCard)} className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded">Generate Admit Card</button>
                            <button onClick={() => handleAcceptClick(application)} className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
                        </div>
                }

            </div>
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white w-2/5  p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Accept Application</h2>
                        <div className="flex justify-between items-center mb-3">
                            <label htmlFor="about" className="block font-semibold text-gray-300">
                                ClassName:
                            </label>
                            <select
                                id="className"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Please Select ClassName</option>
                                {allClasses && allClasses.map((classItem, index) => (
                                    <option key={index} value={classItem}>
                                        {classItem}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <label htmlFor="about" className="block font-semibold text-gray-300">
                                Section:
                            </label>
                            <select
                                id="className"
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)}
                                onClick={handleToSelectClassName}
                                className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Please Select Section</option>
                                {className && (sections?.map((sectionItem, index) => (
                                    <option key={index} value={sectionItem?.name}>
                                        {sectionItem?.name}
                                    </option>
                                )))}
                            </select>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <label htmlFor="about" className="block font-semibold text-gray-300">
                                Shift:
                            </label>
                            <select
                                id="className"
                                value={shiftName}
                                onChange={(e) => setShiftName(e.target.value)}
                                onClick={handleToShiftName}
                                className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Please Select Shift</option>
                                {className && sectionName && shifts.map((shiftItem, index) => (
                                    <option key={index} value={shiftItem}>
                                        {shiftItem}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between items-center mb-3 ">
                            <label htmlFor="name" className="block font-semibold text-gray-300">
                                Class Roll :
                            </label>
                            <input
                                type="text"
                                id="classRoll"
                                placeholder='Please Enter Class Roll'
                                value={classRoll}
                                onChange={(e) => setClassRoll(e.target.value)}
                                className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end mt-12">
                            <button className="px-3 py-1 mr-2 bg-red-500 text-white rounded" onClick={() => handleModalCancel(application)}>Cancel</button>
                            <button className="px-3 py-1  bg-green-500 text-white rounded" onClick={handleModalAccept}>Accept</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ApplicationDetails;