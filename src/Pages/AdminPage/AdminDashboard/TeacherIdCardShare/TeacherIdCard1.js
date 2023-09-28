import React from 'react';
import img1 from "../../../../Assets/IdCard/id_1.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../../../context/UserContext';

const TeacherIdCard1 = ({ name, email, id, stdClass, gender, designation, expire, cardIssue, dateOfBirth, img, selectedStaffImage }) => {
    const { schoolName } = useContext(AuthContext);
    console.log(name, email, id, stdClass, gender, designation, expire, cardIssue, dateOfBirth, img, selectedStaffImage)

    return (
        <div className="mb-10 w-72 h-96 rounded-md overflow-hidden shadow-lg flex flex-col justify-between bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img1})` }}>
            <div className="flex flex-col items-center justify-center h-24 bg-blue-500 text-white">
                <h2 className="text-lg font-bold">{schoolName}</h2>
                <p className="mt-1">Student ID</p>
            </div>
            <div className="flex-grow flex flex-col justify-between p-3">
                <div className="flex flex-col items-center">
                    {
                        selectedStaffImage ?
                            <img src={selectedStaffImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-gray-700">{email}</p>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="flex justify-between ">
                        <p className="text-sm font-bold text-gray-800">ID Number:</p>
                        <p className="text-gray-700">{id}</p>
                    </div>
                    <div className="flex justify-between ">
                        <p className="text-sm font-bold text-gray-800">Designation:</p>
                        <p className="text-gray-700">{designation}</p>
                    </div>
                    <div className="flex justify-between ">
                        <p className="text-sm font-bold text-gray-800">Gender:</p>
                        <p className="text-gray-700">{gender}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-bold text-gray-800">Expires:</p>
                        <p className="text-gray-700">{expire}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm font-bold text-gray-800">Card Issue:</p>
                        <p className="text-gray-700">{cardIssue}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm font-bold text-gray-800">Date of Birth:</p>
                        <p className="text-gray-700">{dateOfBirth}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherIdCard1;