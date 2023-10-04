import React from 'react';
import img2 from "../../../../Assets/IdCard/id_6.jpg"
import { useContext } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { AuthContext } from '../../../../context/UserContext';
import { useRef } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
const StdIdCard2 = ({ name, email, phone, id, stdClass, gender, Class, expire, cardIssue, dateOfBirth, img, selectedImage }) => {
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
            <button className="absolute z-20 right-0 top-0" onClick={handleDownloadClick}><FaCloudDownloadAlt className="text-lime-400 text-right text-2xl font-bold"></FaCloudDownloadAlt></button>

            <div ref={divRef} className=" w-96 h-56 border border-gray-300 rounded-lg overflow-hidden flex flex-col justify-between bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${img2})` }}>

                <div className="bg-gray-800 text-white py-2 px-4">
                    <p className="font-semibold">{schoolName}</p>
                    <h2 className="text-lg font-bold">{name}</h2>
                    {/* <p>{email}</p> */}
                </div>
                <div className="flex p-4 py-2">
                    {
                        selectedImage ?
                            <img src={selectedImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                    <div className="text-sm ml-3 flex-1 text-black font-bold">
                        <p>ID: <span>{id}</span></p>
                        <p>Gender: <span>{gender}</span></p>
                        <p>Class: <span> {stdClass}</span></p>
                        <p>Phone: <span> {phone}</span></p>
                        <p>Expires: <span>{expire}</span></p>
                        <p>Card Issue: <span>{cardIssue}</span></p>
                        <p>Date of Birth: <span>{dateOfBirth}</span></p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default StdIdCard2;