import React, { useContext } from 'react';
import img3 from "../../../../Assets/IdCard/id_9.jpg"
import { AuthContext } from '../../../../context/UserContext';

const StdIdCard3 = ({ name, email, phone, id, gender, stdClass, expire, cardIssue, dateOfBirth, img, selectedImage }) => {
    const { schoolName } = useContext(AuthContext)

    return (
        <div className=" w-96 h-56 border shadow-2xl border-gray-300 rounded-lg overflow-hidden flex flex-col justify-between bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${img3})` }}>
            <div className="flex justify-between items-center  ">
                <div className="flex items-center mx-2 mt-2 gap-2">
                    {
                        selectedImage ?
                            <img src={selectedImage} alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />
                            :
                            <img src="https://s.yimg.com/fz/api/res/1.2/IfHPji1C1Il0NM5LyT_UQg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjA7cT04MDt3PTE2NQ--/https://s.yimg.com/zb/imgv1/880eb131-c93c-3bb5-98e5-076c4f996c4f/t_500x300" alt={name} className="w-24 h-24 rounded-full border-2 border-gray-300 " />

                    }
                    <div className='font-bold'>
                        <h3 className="text-sm font-bold text-gray-800">{schoolName}</h3>
                        <h2 className=" text-base font-bold text-gray-800">{name}</h2>
                        {/* <p className=" text-sm text-gray-800">{email}</p> */}
                        <p className=" text-sm text-gray-800">{phone}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white py-3">

                <div className=" flex flex-row justify-between items-center px-2 ">
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800  font-bold">Class</p>
                        <p className="text-sm font-bold text-black">{stdClass}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800  font-bold">Gender</p>
                        <p className="text-sm font-bold text-black">{gender}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800  font-bold">Expires</p>
                        <p className="text-sm font-bold text-black">{expire}</p>
                    </div>
                </div>
                <div className="bg-white flex flex-row justify-between items-center pb-2 px-2">
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800 font-bold">Card Issue</p>
                        <p className="text-sm font-bold text-black">{cardIssue}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800 font-bold">Student id</p>
                        <p className="text-sm font-bold text-black">{id}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm  text-gray-800 font-bold">DOB</p>
                        <p className="text-sm font-bold text-black">{dateOfBirth}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StdIdCard3;