import React from 'react';
import img3 from "../../../../Assets/IdCard/id_3.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../../../context/UserContext';

const TeacherIdCard3 = ({ name, email, id, stdClass, gender, designation, expire, cardIssue, dateOfBirth, img, selectedStaffImage }) => {
    const { schoolName } = useContext(AuthContext)
    return (
        <div className="mb-10 w-96 h-56 border border-gray-300 rounded-lg overflow-hidden flex flex-col justify-between p-3 mx-2 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img3})` }}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center mx-2 mt-2 gap-2">
                    {
                        selectedStaffImage ?
                            <img src={selectedStaffImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                    <div>
                        <h2 className=" text-base text-gray-800 font-bold">{name}</h2>
                        <h3 className="text-sm text-gray-800 font-bold">{schoolName}</h3>
                        <p className=" text-sm text-gray-800 font-bold">{email}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-2">
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">Designation</p>
                    <p className="text-sm font-bold">{designation}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">Gender</p>
                    <p className="text-sm font-bold">{gender}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">Expires</p>
                    <p className="text-sm font-bold">{expire}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center pb-2 px-2">
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">Card Issue</p>
                    <p className="text-sm font-bold">{cardIssue}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">Teacher id</p>
                    <p className="text-sm font-bold">{id}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm  text-gray-800 font-bold">DOB</p>
                    <p className="text-sm font-bold">{dateOfBirth}</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherIdCard3;