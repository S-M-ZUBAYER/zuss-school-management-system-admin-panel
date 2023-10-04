// import React, { useContext, useState, useRef } from 'react';
// import { AuthContext } from '../../../AuthProvider/AuthProvider';
// import html2canvas from 'html2canvas';
// import html2pdf from "html2pdf.js";
// import { saveAs } from 'file-saver';

// const AddResultCalculation = () => {

//     const [inputValues, setInputValues] = useState([]);

//     const students = [
//         {
//             "id": 123,
//             "name": "John Doe"
//         },
//         {
//             "id": 456,
//             "name": "Jane Smith"
//         },
//         {
//             "id": 34789,
//             "name": "Sabit Banani"
//         },
//         {
//             "id": 78339,
//             "name": "S M Zubayer"
//         },
//         {
//             "id": 78933,
//             "name": "Abu Sayed"
//         },
//         {
//             "id": 3433,
//             "name": "Abu Jor"
//         },
//     ]

//     const { schoolName } = useContext(AuthContext);

//     function handleCloneClick() {
//         const node = document.getElementById("original-div")
//         const clone = node.cloneNode(true);
//         const targetDiv = document.getElementById("target-div")
//         targetDiv.appendChild(clone)
//     }

//     const divRef = useRef(null);

//     function handleDownloadClick() {
//         const addBtn = document.getElementById("AddBtn");
//         addBtn.classList.add("hidden")
//         html2canvas(divRef.current).then(canvas => {
//             canvas.toBlob(blob => {
//                 saveAs(blob, 'div.png');
//             });
//         });
//         addBtn.classList.remove("hidden")
//     }

//     function generatePDF(divId) {
//         const btnElement = document.getElementById("btnId");
//         const closeElement = document.getElementById("AddBtn");
//         btnElement.classList.add("hidden")
//         closeElement.classList.add("hidden")
//         const element = document.getElementById(divId);

//         const opt = {
//             margin: 0.5,
//             filename: "result.pdf",
//             image: { type: "jpeg", quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//         };
//         html2pdf().set(opt).from(element).save();

//     }


//     const handleToChange = (e) => {
//         const { className, value } = e.target;
//         const inputs = document?.querySelectorAll(`.${className}`);
//         const values = Array?.from(inputs)?.map((input) => input.value);
//         setInputValues(values);
//         console.log(value)
//     }

//     const handleToCalculate = () => {

//     }


//     return (
//         <div>
//             <button className="bg-red-300 py-1 px-3 rounded-lg ml-10" id="btnId" onClick={() => generatePDF("resultSheet")}>Download PDF</button>
//             <div ref={divRef} className=" m-4 bg-gradient-to-l from-blue-900 via-slate-900 to-black ">
//                 <div className="">
//                     <h1 className=" text-xl font-bold text-lime-200 mt-2">{schoolName}</h1>
//                     <h2 className=" text-xl font-bold text-lime-400 mt-1">Add & Result Calculation</h2>
//                     <div id='resultSheet' className="bg-black">


//                         <div className=" mt-1">
//                             <p className="text-lg font-semibold text-yellow-200">Section:
//                                 <input className="w-32 bg-inherit"></input>
//                             </p>
//                             <p className="text-lg font-semibold text-yellow-200">Class:
//                                 <input className="w-16 bg-inherit"></input>
//                             </p>
//                         </div>
//                         <div className="flex justify-center ">
//                             <div id="target-div" className="mt-5 flex justify-start items-center">
//                                 <div className="w-32 text-white">
//                                     <p className="w-full h-14 border-2 px-2 py-2">Student ID</p>
//                                     {
//                                         students.map((element, index) => <p key={index} className="w-full h-14 border-2 px-2 py-2">{element.id}</p>
//                                         )
//                                     }

//                                 </div>
//                                 <div className="w-56 text-white">
//                                     <p className="w-full h-14 border-2 px-2 py-2">Student Name</p>
//                                     {
//                                         students.map((element, index) => <p key={index} className="w-full h-14 border-2 px-2 py-2">{element.name}</p>
//                                         )
//                                     }

