import React from 'react';
import LeaveApplication from '../LeaveApplication';

const CharacterCertificate = () => {
    const name = "Character Certificate"
    return (
        <div>
            <LeaveApplication
                name={name}
                color={'bg-teal-200'}
            ></LeaveApplication>
        </div>
    );
};

export default CharacterCertificate;