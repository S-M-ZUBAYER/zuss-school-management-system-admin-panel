import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';

const ActivitiesDetails = () => {
    const { events } = useContext(AuthContext);

    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const detailSId = pathParts[pathParts.length - 1];

    const currentEvent = events.filter(event => event?._id === detailSId)[0];


    return (
        <div className="lg:px-32 p-6 text-center">
            <div className=" flex justify-center ">
                <img src={currentEvent?.image} alt="Event" className="w-7/12 h-auto object-contain rounded-lg" />
            </div>
            <div className="py-4">
                <h2 className="text-2xl font-bold text-green-300">{currentEvent?.eventName}</h2>

                <h3 className="text-gray-50 text-lg"><span className="font-semibold text-amber-200">Place:</span> {currentEvent?.destination}</h3>

                <div className="flex items-center justify-center text-lg ">
                    <span className="text-gray-50"><span className="font-semibold text-amber-200">Time:</span> {currentEvent?.date}</span>
                    <span className="text-gray-50 mx-2">at</span>
                    <span className="text-gray-50">{currentEvent?.time}</span>
                </div>

                <p className="text-gray-50 mt-3">{currentEvent?.description}</p>
            </div>
        </div>
    );
};


export default ActivitiesDetails;