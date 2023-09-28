import React from 'react';
import img3 from "../../../../Assets/IdCard/id_3.jpg"

const StaffIdCard3 = ({ name, email, id, stdClass, gender, designation, expire, cardIssue, dateOfBirth, img, schoolName }) => {
    return (
        <div className="w-96 h-56 border border-gray-300 rounded-lg overflow-hidden flex flex-col justify-between p-3 mx-2 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img3})` }}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center mx-2 mt-2 gap-2">
                    <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border border-gray-400" />
                    <div>
                        <h2 className=" text-base font-bold text-gray-700">{name}</h2>
                        <h3 className="text-sm font-semibold text-gray-700">{schoolName}</h3>
                        <p className=" text-sm text-gray-700">{email}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-2">
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">Designation</p>
                    <p className="text-sm font-bold">{designation}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">Gender</p>
                    <p className="text-sm font-bold">{gender}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">Expires</p>
                    <p className="text-sm font-bold">{expire}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center pb-2 px-2">
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">Card Issue</p>
                    <p className="text-sm font-bold">{cardIssue}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">Teacher id</p>
                    <p className="text-sm font-bold">{id}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-700">DOB</p>
                    <p className="text-sm font-bold">{dateOfBirth}</p>
                </div>
            </div>
        </div>
    );
};

export default StaffIdCard3;