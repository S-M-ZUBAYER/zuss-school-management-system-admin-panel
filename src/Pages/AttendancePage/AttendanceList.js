

// import React, { useState, useContext, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { AuthContext } from '../../context/UserContext';

// const StaffAttendance = () => {
//     const [staffs, setStaffs] = useState([]);
//     const [atdTime, setAtdTime] = useState({});
//     const { currentSchoolCode } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchStaffs = async () => {
//             try {
//                 const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/staffs/${currentSchoolCode}`);
//                 if (response.ok) {
//                     const staffsData = await response.json();
//                     setStaffs(staffsData);
//                 } else {
//                     throw new Error('Failed to fetch staffs');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 // Handle error case
//             }
//         };

//         const fetchTime = async () => {
//             try {
//                 const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/teacherSetTime/${currentSchoolCode}`);
//                 if (response.ok) {
//                     const timeData = await response.json();
//                     setAtdTime(timeData);
//                 } else {
//                     throw new Error('Failed to fetch time');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 // Handle error case
//             }
//         };

//         fetchTime();
//         fetchStaffs();
//     }, [currentSchoolCode]);

//     const startTime = new Date();
//     startTime.setHours(12, 0, 0);

//     const endTime = new Date();
//     endTime.setHours(14, 0, 0);

//     const handleEntryTimeClick = (staff) => {
//         const currentTime = new Date();
//         if (currentTime >= startTime && currentTime <= endTime) {
//             const attendance = {
//                 date: new Date().toISOString().split('T')[0],
//                 isEntryPresent: true,
//                 isExitPresent: false,
//                 isPresent: false,
//                 isAbsence: false,
//                 isEmergency: false,
//                 emergencyText: ''
//             };
//             staff.attendance.push(attendance);
//             setStaffs([...staff]);
//         } else {
//             toast.error("Please enter on time");
//         }
//     };

//     const handleExitTimeClick = (staff) => {
//         const currentTime = new Date();
//         if (currentTime >= endTime) {
//             const attendance = {
//                 date: new Date().toISOString().split('T')[0],
//                 isEntryPresent: true,
//                 isExitPresent: true,
//                 isPresent: true,
//                 isAbsence: false,
//                 isEmergency: false,
//                 emergencyText: ''
//             };
//             staff.attendance.push(attendance);
//             setStaffs([...staffs]);
//         } else {
//             toast.error("Please exit on time");
//         }
//     };

//     const handleEmergencyClick = (staff) => {
//         const emergencyText = prompt('Enter emergency text:');
//         if (emergencyText) {
//             const attendance = {
//                 date: new Date().toISOString().split('T')[0],
//                 isPresent: false,
//                 isAbsence: false,
//                 isEmergency: true,
//                 emergencyText: emergencyText
//             };
//             staff.attendance.push(attendance);
//             setStaffs([...staffs]);
//         }
//     };

//     return (
//         <div className="text-white">
//             <h1 className="text-2xl font-bold mt-5 mb-10">All Staffs Attendance</h1>

//             <table className="w-10/12 mx-auto">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Designation</th>
//                         <th>Phone</th>
//                         <th>Entry</th>
//                         <th>Exit</th>
//                         <th>Emergency</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {staffs.map((staff) => (
//                         <tr className="border" key={staff.teacherId}>
//                             <td className="border" >{staff.name}</td>
//                             <td className="border" >{staff.designation}</td>
//                             <td className="border" >{staff.phone}</td>
//                             <td className="border" >
//                                 <button className="bg-amber-300 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleEntryTimeClick(staff)}>Entry Time</button>
//                             </td>
//                             <td className="border" >
//                                 <button className="bg-amber-300 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleExitTimeClick(staff)}>Exit Time</button>
//                             </td>
//                             <td className="border" >
//                                 <button className="bg-red-400 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleEmergencyClick(staff)}>Emergency</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StaffAttendance;



import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/UserContext';
import DisplaySpinner from '../Shared/Spinners/DisplaySpinner';

const StaffAttendance = () => {
    const [staffs, setStaffs] = useState([]);
    const [atdTime, setAtdTime] = useState({});
    const [allAttendances, setAllAttendances] = useState([]);
    const { currentSchoolCode } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/staffs/${currentSchoolCode}`);
                if (response.ok) {
                    const staffsData = await response.json();
                    setStaffs(staffsData);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch staffs');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        const fetchTime = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/teacherSetTime/${currentSchoolCode}`);
                if (response.ok) {
                    const timeData = await response.json();
                    setAtdTime(timeData);
                    setLoading(false);
                } else {
                    setLoading(false);
                    throw new Error('Failed to fetch time');
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
                // Handle error case
            }
        };

        fetchTime();
        fetchStaffs();
    }, [currentSchoolCode]);

    const startTime = new Date();
    const endTime = new Date();
    if (atdTime.startTime && atdTime.endTime) {
        const [startHour, startMinute] = atdTime.startTime.split(':');
        const [endHour, endMinute] = atdTime.endTime.split(':');
        startTime.setHours(Number(startHour), Number(startMinute), 0);
        endTime.setHours(Number(endHour), Number(endMinute), 0);
    }

    const handleEntryTimeClick = (staff) => {
        const currentTime = new Date();
        console.log(currentTime, startTime)
        if (currentTime <= startTime && currentTime <= endTime) {
            const attendance = {
                date: new Date().toISOString().split('T')[0],
                isEntryPresent: true,
                isExitPresent: false,
                isPresent: false,
                isAbsence: false,
                isEmergency: false,
                emergencyText: ''
            };
            // staff.attendance.push(attendance);
            setAllAttendances([...allAttendances, attendance])
            setStaffs([...staffs]);
        } else {
            toast.error("Please enter on time");
        }
    };

    const handleExitTimeClick = (staff) => {
        const currentTime = new Date();
        if (currentTime >= endTime) {
            const attendance = {
                date: new Date().toISOString().split('T')[0],
                isEntryPresent: true,
                isExitPresent: true,
                isPresent: true,
                isAbsence: false,
                isEmergency: false,
                emergencyText: ''
            };
            // staff.attendance.push(attendance);
            setAllAttendances([...allAttendances, attendance])
            setStaffs([...staffs]);
        } else {
            toast.error("Please exit on time");
        }
    };

    const handleEmergencyClick = (staff) => {
        const emergencyText = prompt('Enter emergency text:');
        if (emergencyText) {
            const attendance = {
                date: new Date().toISOString().split('T')[0],
                isPresent: false,
                isAbsence: false,
                isEmergency: true,
                emergencyText: emergencyText
            };
            // staff.attendance.push(attendance);
            setAllAttendances([...allAttendances, attendance])
            setStaffs([...staffs]);
        }
    };

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mt-5 mb-10">All Staffs Attendance</h1>

            <table className="w-10/12 mx-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Phone</th>
                        <th>Entry</th>
                        <th>Exit</th>
                        <th>Emergency</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((staff) => (
                        <tr className="border" key={staff.teacherId}>
                            <td className="border" >{staff.name}</td>
                            <td className="border" >{staff.designation}</td>
                            <td className="border" >{staff.phone}</td>
                            <td className="border" >
                                <button className="bg-amber-300 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleEntryTimeClick(staff)}>Entry Time</button>
                            </td>
                            <td className="border" >
                                <button className="bg-amber-300 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleExitTimeClick(staff)}>Exit Time</button>
                            </td>
                            <td className="border" >
                                <button className="bg-red-400 rounded-tl-lg rounded-br-lg px-2 py-1" onClick={() => handleEmergencyClick(staff)}>Emergency</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffAttendance;

