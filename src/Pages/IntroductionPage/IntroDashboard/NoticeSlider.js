import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteSweep } from 'react-icons/md';
import { AuthContext } from '../../../context/UserContext';

const NoticeSlider = () => {
    const [notices, setNotices] = useState([]);
    const [message, setMessage] = useState('');
    const { currentSchoolCode } = useContext(AuthContext);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                // Send a GET request to retrieve all schools
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/NoticeLiner/${currentSchoolCode}`);
                setNotices(response.data);
                console.log(response?.data)
            } catch (error) {
                console.error(error);
                // Handle the error as needed
            }
        };

        fetchSchools();
    }, [currentSchoolCode]);

    const handleAddNotice = async () => {
        if (message.trim() !== '') {
            try {


                const response = await axios.post(`https://zuss-school-management-system-server-site.vercel.app/api/NoticeLiner/${currentSchoolCode}`, { schoolCode: currentSchoolCode, message });
                toast.success("Add New News for News Slider successfully")

                setNotices([{ schoolCode: currentSchoolCode, message }, ...notices]);
                setMessage('');
            } catch (error) {
                console.error(error);
            }

        }
    };

    const handleDeleteNotice = async (index, id) => {
        const confirmed = window.confirm('Are you sure you want to delete this staff?');

        if (confirmed) {
            try {
                // Send a DELETE request to the specified URL
                const response = await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/NoticeLiner/${id}`);

                // Check the response status and handle accordingly
                if (response.status === 200) {
                    console.log('Notice deleted successfully.');
                    const updatedNotices = [...notices];
                    updatedNotices.splice(index, 1);
                    setNotices(updatedNotices);
                    // You can perform additional actions here, such as updating the UI.
                } else {
                    console.error('Failed to delete notice.');
                    // Handle the error condition appropriately.
                }
            } catch (error) {
                console.error('Error deleting notice:', error);
                // Handle any network or other errors here.
            }
        }

    };

    return (
        <div className="text-white">
            <h2 className="text-3xl font-bold my-10 text-green-400">Add Notices for Slider</h2>
            <div className="flex justify-center items-center">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your notice here"
                    className="md:w-[700px] text-black px-2"
                />
                <button className="text-lg bg-lime-300 px-5 py-1 rounded-lg ml-5 text-black" onClick={handleAddNotice}>Add</button>
            </div>
            <h2 className="mt-10 mb-5 text-2xl font-semibold underline">Available Notices</h2>
            <p className="pt-2 pb-5 text-lg">please add the latest notice for news liner no more that five.if Need please delete previous Notices...</p>
            <ul className="">
                {notices && notices.length > 0 && notices.reverse().map((notice, index) => (
                    <li key={index} className="flex items-center  border justify-between px-5 py-1 mx-20 text-start">
                        {notice?.message}
                        <button onClick={() => handleDeleteNotice(index, notice?._id)} className=" text-2xl text-red-600 font-semibold ml-5"><MdDeleteSweep></MdDeleteSweep></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeSlider;
