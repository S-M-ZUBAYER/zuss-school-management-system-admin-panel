import React, { useContext, useEffect, useState } from 'react';
import About from './About';
import Banner from './Banner';
import NewsTicker from './NewsSticker';
import { AuthContext } from '../../../context/UserContext';
import ShortOverView from '../ShortOverView';
import Review from '../Review';
import CarouselCustomNavigation from './CarouselCustomNavigation';
import { set } from 'date-fns';
import DisplaySpinner from '../../Shared/Spinners/DisplaySpinner';

const Home = () => {
    const { currentSchoolCode, setCurrentSchoolCode, user } = useContext(AuthContext);
    const [currentShool, setCurrentSchool] = useState(null);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);
        // Fetch school information when the component mounts
        fetch(`https://zuss-school-management-system-server-site.vercel.app/api/schools/school/${currentSchoolCode}`)
            .then(response => response.json())
            .then(data => {
                // Process the data or do something with it
                setCurrentSchool(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching school information:', error);
                setLoading(false)
            });
    }, [currentSchoolCode]); // Empty dependency array ensures this effect runs only once

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className=''>
            <Banner
                currentShool={currentShool}
            ></Banner>
            <NewsTicker newsItems={['Breaking news!', 'Latest headlines', 'News update', 'skfjlsakdjflakdsf', 'kdsjflajs flasjfsadkfda', 'sdjfasdfjlasfjls']} />
            {/* <AutoImageSlider></AutoImageSlider> */}

            <CarouselCustomNavigation></CarouselCustomNavigation>
            <About
                currentShool={currentShool}
            ></About>

            <ShortOverView></ShortOverView>

            <Review></Review>
        </div>
    );
};

export default Home;