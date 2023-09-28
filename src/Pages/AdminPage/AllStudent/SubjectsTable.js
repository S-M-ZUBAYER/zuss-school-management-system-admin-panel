import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SubjectsTable = ({ termData, student }) => {
    // Destructure termData to access term name and allSubjects

    const [termAverage, setTermAverage] = useState(null)
    const [termGrade, setTermGrade] = useState(null)
    const { term, allSubjects } = termData;

    // State to store marks for each subject
    const [subjectMarks, setSubjectMarks] = useState(
        allSubjects.map(() => ({
            theoryMarks: 0,
            mcqMarks: 0,
            practicalMarks: 0,
            outOf: 100,
        }))
    );

    // Function to update marks for a specific subject
    const updateMarks = (subjectIndex, field, value) => {
        setSubjectMarks((prevMarks) => {
            const updatedMarks = [...prevMarks];
            updatedMarks[subjectIndex][field] = parseFloat(value);
            return updatedMarks;
        });
    };

    console.log(subjectMarks, termAverage, termGrade)
    // Function to calculate the total marks for a specific subject
    const calculateTotalMarks = (subjectIndex) => {
        const { theoryMarks, mcqMarks, practicalMarks } = subjectMarks[subjectIndex];
        return theoryMarks + mcqMarks + practicalMarks;
    };

    // Function to calculate the average mark for a specific subject
    const calculateAverageMark = (subjectIndex) => {
        const { outOf } = subjectMarks[subjectIndex];
        const totalMarks = calculateTotalMarks(subjectIndex);
        return ((totalMarks / outOf) * 100).toFixed(2);
    };

    // Function to calculate the grade based on average mark
    const calculateGrade = (averageMark) => {
        if (averageMark >= 80) return 'A+';
        if (averageMark >= 70) return 'A';
        if (averageMark >= 60) return 'A-';
        if (averageMark >= 50) return 'B';
        if (averageMark >= 40) return 'C';
        if (averageMark >= 33) return 'D';
        return 'F';
    };

    // Function to calculate the Term Average and Term Grade
    const calculateTermAverage = () => {
        const totalMarks = subjectMarks.reduce((total, _, subjectIndex) => {
            return total + calculateTotalMarks(subjectIndex);
        }, 0);

        const totalSubjects = subjectMarks.length;
        const termAverage = (totalMarks / totalSubjects).toFixed(2);
        const termGrade = calculateGrade(termAverage);

        // Log the termAverage and termGrade (you can display them as needed)
        console.log('Term Average:', termAverage);
        console.log('Term Grade:', termGrade);
        setTermAverage(termAverage)
        setTermGrade(termGrade)
    };

    const handleToUpdate = () => {
        const confirmed = window.confirm('Have you pressed Calculate and are you sure you want to update this student result status?');
        if (confirmed) {
            const updateResult = {
                studentId: student?.studentId,
                year: student?.year,
                studentName: student?.name,
                email: student?.email,
                className: student?.className,
                sectionName: student?.section,
                shiftName: student?.shift,
                classRoll: student?.classRoll,
                term,
                subjectMarks,
                allSubjects,
                termAverage,
                termGrade
            };

            // Make a PATCH request to update the student's result status
            fetch(`https://zuss-school-management-system-server-site.vercel.app/api/AddUpdateResultRoutes/${student?.studentId}/${student?.year}/${student?.schoolCode}/${term}`, {
                method: 'PATCH', // Use the PATCH HTTP method for updates
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to include authentication headers if required
                },
                body: JSON.stringify(updateResult), // Send the updateResult data as JSON
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update student result status');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle successful response from the server if needed
                    console.log('Update successful:', data);
                    toast.success('Update successful:', data);
                })
                .catch((error) => {
                    // Handle errors, such as network issues or server errors
                    console.error('Error updating student result status:', error);
                    toast.error('Error updating student result status:', error);
                });
        }
    };



    return (
        <div>
            <div className="p-4 border rounded-lg shadow-lg mb-20 mx-20  text-white">
                <h3 className="text-xl font-semibold mb-4">Term: {term}</h3>
                <table className="w-full mb-8">
                    {/* Table headers */}
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Theory Marks</th>
                            <th>MCQ Marks</th>
                            <th>Practical Marks</th>
                            <th>Out Of</th>
                            <th>Total Marks</th>
                            <th>Average Mark</th>
                            <th>Grade</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {allSubjects.map((subject, index) => (
                            <tr className="border" key={index}>
                                <td>{subject}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="text-black"
                                        value={subjectMarks[index].theoryMarks}
                                        onChange={(e) => updateMarks(index, 'theoryMarks', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="text-black"
                                        value={subjectMarks[index].mcqMarks}
                                        onChange={(e) => updateMarks(index, 'mcqMarks', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="text-black"
                                        value={subjectMarks[index].practicalMarks}
                                        onChange={(e) => updateMarks(index, 'practicalMarks', e.target.value)}
                                    />
                                </td>
                                <td>{subjectMarks[index].outOf}</td>
                                <td>{calculateTotalMarks(index)}</td>
                                <td>{calculateAverageMark(index)}</td>
                                <td>{calculateGrade(calculateAverageMark(index))}</td>
                                <td>
                                    <button
                                        className="bg-yellow-200 px-3 py-1 text-black rounded-md"
                                        onClick={calculateTermAverage}
                                    >
                                        Add
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-right">
                    <button
                        className="bg-green-400 px-2 py-1 rounded-lg"
                        onClick={calculateTermAverage}
                    >
                        Calculate
                    </button>

                    <button
                        className="ml-2 bg-amber-200 px-2 py-1 text-black rounded-lg"
                        onClick={handleToUpdate}
                    >
                        Update
                    </button>
                </div>
                <p>Term Average: {termAverage}</p>
                <p>Term Grade: {termGrade}</p>
            </div>
        </div>
    );
};

export default SubjectsTable;