//                                 </div>
//                                 <div id="original-div" className="text-white w-16 text-sm font-semibold">
//                                     <div className="w-full border-2 h-14 border-1 flex justify-center items-center">
//                                         <textarea className=" bg-inherit text-center w-full h-full resize-none" placeholder="Subject Name"></textarea>
//                                     </div>
//                                     {
//                                         students.map((element, index) => <div className="w-full border-2 h-14 border-1 flex justify-center items-center text-black bg-sky-300 ">
//                                             <textarea onClick={handleToChange} className={`bg-inherit text-center w-full h-full resize-none ${element?.id}`} placeholder="Mark"></textarea>
//                                         </div>
//                                         )
//                                     }



//                                 </div>
//                             </div>

//                             <button id='AddBtn' className="bg-emerald-400 w-6 h-6 rounded-full text-xl font-bold flex justify-center items-center" onClick={handleCloneClick}>+</button>
//                             <div className="w-16 mt-5  text-white">
//                                 <p className="w-full h-14 border-2 px-2 py-2">Total</p>
//                                 {
//                                     students.map((element, index) => <p key={index} className="w-full h-14 bg-teal-300 text-black border-2 px-2 py-2">00</p>
//                                     )
//                                 }

//                             </div>
//                             <div className="w-16 mt-5 text-white">
//                                 <p className="w-full h-14 border-2 px-2 py-2">Grade</p>
//                                 {
//                                     students.map((element, index) => <p key={index} className="w-full h-14 bg-lime-300 text-black border-2 px-2 py-2">None</p>
//                                     )
//                                 }

//                             </div>


//                             <button onClick={handleToCalculate} className="border-2 py-1 px-4 bg-lime-100">Calculate</button>
//                         </div>

//                     </div>



//                 </div>
//             </div>
//         </div >
//     );
// };

// export default AddResultCalculation;


// import React, { useState } from 'react';

// const AddResultCalculation = () => {
//     const [rollNo, setRollNo] = useState('');
//     const [name, setName] = useState('');
//     const [className, setClassName] = useState('Class 1');
//     const [subjectName, setSubjectName] = useState('');
//     const [result, setResult] = useState('');
//     const [students, setStudents] = useState([]);
//     const [totalResult, setTotalResult] = useState(0);
//     const [avgResult, setAvgResult] = useState(0);

//     const addResult = () => {
//         const existingStudent = students.find(student => student.rollNo === rollNo && student.className === className);

//         if (existingStudent) {
//             existingStudent.subjects.push({ subjectName, result });
//         } else {
//             const newStudent = {
//                 rollNo,
//                 name,
//                 className,
//                 subjects: [{ subjectName, result }],
//             };
//             setStudents([...students, newStudent]);
//         }

//         setRollNo('');
//         setName('');
//         setClassName('Class 1');
//         setSubjectName('');
//         setResult('');
//     };

//     const calculateResults = () => {
//         students.forEach(student => {
//             let totalResult = 0;
//             student.subjects.forEach(subject => {
//                 totalResult += parseInt(subject.result);
//             });
//             student.totalResult = totalResult;
//             setTotalResult(totalResult)
//             student.averageResult = totalResult / student.subjects.length;
//             setAvgResult(student.averageResult)
//         });
//     };
//     console.log(students)

//     return (
//         <div className="text-white text-lg">
//             <h2 className="text-3xl font-bold mt-20 mb-10 text-amber-200">Add The Result Information</h2>
//             <div cla>
//                 <label>
//                     Roll No:
//                     <input className="text-black ml-2 pl-1" type="text" placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} />
//                 </label>
//             </div>

//             <div className="mt-2">
//                 <label>
//                     Student Name:
//                     <input className="text-black ml-2 pl-1" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//                 </label>
//             </div>

//             <div className="mt-2">
//                 <label>
//                     Class:
//                 </label>
//                 <select className="text-black ml-2 pl-1" value={className} onChange={e => setClassName(e.target.value)}>
//                     {Array.from({ length: 12 }, (_, index) => (
//                         <option key={index} value={`Class ${index + 1}`}>{`Class ${index + 1}`}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mt-2">
//                 <label>
//                     Subject Name:
//                     <input className="text-black ml-2 pl-1" type="text" placeholder="Subject Name" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
//                 </label>
//             </div>

