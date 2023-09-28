import React, { useContext, useEffect, useState } from 'react';
import EachStaff from './EachStaff';
import EachStaffIntro from './EachStaffIntro';
import OurTeam from './OurSchoool/OurTeam';
import { AuthContext } from '../../../context/UserContext';
// import axios from 'axios';
// import EachUser from './EachUser';
// import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';
// import { useQuery } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import DisplaySpinner from '../../../../components/Sprinners/DisplaySpinner/DisplaySpinner';

const AllStaffIntro = () => {
    const [staffs, setStaffs] = useState([]);
    const { currentSchoolCode } = useContext(AuthContext);
    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/staffs/${currentSchoolCode}`);
                if (response.ok) {
                    const staffsData = await response.json();
                    setStaffs(staffsData);
                } else {
                    throw new Error('Failed to fetch staffs');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchStaffs();
    }, []);

    console.log(currentSchoolCode, staffs)

    return (


        <div className="bg-gradient-to-l from-blue-900 via-slate-900 to-black mt-[-100px] text-white">
            <OurTeam schoolCode={currentSchoolCode}></OurTeam>
        </div>
    );
};

export default AllStaffIntro;