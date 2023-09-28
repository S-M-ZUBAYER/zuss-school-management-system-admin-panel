import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import EachStaff from '../../IntroductionPage/IntroDashboard/EachStaff';
import StudentInfoTable from './StudentInfoTable';
import { toast } from 'react-hot-toast';
import DisplaySpinner from '../../Shared/Spinners/DisplaySpinner';

const AllStudent = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [className, setClassName] = useState('');
    const [sectionElement, setSectionElement] = useState({});
    const [sectionName, setSectionName] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [allClasses, setAllClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)


    const { currentSchoolCode } = useContext(AuthContext);


    function getAllYears(startYear) {
        const currentYear = new Date().getFullYear();
        const years = [];

        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }

        return years;
    }
    const years = getAllYears(2020);


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/students/${currentSchoolCode}`, {
                    params: { year } // Send date as a query parameter
                });
                setAllStudents(response.data, "allldskfjjds");
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [currentSchoolCode, year]);


    const handleNameSearch = (event) => {
        setName(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this student?');
            if (confirmed) {
                await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/students/${id}`);
                setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
                alert('Student deleted successfully!');
            }
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    };

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
    };

    const handleToDelete = async (id) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this student?');
            if (confirmed) {
                // Send a DELETE request to the backend
                await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/students/${id}`);

                // Remove the student from the current list on the frontend
                setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
                setAllStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));

                // Alert user about successful deletion
                toast.success('Student deleted successfully!');
            }
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    };

    const handleUpdateStudent = async (e) => {
        e.preventDefault();

        // Create a formData object with updated values,
        const formData = {
            name: e.target.elements.name.value,
            schoolName: e.target.elements.schoolName.value,
            schoolCode: selectedStudent.schoolCode,
            classRoll: e.target.elements.classRoll.value,
            className: e.target.elements.className.value,
            section: e.target.elements.section.value,
            shift: e.target.elements.shift.value,
            designation: e.target.elements.designation.value,
            phone: e.target.elements.phone.value,
            email: e.target.elements.email.value,
            district: e.target.elements.district.value,
            division: e.target.elements.division.value,
            address: e.target.elements.address.value,
        };

        try {
            // Send the update request to the server
            await axios.put(`https://zuss-school-management-system-server-site.vercel.app/api/students/update/${selectedStudent._id}`, formData);

            // Update the student in the frontend students array
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === selectedStudent._id ? { ...student, ...formData } : student
                )
            );

            // Update the student in the frontend allStudents array
            setAllStudents((prevAllStudents) =>
                prevAllStudents.map((student) =>
                    student._id === selectedStudent._id ? { ...student, ...formData } : student
                )
            );

            // Close the modal
            handleCloseModal();

            // Show a success message
            toast.success('Student updated successfully!');
        } catch (error) {
            console.error('Failed to update student:', error);
            // Show an error message
            toast.error('Failed to update student.');
        }
    };



    const groupStudentsByClass = () => {
        const groupedStudents = {};
        students.forEach((student) => {
            const key = `${student.className}-${student.section}-${student.shift}`;
            if (groupedStudents[key]) {
                groupedStudents[key].push(student);
            } else {
                groupedStudents[key] = [student];
            }
        });
        return groupedStudents;
    };

    const renderStudentGroups = () => {
        const groupedStudents = groupStudentsByClass();

        return Object.keys(groupedStudents).map((key) => {
            const studentsInGroup = groupedStudents[key];
            return (
                <div key={key}>
                    <h3>Class: {studentsInGroup[0].className}</h3>
                    <h4>Section: {studentsInGroup[0].section}</h4>
                    <h4>Shift: {studentsInGroup[0].shift}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>School Name</th>
                                <th>Class Roll</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsInGroup
                                .filter((student) => student && student.classRoll && student.classRoll.toString().includes(searchTerm))
                                .map((student) => (
                                    <tr key={student._id}>
                                        <td>{student.name}</td>
                                        <td>{student.schoolName}</td>
                                        <td>{student.classRoll}</td>
                                        <td>
                                            <button onClick={() => handleOpenModal(student)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(student._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                </div>
            );
        });
    };

    useEffect(() => {
        // Fetch class information based on schoolCode
        const fetchClassInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
                const classInfoData = response.data?.classInfo;
                setClassInfo(classInfoData)
                if (classInfoData) {
                    const classNames = classInfoData.map((element) => element?.name);
                    // setClassInfo(classInfoData?.classInfo)
                    setAllClasses(classNames);
                    setLoading(false);
                }

            } catch (error) {
                console.error('Error fetching classInfo:', error);
            }
        };


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
            }
        })

    }

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold text-lime-300 mb-8 mt-10">
                Available Students In {' '}
                <span className="bg-black">
                    <select className="bg-black px-2" value={year} onChange={(e) => setYear(e.target.value)}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </span>
            </h1>
            <div className="flex items-center justify-center mb-5 text-black">
                <select
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="bg-yellow-100 px-3 py-1 rounded-lg mr-3"
                >
                    <option value="">Select a class</option>
                    {allClasses.map((classItem, index) => (
                        <option key={index} value={classItem}>{classItem}</option>
                    ))}
                </select>
                <select
                    id="sectionList"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    onClick={handleToSelectClassName}
                    className="bg-yellow-100 px-3 py-1 rounded-lg mr-3"
                >
                    <option value="">Please Select Section</option>
                    {className && (sections?.map((sectionItem, index) => (
                        <option key={index} value={sectionItem?.name}>
                            {sectionItem?.name}
                        </option>
                    )))}
                </select>
                <select
                    id="shift"
                    onChange={(e) => setShiftName(e.target.value)}
                    onClick={handleToShiftName}
                    className="bg-yellow-100 px-3 py-1 rounded-lg mr-3"
                >
                    <option value="">Please Select Shift</option>
                    {className && sectionName && shifts.map((shiftItem, index) => (
                        <option key={index} value={shiftItem}>
                            {shiftItem}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className="bg-yellow-100 px-3 py-1 rounded-lg"
                    placeholder="Search by name"
                    value={name}
                    onChange={handleNameSearch}
                />
            </div>
            {renderStudentGroups()}
            <Modal className="w-8/12 h-8/12 rounded-lg p-5  bg-white text-black mx-auto mt-12" isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                {selectedStudent && (
                    <div>
                        <h2 className=" text-emerald-500 font-semibold text-2xl text-center">Edit Student Information</h2>
                        <form onSubmit={handleUpdateStudent}>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Name:</label>
                                <input className="border-2 px-2" name='name' type="text" defaultValue={selectedStudent.name} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">School Name:</label>
                                <input className="border-2 px-2" name='schoolName' type="text" defaultValue={selectedStudent.schoolName} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Class Roll:</label>
                                <input className="border-2 px-2" name="classRoll" type="text" defaultValue={selectedStudent.classRoll} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Class Name:</label>
                                <input className="border-2 px-2" name="className" type="text" defaultValue={selectedStudent.className} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Section:</label>
                                <input className="border-2 px-2" name="section" type="text" defaultValue={selectedStudent.section} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Shift:</label>
                                <input className="border-2 px-2" name="shift" type="text" defaultValue={selectedStudent.shift} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Designation:</label>
                                <input className="border-2 px-2" name="designation" type="text" defaultValue={selectedStudent.designation} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Phone:</label>
                                <input className="border-2 px-2" name="phone" type="text" defaultValue={selectedStudent.phone} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">email:</label>
                                <input className="border-2 px-2" name="email" type="text" defaultValue={selectedStudent.email} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Gender:</label>
                                <input className="border-2 px-2" name="gender" type="text" defaultValue={selectedStudent.gender} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Father Name:</label>
                                <input className="border-2 px-2" name="fatherName" type="text" defaultValue={selectedStudent.fatherName} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Mother Name:</label>
                                <input className="border-2 px-2" name="motherName" type="text" defaultValue={selectedStudent.motherName} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">District:</label>
                                <input className="border-2 px-2" name="district" type="text" defaultValue={selectedStudent.district} />
                            </div>
                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Division:</label>
                                <input className="border-2 px-2" name="division" type="text" defaultValue={selectedStudent.division} />
                            </div>

                            <div className="mb-2">
                                <label className=" text-green-600 font-semibold mr-2">Address:</label>
                                <input className="border-2 px-2" name="address" type="text" defaultValue={selectedStudent.address} />
                            </div>
                            <div className="text-end">
                                <button className=" bg-yellow-300 mr-5 px-3 py-1 cursor-pointer" onClick={handleCloseModal}>Cancel</button>
                                <button className="bg-green-500 px-3 py-1 cursor-pointer" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
            <StudentInfoTable
                allStudents={allStudents}
                classInfoData={classInfo}
                handleOpenModal={handleOpenModal}
                handleToDelete={handleToDelete}
                className={className}
                sectionName={sectionName}
                shiftName={shiftName}
                name={name}
            ></StudentInfoTable>


        </div>
    );
};

export default AllStudent;
