import React, { useContext, useRef } from 'react';
import img1 from "../../../../Assets/IdCard/id_8.jpg"

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { AuthContext } from '../../../../context/UserContext';
import { FaCloudDownloadAlt } from 'react-icons/fa';

const StdIdCard1 = ({ name, email, phone, id, gender, stdClass, expire, cardIssue, dateOfBirth, img, selectedImage }) => {
    const { schoolName } = useContext(AuthContext);

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

            <button className="absolute z-20 right-24 top-0" onClick={handleDownloadClick}><FaCloudDownloadAlt className="text-lime-400 text-right text-xl font-bold"></FaCloudDownloadAlt></button>


            <div
                ref={divRef}
                id="targetDiv"
                className=" w-72 h-[450px] rounded-md overflow-hidden flex flex-col justify-between bg-cover bg-no-repeat relative"
                style={{ backgroundImage: `url(${img1})` }}
            >
                <div className="flex flex-col items-center justify-center h-24 bg-blue-500 text-white">
                    <h2 className="text-lg font-bold">{schoolName}</h2>
                    <p className="mt-1">Student ID</p>
                </div>
                <div className="flex-grow flex flex-col justify-between p-3">
                    <div className="flex flex-col items-center">
                        {
                            selectedImage ?
                                <img src={selectedImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                                :
                                <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                        }
                        <h2 className="text-lg font-bold text-gray-700">{name}</h2>
                        {/* <p className="text-gray-700">{email}</p> */}
                    </div>
                    <div className="flex flex-col mt-4">
                        <div className="flex justify-between ">
                            <p className="text-sm font-bold text-gray-800">ID Number:</p>
                            <p className="text-gray-700 font-semibold">{id}</p>
                        </div>
                        <div className="flex justify-between ">
                            <p className="text-sm font-bold text-gray-800">Gender:</p>
                            <p className="text-gray-700 font-semibold">{gender}</p>
                        </div>
                        <div className="flex justify-between ">
                            <p className="text-sm font-bold text-gray-800">Class:</p>
                            <p className="text-gray-700 font-semibold">{stdClass}</p>
                        </div>
                        <div className="flex justify-between ">
                            <p className="text-sm font-bold text-gray-800">Phone:</p>
                            <p className="text-gray-700 font-semibold">{phone}</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="text-sm font-bold text-gray-800">Expires:</p>
                            <p className="text-gray-700 font-semibold">{expire}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm font-bold text-gray-800">Card Issue:</p>
                            <p className="text-gray-700 font-semibold">{cardIssue}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm font-bold text-gray-800">Date of Birth:</p>
                            <p className="text-gray-700 font-semibold">{dateOfBirth}</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default StdIdCard1;