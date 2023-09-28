import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GenerateClassRoutine = () => {
    const [className, setClassName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [routine, setRoutine] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [classNameElement, setClassNameElement] = useState({});
    const [sectionElement, setSectionElement] = useState({});
    const [shiftElement, setShiftElement] = useState({});
    const [allClasses, setAllClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [classInfo, setClassInfo] = useState([]);

    const { schoolName, currentSchoolCode } = useContext(AuthContext);
    console.log(schoolName, currentSchoolCode)

    useEffect(() => {
        // Fetch class information based on schoolCode
        const fetchClassInfo = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
                const classInfoData = response.data?.classInfo;
                setClassInfo(classInfoData)
                if (classInfoData) {
                    const classNames = classInfoData.map((element) => element?.name);
                    // setClassInfo(classInfoData?.classInfo)
                    setAllClasses(classNames);
                    setClassNameElement(classInfoData.filter(everyClass => everyClass?.name === className));
                    if (className) {
                        console.log(classNameElement)
                    }
                }

            } catch (error) {
                console.error('Error fetching classInfo:', error);
            }
        };


        fetchClassInfo();
    }, [currentSchoolCode]);


    const handleAddSubject = (day) => {
        const newRoutine = { ...routine };
        newRoutine[day].push({ subject, time });
        setRoutine(newRoutine);
        // Clear input fields
        setSubject('');
        setTime('');
    };

    const handleSaveRoutine = async () => {
        // You can save the routine data here
        const savedRoutine = {
            year: new Date().getFullYear(),
            schoolName,
            schoolCode: currentSchoolCode,
            className: className, // Assuming you want to store the class name
            sectionName: sectionName,
            shiftName: shiftName,
            routine: routine, // Assuming you want to store the class routine
        };
        const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/classRoutine/add', savedRoutine);
        if (response.status === 201) {
            toast.success("class routine added successfully")
        }
        else {
            toast.error("class routine added failed")
        }
        console.log('Saved Routine:', savedRoutine);

        // Clear input fields
        setClassName('');
        setSectionName('');
        setShiftName('');
        setRoutine({
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        });
    };

    const handleCancelRoutine = () => {
        // Clear input fields
        setClassName('');
        setSectionName('');
        setShiftName('');
        setRoutine({
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        });
    };

    const handleToSelectClassName = (e) => {
        classInfo?.map(info => {
            if (info.name === className) {
                setSections(info.sections);
                setSectionElement(info);
            }
        })


    }

    const handleToShiftName = (e) => {
        className && sectionName && (sectionElement?.sections)?.map(info => {
            if (info.name === sectionName) {
                setShifts(info.shifts);
                setShiftElement(info);
            }
        })

    }

    return (
        <div className="text-white mt-5">
            <h1 className="text-green-400 font-bold text-3xl">{schoolName}</h1>
            <h1 className="text-yellow-400 font-semibold text-2xl mb-10">Generate Class Routine</h1>

            <div className="flex justify-center items-center mb-3">
                <label htmlFor="about" className="block font-semibold text-lg mr-2 text-white">
                    ClassName:
                </label>
                <select
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-1/3 border border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Please Select ClassName</option>
                    {allClasses && allClasses.map((classItem, index) => (
                        <option key={index} value={classItem}>
                            {classItem}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center items-center mb-3">
                <label htmlFor="about" className="block font-semibold text-lg mr-9 text-white">
                    Section:
                </label>
                <select
                    id="className"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    onClick={handleToSelectClassName}
                    className="w-1/3 border border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Please Select Section</option>
                    {className && (sections?.map((sectionItem, index) => (
                        <option key={index} value={sectionItem?.name}>
                            {sectionItem?.name}
                        </option>
                    )))}
                </select>
            </div>
            <div className="flex justify-center items-center mb-10">
                <label htmlFor="about" className="block font-semibold text-lg mr-14 text-white">
                    Shift:
                </label>
                <select
                    id="className"
                    value={shiftName}
                    onChange={(e) => setShiftName(e.target.value)}
                    onClick={handleToShiftName}
                    className="w-1/3 border border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Please Select Shift</option>
                    {className && sectionName && shifts.map((shiftItem, index) => (
                        <option key={index} value={shiftItem}>
                            {shiftItem}
                        </option>
                    ))}
                </select>
            </div>



            {Object.entries(routine).map(([day, subjects]) => (
                <div key={day} className="mb-4">
                    <h3 className="font-semibold text-lg text-lime-400">{day}</h3>
                    {subjects.map((subject, index) => (
                        <div key={index}>
                            Subject: {subject.subject}, Time: {subject.time}
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            placeholder="Subject Name"
                            className="text-black py-2 pl-2"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Time"
                            className="text-black py-2 pl-2"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <button className="bg-blue-400 px-4 py-2 font-semibold rounded-lg ml-5" onClick={() => handleAddSubject(day)}>Add Subject</button>
                    </div>
                </div>
            ))}

            <button className="bg-green-400 px-2 py-1 rounded-lg ml-5 mt-5 mb-10" onClick={handleSaveRoutine}>Save Routine</button>
            <button className="bg-yellow-400 px-2 py-1 rounded-lg ml-5 mt-5 mb-10" onClick={handleCancelRoutine}>Cancel</button>
        </div>
    );
};

export default GenerateClassRoutine;
