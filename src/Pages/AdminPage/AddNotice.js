import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/UserContext';
import Notice from '../IntroductionPage/IntroDashboard/Notice';




const AddNotice = () => {
    const [heading, setHeading] = useState('');
    const [message, setMessage] = useState('');
    const [notices, setNotices] = useState([]);
    const { schoolName, currentSchoolCode } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = {
            heading: heading,
            schoolName: schoolName,
            schoolCode: currentSchoolCode,
            message: message,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        fetch('https://zuss-school-management-system-server-site.vercel.app/api/notices/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotice),
        })
            .then(response => {
                if (response.ok) {
                    // Request was successful
                    console.log('Notice posted successfully!');
                    toast.success("New Notice Create Successfully");
                    setNotices([newNotice, ...notices]);
                    setHeading('');
                    setMessage('');
                    // Handle any additional logic or UI updates
                } else {
                    // Request failed
                    console.log('Failed to post notice');
                    // Handle error case
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error case
            });

    };


    return (
        <div className=" w-4/5 mx-auto">
            <form onSubmit={handleSubmit} className=" border-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
                <h1 className="text-2xl font-bold text-lime-100 mb-5">
                    Please fill the form to add new notice
                </h1>
                <div className="mb-4 text-start">
                    <label className="block text-gray-200 font-bold mb-2" htmlFor="heading">
                        Notice Heading
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="heading"
                        type="text"
                        placeholder="Enter notice heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                </div>

                <div className="mb-4 text-start">
                    <label className="block text-gray-200 font-bold mb-2" htmlFor="message">
                        Notice Message
                    </label>
                    <textarea
                        className="shadow resize-none min-h-16 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Enter notice message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <Notice></Notice>

        </div>
    );
};

export default AddNotice;