import React from 'react';
import img2 from "../../../../Assets/IdCard/Id_2.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../../../context/UserContext';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';

const TeacherIdCard2 = ({ name, email, id, stdClass, gender, designation, teacherCardExpire, teacherCardIssue, teacherDateBirth, img, selectedStaffImage }) => {
    const { schoolName } = useContext(AuthContext)
    console.log(name, email, id, stdClass, gender, designation, teacherCardExpire, teacherCardIssue, teacherDateBirth, selectedStaffImage)
    const divRef = useRef(null);

    function handleDownloadClick() {
        html2canvas(divRef.current).then(canvas => {
            canvas.toBlob(blob => {
                saveAs(blob, 'div.png');
            });
        });
    }

    return (
        <div className="relative">
            <button className="absolute z-20 right-20 top-0" onClick={handleDownloadClick}><FaCloudDownloadAlt className="text-lime-400 text-right text-xl font-bold"></FaCloudDownloadAlt></button>

            <div ref={divRef} className="mb-10 w-80 h-60 bg-white shadow-md rounded-md overflow-hidden" style={{ backgroundImage: `url(${img2})` }}>

                <div className="bg-gray-800 text-white py-2 px-4">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p>{email}</p>
                    <p className="font-semibold">{schoolName}</p>
                </div>
                <div className="flex p-4 py-2">
                    {
                        selectedStaffImage ?
                            <img src={selectedStaffImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                    <div className="text-sm ml-3 flex-1 font-bold">
                        <p className=" font-semibold">ID: <span>{id}</span></p>
                        <p>Gender: <span>{gender}</span></p>
                        <p>designation: <span> {designation}</span></p>
                        <p>Card Issue: <span>{teacherCardIssue}</span></p>
                        <p>Expires: <span>{teacherCardExpire}</span></p>
                        <p>Date of Birth: <span>{teacherDateBirth}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherIdCard2;