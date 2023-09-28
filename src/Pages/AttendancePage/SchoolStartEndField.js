import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/UserContext';

const SchoolStartEndField = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { currentSchoolCode } = useContext(AuthContext)

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send in the request body
        const data = {
            startTime: startTime,
            endTime: endTime,
            currentSchoolCode: currentSchoolCode // Assuming you have this value
        };
        console.log(data)

        try {
            // Check if the school code has previous start and end times
            const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/teacherSetTime/${currentSchoolCode}`, {
                method: 'PATCH', // Use PATCH method for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                console.log('Start time and end time updated successfully.');
                toast.success('Start time and end time updated successfully.');
            } else if (response.status === 201) {
                console.log('Start time and end time created successfully.');
                toast.success('Start time and end time updated successfully.');
            } else {
                console.error('Failed to update/start time and end time.');
                toast.error('Failed to update/start time and end time.');
            }

            // Clear the input fields
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="text-white" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mt-5 text-sky-400 mb-2">Set Start&End Time </h1>
            <p className="mb-10">Please set start and end time for teacher entry and exit time in your school to get the proper attendance.</p>
            <div className="mb-2" >
                <label htmlFor="start-time">School Start Time:</label>
                <input
                    type="time"
                    className="ml-2 bg-slate-800"
                    id="start-time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
            </div>
            <div>
                <label htmlFor="end-time">School End Time:</label>
                <input
                    type="time"
                    className="ml-2 bg-slate-800"
                    id="end-time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
            </div>
            <button className="bg-green-300 py-1 px-4 rounded-tr-lg rounded-bl-lg mt-5 mb-10 text-black font-bold" type="submit">Save</button>
        </form>
    );
};

export default SchoolStartEndField;
