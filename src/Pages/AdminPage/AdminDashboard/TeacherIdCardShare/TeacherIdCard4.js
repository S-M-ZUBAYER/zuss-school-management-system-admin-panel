import React, { useContext } from 'react';
import img4 from "../../../../Assets/IdCard/id_4.jpg"
import { AuthContext } from '../../../../context/UserContext';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';

const TeacherIdCard4 = ({ name, email, id, stdClass, gender, designation, teacherCardExpire, teacherCardIssue, teacherDateBirth, img, selectedStaffImage }) => {
    const { schoolName } = useContext(AuthContext)

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
            <button className="absolute z-20 right-4 top-0" onClick={handleDownloadClick}><FaCloudDownloadAlt className="text-lime-700 text-right text-xl font-bold"></FaCloudDownloadAlt></button>

            <div ref={divRef} className="mb-10 w-96  h-64 bg-white rounded-md shadow-lg overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img4})` }}>
                < div className="flex justify-between items-center pt-2" >
                    <div className="flex items-center">
                        {
                            selectedStaffImage ?
                                <img src={selectedStaffImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                                :
                                <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                        }
                        <div>
                            <h2 className="text-base font-bold text-gray-800">{name}</h2>
                            <p className="text-sm font-bold text-gray-700">{email}</p>
                        </div>
                    </div>
                    <div className="text-right mr-1">
                        <h3 className="text-sm font-bold text-gray-800">DOB: {teacherDateBirth}</h3>
                        <p className="text-sm font-bold text-gray-700">ID: {id}</p>
                    </div>
                </div >
                <div className="bg-blue-500 h-9 px-3">
                    <p className="text-sm font-bold text-white">{schoolName}</p>
                </div>
                <div className="">
                    <div className="flex flex-row justify-around items-center text-gray-600">
                        <div className="flex flex-col">
                            <p className=" text-sm font-bold text-gray-700">Designation</p>
                            <p className="text-base font-bold">{designation}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-gray-700">Gender</p>
                            <p className="text-base font-bold">{gender}</p>
                        </div>

                    </div>
                    <div className="flex flex-row justify-around items-center text-gray-600 mt-2">
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-gray-700">Card Issue</p>
                            <p className="text-base font-bold">{teacherCardIssue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-gray-700">Expires</p>
                            <p className="text-base font-bold">{teacherCardExpire}</p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default TeacherIdCard4;