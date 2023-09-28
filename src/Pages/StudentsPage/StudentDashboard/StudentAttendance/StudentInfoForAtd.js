import React from "react";



const StudentInfoForAtd = ({ studentInfo, onClick }) => {
    return (
        <div className="flex py-1 justify-evenly mb-5 rounded overflow-hidden shadow-lg bg-white cursor-pointer" onClick={onClick}>
            <img className="" src={studentInfo?.image} alt={studentInfo?.name} />

            <div className="font-bold text-xl mb-2">{studentInfo?.name}</div>
            <p className="text-gray-700 text-base">Class: {studentInfo?.class}</p>
            <p className="text-gray-700 text-base">Roll No.: {studentInfo?.rollNo}</p>
            <p className="text-gray-700 text-base">Email: {studentInfo?.email}</p>
            <p className="text-gray-700 text-base">Phone No.: {studentInfo?.phone}</p>
        </div>
    );
};

export default StudentInfoForAtd;
