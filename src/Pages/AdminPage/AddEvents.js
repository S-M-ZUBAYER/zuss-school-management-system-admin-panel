import React, { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';

const AddEvents = () => {

    const { schoolName, currentSchoolCode } = useContext(AuthContext);



    const [eventName, setEventName] = useState('');
    const [image, setImage] = useState(null);
    const [destination, setDestination] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');




    // const [teacherId, setTeacherId] = useState('');
    // const [address, setAddress] = useState('');
    // const [bloodGroup, setBloodGroup] = useState('');

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
            console.log(error);
            toast.error(error.message);
        }
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!eventName || !destination || !date || !time || !image || !description) {
            toast.error('Please fill in all fields');
            return;
        }


        try {
            // Make POST request to backend
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/schoolEvents', {
                schoolName,
                schoolCode: currentSchoolCode,
                eventName,
                destination,
                date,
                time,
                description,
                image,

            });

            console.log(response)

            // Clear form fields
            setEventName('');
            setDestination('');
            setDate('');
            setTime('');
            setDescription('');
            setImage('');

            // Show success toast
            toast.success('Event information added successfully');
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to add event information');
        }
    };

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload([file]);
        }
    };




    return (
        <div className="my-10 px-10 py-10 md:mx-5 border-2">
            <h1 className="text-3xl font-bold text-lime-300 mb-4">Please Input New Event Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold text-gray-300">
                        Event Name :
                    </label>
                    <input
                        type="text"
                        id="schoolEvent"
                        placeholder='Enter School Event Name'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="name" className="block font-semibold text-gray-300">
                        Destination :
                    </label>
                    <input
                        type="text"
                        id="destination"
                        placeholder='Please Enter Destination'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="designation" className="block font-semibold text-gray-300">
                        Event Time :
                    </label>
                    <input
                        type="time"
                        id="eventTime"
                        placeholder='Please Enter Event Time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="phone" className="block font-semibold text-gray-300">
                        Event Date :
                    </label>
                    <input
                        type="date"
                        id="eventDate"
                        placeholder='Please Enter Event Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Event Description :
                    </label>
                    <input
                        type="text"
                        id="description"
                        placeholder='Please Enter Event Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-gray-300 flex justify-between items-center">
                    <label htmlFor="email" className="block font-semibold text-gray-300">
                        Image :
                    </label>
                    <input className="w-5/6 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleInputChange} />
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

export default AddEvents;
