import React from 'react';
import img2 from "../../../../Assets/IdCard/Id_2.jpg"

const StaffIdCard2 = ({ name, email, id, stdClass, gender, designation, expire, cardIssue, dateOfBirth, img, schoolName }) => {
    return (
        <div className="w-80 h-56 bg-white shadow-md rounded-md overflow-hidden" style={{ backgroundImage: `url(${img2})` }}>

            <div className="bg-gray-800 text-white py-2 px-4">
                <h2 className="text-lg font-bold">{name}</h2>
                <p>{email}</p>
                <p className="font-semibold">{schoolName}</p>
            </div>
            <div className="flex p-4 py-2">
                <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full" />
                <div className="text-sm ml-3 flex-1">
                    <p className=" font-semibold">ID: <span>{id}</span></p>
                    <p>Gender: <span>{gender}</span></p>
                    <p>designation: <span> {stdClass}</span></p>
                    <p>Expires: <span>{expire}</span></p>
                    <p>Card Issue: <span>{cardIssue}</span></p>
                    <p>Date of Birth: <span>{dateOfBirth}</span></p>
                </div>
            </div>
        </div>
    );
};

export default StaffIdCard2;