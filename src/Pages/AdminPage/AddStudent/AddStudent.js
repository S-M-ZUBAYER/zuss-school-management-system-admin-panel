import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';

const AddStaff = () => {

    const { schoolName, currentSchoolCode } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [designation, setDesignation] = useState("Student");
    const [className, setClassName] = useState('');
    const [classRoll, setClassRoll] = useState('');
    const [gender, setGender] = useState('');
    const [section, setSection] = useState("");
    const [sections, setSections] = useState([]);
    const [shift, setShift] = useState("");
    const [shifts, setShifts] = useState([]);
    const [sectionName, setSectionName] = useState([]);
    const [shiftName, setShiftName] = useState('');
    const [sectionElement, setSectionElement] = useState({});
    const [shiftElement, setShiftElement] = useState({});
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [district, setDistrict] = useState('');
    const [division, setDivision] = useState('');
    const [address, setAddress] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [allClasses, setAllClasses] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [image, setImage] = useState([]);



    useEffect(() => {
        // Fetch class information based on schoolCode
        const fetchClassInfo = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/${currentSchoolCode}`);
                setAllClasses(response.data);
            } catch (error) {
                console.error('Error fetching class information:', error);
            }
        };

        fetchClassInfo();
    }, [currentSchoolCode]);


    const fetchClassInfo = async () => {
        try {
            const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
            const classInfoData = response.data?.classInfo;
            setClassInfo(classInfoData)
            if (classInfoData) {
                const classNames = classInfoData.map((element) => element?.name);
                setAllClasses(classNames);
            }
        } catch (error) {
            console.error('Error fetching classInfo:', error);
        }
    };




    useEffect(() => {
        fetchClassInfo();
    }, [currentSchoolCode]);

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload([file]);
        }
    };



    const handleFileUpload = useCallback(async (acceptedFiles) => {
        const apiKey = process.env.REACT_APP_imgbbKey;
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                formData
            );
            setImage(response.data.data.display_url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!name || !designation || !phone || !email || !address || !className || !classRoll || !fatherName || !motherName) {
            toast.error('Please fill in all fields');
            return;
        }
        const studentInfo = {
            studentId,
            name,
            year: new Date().getFullYear(),
            image,
            schoolName,
            schoolCode: currentSchoolCode,
            designation,
            className,
            section,
            shift,
            gender,
            classRoll,
            fatherName,
            motherName,
            phone,
            email,
            division,
            district,
            address
        }
        try {
            // Make POST request to backend
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/students/add', studentInfo);

            // Clear form fields
            setName('');
            setStudentId("");
            setDesignation('');
            setPhone('');
            setEmail('');
            setImage("");
            setAddress('');
            setClassName("");
            setSection("");
            setShift("");
            setClassRoll("");
            setShift("");
            setSection("");
            setGender("");
            setFatherName("");
            setMotherName("");
            setAddress("");
            setDivision("");
            setDistrict("");

            // Check the response status code for success
            if (response.status === 201) {
                // Show success toast
                toast.success('Staff information added successfully');
            } else {
                // Handle other response status codes (if needed)
                toast.error('Failed to add student information');
            }
        } catch (error) {
            // Show error toast if request fails
            console.error('Error:', error);
            toast.error('Failed to add student information');
        }
    };

    const selectedClass = classInfo?.find(item => item.name === className);
    const selectedSection = selectedClass?.sections.find(sectionItem => sectionItem.name === section);
    // const shifts = selectedSection?.shifts || [];



    const handleToGenerateId = () => {
        const currentDate = new Date();
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
        const id = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${randomNumbers}`;
        setStudentId(id);
    };


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
    console.log(section, shift)
    // console.log((className && section && classInfo?.find(item => item.name === className).sections).find(sectionItem => sectionItem.name === section).shifts, "shift")

    return (
        <div className="my-10 px-10 py-10 md:mx-5 border-2">
            <h1 className="text-3xl font-bold text-lime-300 mb-4">Please Input New Student Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold  text-gray-300">
                        Student Id:
                    </label>
                    <input
                        type="text"
                        id="application id"
                        placeholder='Click to generate application id'
                        value={studentId}
                        onClick={handleToGenerateId}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold  text-gray-300">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Please Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="designation" className="block font-semibold  text-gray-300">
                        Designation:
                    </label>
                    <input
                        type="text"
                        id="designation"
                        placeholder='Please Enter Designation'
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-gray-300 flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Image :
                    </label>
                    <input className="w-5/6 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleInputChange} />
                </div>


                <div className="flex justify-between items-center">
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
                <div className="flex justify-between items-center">
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
                <div className="flex justify-between items-center">
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

                <div className="flex justify-between items-center">
                    <label htmlFor="about" className="block font-semibold text-gray-300">
                        Class Roll:
                    </label>
                    <input
                        id="classRoll"
                        value={classRoll}
                        placeholder='Please Enter Class Roll'
                        onChange={(e) => setClassRoll(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center text-white">
                    <label htmlFor="paymentMethod">Gender:</label>
                    <select className=" w-10/12 px-3 text-black py-2 rounded-lg" id="paymentMethod" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <label htmlFor="about" className="block font-semibold text-gray-300">
                        Father Name:
                    </label>
                    <input
                        id="fatherName"
                        value={fatherName}
                        placeholder='Please Enter Father Name'
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="about" className="block font-semibold text-gray-300">
                        Mother Name:
                    </label>
                    <input
                        id="motherName"
                        value={motherName}
                        placeholder='Please Enter Mother Name'
                        onChange={(e) => setMotherName(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="phone" className="block font-semibold text-gray-300">
                        Guardian Phone:
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder='Please Enter Phone No'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        placeholder='Please Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        District:
                    </label>
                    <input
                        type="text"
                        id="district"
                        placeholder='Please Enter District'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Division:
                    </label>
                    <input
                        type="text"
                        id="division"
                        placeholder='Please Enter Division'
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="flex justify-between items-center mb-8">
                    <label htmlFor="address" className="block font-semibold text-gray-300">
                        Address:
                    </label>
                    <textarea
                        id="address"
                        value={address}
                        placeholder='Please Enter Your Full Address'
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>




                <button
                    type="submit"
                    className="bg-green-500 w-full my-24 text-white py-2 px-8 rounded-md hover:bg-green-600"
                >
                    Admit
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
