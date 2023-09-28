import React from 'react';
import LeaveApplication from '../LeaveApplication';

const CourseCompletionCertificate = () => {
    const name = "Course Completion Certificate"
    return (
        <div>
            <LeaveApplication
                name={name}
                color={"bg-cyan-200"}
            ></LeaveApplication>
        </div>
    );
};

export default CourseCompletionCertificate;