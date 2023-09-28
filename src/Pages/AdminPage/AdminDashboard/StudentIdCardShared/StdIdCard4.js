import React from 'react';
import img4 from "../../../../Assets/IdCard/id_5.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../../../context/UserContext';

const StdIdCard4 = ({ name, email, phone, id, gender, stdClass, expire, cardIssue, dateOfBirth, img, selectedImage }) => {
    const { schoolName } = useContext(AuthContext)
    return (
        <div className="w-96 h-56 bg-white rounded-md shadow-lg overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img4})` }}>
            < div className="flex justify-between items-center p-2 pb-0" >
                <div className="flex items-center">
                    {
                        selectedImage ?
                            <img src={selectedImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                </div>
                <div className="mr-10">
                    <h2 className="text-base font-bold text-gray-800">{name}</h2>
                    {/* <p className="text-sm text-gray-700 font-bold">{email}</p> */}
                    <p className="text-sm text-gray-700 font-bold">Phone: {phone}</p>
                    <h3 className="text-sm font-bold text-gray-700">DOB: {dateOfBirth}</h3>
                    <p className="text-sm text-gray-700 font-bold">ID: {id}</p>
                </div>


            </div >
            <div className="bg-blue-500 px-3">
                <p className="text-sm font-semibold text-white">{schoolName}</p>
            </div>
            <div className="p-5 pt-0 bg-white">
                <div className="flex flex-row justify-around items-center  text-gray-600">
                    <div className="flex flex-col">
                        <p className="text-base underline text-gray-700 font-bold">Class</p>
                        <p className="text-base font-bold">{stdClass}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base underline text-gray-700 font-bold">Gender</p>
                        <p className="text-base font-bold">{gender}</p>
                    </div>

                </div>
                <div className="ml-4 flex flex-row justify-around items-center  text-gray-600">
                    <div className="flex flex-col">
                        <p className="text-base underline text-gray-700 font-bold">Card Issue</p>
                        <p className="text-base font-bold">{cardIssue}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base underline text-gray-700 font-bold">Expires</p>
                        <p className="text-base font-bold">{expire}</p>
                    </div>

                </div>
                {/* <div className="flex flex-row justify-around items-center text-gray-600 mt-2">
                    <div className="flex flex-col">
                        <p className="text-base text-gray-700 font-bold">Card Issue</p>
                        <p className="text-base font-bold">{cardIssue}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base  text-gray-700 font-bold">Expires</p>
                        <p className="text-base font-bold">{expire}</p>
                    </div>
                </div> */}
            </div>
        </div >

    );
};

export default StdIdCard4;