import React, { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';

const AddStaff = () => {

    const { schoolName, currentSchoolCode } = useContext(AuthContext);

    const [teacherId, setTeacherId] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [district, setDistrict] = useState('');
    const [division, setDivision] = useState('');
    const [address, setAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [about, setAbout] = useState('');

    const handleFileUpload = useCallback(async (acceptedFiles) => {
        console.log(teacherId,
            name,
            schoolName,
            currentSchoolCode,
            designation,
            selectedStatus,
            phone,
            email,
            image,
            bloodGroup,
            district,
            division,
            address,
            about,)
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
            console.log(error);
            toast.error(error.message);
        }
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !designation || !phone || !email || !address || !bloodGroup || !about) {
            toast.error('Please fill in all fields');
            return;
        }
        console.log(selectedStatus)

        try {
            // Make POST request to backend
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/staffs', {
                teacherId,
                name,
                schoolName,
                schoolCode: currentSchoolCode,
                designation,
                selectedStatus,
                phone,
                email,
                image,
                bloodGroup,
                district,
                division,
                address,
                about,
            });



            // Clear form fields
            setName('');
            setTeacherId("");
            setDesignation('');
            setSelectedStatus('');
            setPhone('');
            setEmail('');
            setDistrict("");
            setDivision("");
            setAddress('');
            setAbout('');
            setBloodGroup("")

            // Show success toast
            toast.success('Staff information added successfully');
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to add staff information');
        }
    };

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload([file]);
        }
    };

    const handleToGenerateId = () => {
        const currentDate = new Date();
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
        const id = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${randomNumbers}`;
        setTeacherId(id);
    };


    return (
        <div className="my-10 px-10 py-10 md:mx-5 border-2">
            <h1 className="text-3xl font-bold text-lime-300 mb-4">Please Input New Staff Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold text-gray-300">
                        Teacher Id :
                    </label>
                    <input
                        type="text"
                        id="teacherId"
                        placeholder='Click To generate Automatic teacher id'
                        value={teacherId}
                        onClick={handleToGenerateId}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold text-gray-300">
                        Name :
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
                    <label htmlFor="designation" className="block font-semibold text-gray-300">
                        Designation :
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

                <div className="flex justify-between items-center">
                    <label htmlFor="status" className="block font-semibold text-gray-300">
                        Status:
                    </label>
                    <select
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an option</option>
                        <option value="Management">Management</option>
                        <option value="Principal">Principal</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <label htmlFor="phone" className="block font-semibold text-gray-300">
                        Phone :
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
                        Email :
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
                <div className="text-gray-300 flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Image :
                    </label>
                    <input className="w-5/6 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleInputChange} />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Blood Group :
                    </label>
                    <input
                        type="text"
                        id="bloodGroup"
                        placeholder='Please Enter Blood Group'
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
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

                <div className="flex justify-between items-center">
                    <label htmlFor="address" className="block font-semibold text-gray-300">
                        Address :
                    </label>
                    <textarea
                        id="address"
                        value={address}
                        placeholder='Please Enter Your Full Address'
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="about" className="block font-semibold text-gray-300">
                        About :
                    </label>
                    <textarea
                        id="about"
                        value={about}
                        placeholder='Please Enter Somethings About Yourself'
                        onChange={(e) => setAbout(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-yellow-500 text-white w-full font-semibold py-2 px-8 rounded-md hover:bg-green-600"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
