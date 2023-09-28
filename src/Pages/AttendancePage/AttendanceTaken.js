import React, { useState } from 'react';
import SchoolStartEndField from './SchoolStartEndField';
import StudentAttendance from './AttendanceList';

const AttendanceTaken = () => {


    return (
        <div>
            {/* {
                start && */}
            {/* <SchoolStartEndField></SchoolStartEndField> */}
            {/* } */}
            <StudentAttendance></StudentAttendance>
        </div>
    );
};

export default AttendanceTaken;