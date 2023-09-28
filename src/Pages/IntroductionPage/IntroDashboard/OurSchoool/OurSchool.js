import React, { useContext, useEffect, useState } from 'react';
import OurTeam from './OurTeam';
import { AuthContext } from '../../../../context/UserContext';
import About from '../../../Homepage/Home/About';
import DisplaySpinner from '../../../Shared/Spinners/DisplaySpinner';


function OurSchool() {
    const { currentSchoolCode } = useContext(AuthContext);
    const [currentShool, setCurrentSchool] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/schools/school/${currentSchoolCode}`);
                if (response.ok) {
                    const schoolData = await response.json();
                    setCurrentSchool(schoolData);
                    setLoading(false);
                } else {
                    setLoading(false);
                    throw new Error('Failed to fetch staffs');
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchSchoolData();
    }, []);

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className="text-white">
            <div className="bg-gradient-to-l from-blue-900 via-slate-900 to-black text-slate-100 lg:px-24">
                <h1 className="pt-10 text-3xl md:text-5xl font-bold text-yellow-300">About Us</h1>
                <div className="grid grid-cols-2 gap-8 mt-20">
                    <div className="flex items-center">
                        <img className="w-5/6 md:w-4/6 rounded-2xl shadow-lg" src={currentShool?.schoolBannerImg} alt="" />
                    </div>
                    <div className="flex items-center">
                        <p className=" text-white">{currentShool?.aboutSchool}</p>
                    </div>

                </div>

                <OurTeam
                    schoolCode={currentSchoolCode} />
            </div>
        </div>
    );
}

export default OurSchool;