//             <div className="mt-2">
//                 <label>
//                     Result:
//                     <input className="text-black ml-2 pl-1" type="text" placeholder="Result" value={result} onChange={e => setResult(e.target.value)} />
//                 </label>
//             </div>

//             <button className="px-4 py-1 bg-yellow-300 text-black rounded-lg flex mx-auto my-3" onClick={addResult}>Add</button>
//             <button className="px-4 py-1 bg-lime-300 text-black rounded-md inline" onClick={calculateResults}>Calculate</button>

//             <h2 className="text-3xl font-bold mt-20 mb-8 text-lime-300">Show all Results</h2>
//             {students.map((student, index) => (
//                 <div key={index} className="my-5">
//                     <p>Roll No: {student.rollNo}</p>
//                     <p>Name: {student.name}</p>
//                     <p>Class: {student.className}</p>
//                     <p>Total Result: {student.totalResult}</p>
//                     <p>Average Result: {student.averageResult}</p>
//                     <hr className="mt-5" />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AddResultCalculation;


import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import { green } from '@cloudinary/url-gen/actions/adjust';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import EditTermSub from './EditTermSub';

function AddTermAndSubject() {

    const [term, setTerm] = useState('');
    const [subjects, setSubjects] = useState([]);






    const [className, setClassName] = useState('');
    const [classNameElement, setClassNameElement] = useState({});
    const [sectionElement, setSectionElement] = useState({});
    const [shiftElement, setShiftElement] = useState({});
    const [sectionName, setSectionName] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [allClasses, setAllClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [subject, setSubject] = useState([]);
    const [allTerm, setAllTerm] = useState([]);
    const { currentSchoolCode, schoolName } = useContext(AuthContext);


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

        const fetchTermSub = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/termSubject/${currentSchoolCode}?year=${new Date().getFullYear()}`);
                console.log(response.data);
                setAllTerm(response.data)


            } catch (error) {
                console.error('Error fetching classInfo:', error);
            }
        };



        fetchTermSub();
        fetchClassInfo();
    }, [currentSchoolCode]);




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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'className') {
            setClassName(value);
        } else if (name === 'sectionName') {
            setSectionName(value);
        } else if (name === 'shiftName') {
            setShiftName(value);
        } else if (name === 'term') {
            setTerm(value);
        } else if (name === 'subject') {
            setSubject(value);
        }
    };




    console.log(subject);
    console.log(className, sectionName, shiftName, term, subject);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!className) {
            toast.error("Please select class name.");
            return;
        }

        if (!term || !subject) {
            toast.error("Please enter term and Subject name.");
            return;
        }

        const newSubject = subject;
        setAllSubjects((prevSubs) => {
            // Create a new classFee object and add it to the existing fees
            const newExamSub = [...prevSubs, newSubject];
            return newExamSub;
        });

        // Clear the purpose and amount inputs
        setSubject('');

    };
    console.log(allSubjects)

    const handleAddTermSubCancel = (e) => {
        e.preventDefault();

        setClassName('');
        setSectionName("");
        setShiftName("");
        setAllSubjects([]);
        setTerm("");
        setSubject('')

    };
    const handleAddTermSub = async (e) => {
        e.preventDefault();
        const termInfo = {
            schoolName,
            schoolCode: currentSchoolCode,
            className,
            sectionName,
            shiftName,
            year: new Date().getFullYear(),
            term,
            allSubjects
        };
        try {
            const confirmed = window.confirm('Are you sure you want to upload these Term information?');
            if (confirmed) {

                const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/termSubject', termInfo);

                toast.success("Upload these Term information successfully");
                setAllTerm([...allTerm, termInfo])
                setClassName('');
                setSectionName("");
                setShiftName("");
                setAllSubjects([]);
                setTerm("");
                setSubject('')
            }
        } catch (error) {
            console.error('Failed to upload Term Information:', error);

            // Extract and display the error message
            const errorMessage = error.message || 'An error occurred while uploading Term Information.';
            toast.error(errorMessage);
        }
    };


    const handleToDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this term?');

        if (confirmed) {
            axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/termSubject/${id}`)
                .then((response) => {
                    if (response.data) {
                        setAllTerm(allTerm.filter(term => term?._id !== id));
                        toast.success("Delete this term Successfully")
                    } else {
                        console.error('Deletion was not successful:', response.data.message);
                        toast.error('Deletion was not successful:', response.data.message)
                    }
                })
                .catch((error) => {
                    console.error('Error while deleting:', error);
                    toast.error('Error while deleting:', error)
                });
        }
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState({});

    // Function to open the edit modal
    const handleToModalOpen = (element) => {
        setIsEditModalOpen(true);
        setSelectedElement(element)
    };

    // Function to close the edit modal
    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="text-white">
            <h1 className="text-orange-300 text-3xl font-bold my-5">Add Term&Subject Name</h1>
            <form className=" mb-20" >

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
                <div className="flex justify-center items-center mb-3">
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


                <div className='my-2'>
                    <label className="text-lg font-semibold">
                        Term Name:
                        <input type="text" className="text-black py-2 rounded ml-4 w-1/3 pl-1" name="term" value={term} onChange={handleInputChange} />
                    </label>
                </div>
                <div className='my-3 relative'>
                    <label className="text-lg font-semibold">
                        Subject Name:
                        <input type="text" className="text-black py-2 rounded ml-4 w-1/3 pl-1" name="subject" value={subject} onChange={handleInputChange} />
                        <button onClick={handleSubmit} className="ml-20 absolute right-50 bg-green-400 px-6 rounded py-1">add</button>
                    </label>

                </div>
                <button type="submit" onClick={handleAddTermSubCancel} className="bg-yellow-400 py-1 px-5 mr-4 text-black rounded-md mt-5 text-lg font-semibold">Cancel</button>
                <button type="submit" onClick={handleAddTermSub} className="bg-lime-200 py-1 px-5 text-black rounded-md mt-5 text-lg font-semibold">Add Term Info</button>
            </form>
            {/* <div className="mb-10">
                {
                    allSubjects.map(sub => {
                        return <div className="text-lg">
                            <label>{sub?.subject}: </label>
                        </div>
                    })
                }
            </div> */}
            <div className="mt-4">
                <h4 className="text-lg underline font-semibold mb-2 text-lime-500">Exam Term: {term}</h4>
                <ul>
                    {allSubjects.map((sub, subIndex) => (
                        <li key={subIndex}>
                            <span className="font-semibold text-green-400">Subject: </span> {sub}
                        </li>
                    ))}
                </ul>
            </div>

            {allTerm.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mt-8 text-green-400 underline">Exam Term&Subject List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-10">
                        {allTerm.map((element, index) => (
                            <div key={index} className="bg-gradient-to-br from-yellow-800 via-blue-800 to-green-800 border border-gray-300 rounded-lg p-4 m-4 shadow-md relative">

                                <label htmlFor="my_modal_6" onClick={() => handleToModalOpen(element)} className=" absolute top-2 right-8 text-amber-300 cursor-pointer">
                                    <FiEdit></FiEdit>
                                </label>

                                <btn onClick={() => handleToDelete(element?._id)} className="absolute top-2 right-1 text-xl text-red-500 cursor-pointer "><MdDeleteSweep></MdDeleteSweep></btn>

                                <h3 className="text-xl font-bold mb-4 text-amber-300">{element.schoolName}</h3>
                                <h3 className="text-lg font-semibold mb-2">{element.className}</h3>
                                <div className="flex items-center justify-evenly mb-3">
                                    <p><span className="font-semibold">Section:</span> {element.sectionName}</p>
                                    <p><span className="font-semibold">Shift:</span> {element.shiftName}</p>
                                </div>


                                {/* Display purposes and amounts */}
                                <div className="mt-4">
                                    <h4 className="text-lg underline font-semibold mb-2 text-lime-500">Exam Term: {element.term}</h4>
                                    <ul>
                                        {element.allSubjects.map((sub, subIndex) => (
                                            <li key={subIndex}>
                                                <span className="font-semibold text-green-400">Subject: </span> {sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <EditTermSub
                    element={selectedElement}
                    closeModal={handleCloseModal}
                    isEditModalOpen={isEditModalOpen}
                // Pass any necessary functions or props for editing here
                />
            )}
        </div>
    );
}

export default AddTermAndSubject;



