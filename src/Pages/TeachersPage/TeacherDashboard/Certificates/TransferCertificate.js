import React from 'react';
import LeaveApplication from '../LeaveApplication';

const TransferCertificate = () => {
    const name = "Transfer Certificate"
    return (
        <div>
            <LeaveApplication
                name={name}
                color={"bg-fuchsia-200"}
            ></LeaveApplication>
        </div>
    );
};

export default TransferCertificate;