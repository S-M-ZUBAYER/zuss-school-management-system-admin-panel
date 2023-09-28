import React, { useState } from 'react';
import AddNotice from '../../AdminPage/AddNotice';
import NoticeSlider from './NoticeSlider';

const NoticeHomePage = () => {
    const [showDetailsButton, setShowDetailsButton] = useState(true);
    const [showNoticeNavbar, setShowNoticeNavbar] = useState(false);

    const handleShowDetailsButton = () => {
        setShowDetailsButton(true);
        setShowNoticeNavbar(false);
    };

    const handleShowNoticeNavbar = () => {
        setShowDetailsButton(false);
        setShowNoticeNavbar(true);
    };

    return (
        <div>
            <div className="my-10 text-white">
                <button
                    className="px-3 py-2 rounded-l-3xl border"
                    onClick={handleShowDetailsButton}
                    style={{ backgroundColor: showDetailsButton ? 'green' : 'transparent' }}
                >
                    Details Notice
                </button>
                <button
                    className="px-3 py-2 rounded-r-3xl border"
                    onClick={handleShowNoticeNavbar}
                    style={{ backgroundColor: showNoticeNavbar ? 'green' : 'transparent' }}
                >
                    Notice Slider
                </button>
            </div>
            {showDetailsButton && <AddNotice></AddNotice>}
            {showNoticeNavbar && <NoticeSlider></NoticeSlider>}
        </div>
    );
};

export default NoticeHomePage;
