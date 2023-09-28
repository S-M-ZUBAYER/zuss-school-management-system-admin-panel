
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../context/UserContext';
import axios from 'axios';

const TermCondition = ({ term, index, onDelete, onEdit }) => {
    return (
        <div className="flex justify-between mb-2">
            <p className="ml-2 mt-2 text-start">{index + 1}. {term}</p>
            <div className="flex">
                <button
                    className="px-2 py-1 text-red-600 font-semibold mr-2"
                    onClick={() => onDelete(index)}
                >
                    Delete
                </button>
                <button
                    className="px-2 py-1 text-blue-600 font-semibold"
                    onClick={() => onEdit(index)}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

const AdmissionForm = () => {
    const [notice, setNotice] = useState('');
    const [term, setTerm] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [feeType, setFeeType] = useState('free');
    const [applicationFee, setApplicationFee] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedTermIndex, setSelectedTermIndex] = useState(null);

    const { schoolName, currentSchoolCode } = useContext(AuthContext);

    const handleAddTerm = () => {
        if (term.trim() !== '') {
            setTermsAndConditions([...termsAndConditions, term]);
            setTerm('');
        }
    };

    const handleDeleteTerm = (index) => {
        setSelectedTermIndex(index);
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedTermIndex !== null) {
            const updatedTerms = termsAndConditions.filter((_, i) => i !== selectedTermIndex);
            setTermsAndConditions(updatedTerms);
            setSelectedTermIndex(null);
            setShowConfirmationModal(false);
        }
    };

    const handleEditTerm = (index) => {
        setSelectedTermIndex(index);
        setTerm(termsAndConditions[index]);
    };

    const handleToAddAdmissionInfo = async () => {
        const admissionInfo = {
            admissionNotice: notice,
            requirement: termsAndConditions,
            feeType: feeType,
            applicationFee: applicationFee,
        };

        try {
            // Check if admission information exists for the particular school code
            const existingInfoResponse = await axios.get(
                `https://zuss-school-management-system-server-site.vercel.app/api/admissionInfo/${currentSchoolCode}`
            );

            if (existingInfoResponse.data.msg === true) {
                // Admission information exists, make a PATCH request to update
                const updateResponse = await axios.patch(
                    `https://zuss-school-management-system-server-site.vercel.app/api/admissionInfo/update/${currentSchoolCode}`,
                    admissionInfo
                );

                console.log(updateResponse);
                toast.success('Admission information updated successfully');
            } else {
                // Admission information does not exist, make a POST request to add new
                const addResponse = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/admissionInfo', {
                    schoolName,
                    schoolCode: currentSchoolCode,
                    admissionInfo,
                });

                console.log(addResponse);
                toast.success('Admission information added successfully');
            }
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to add/update admission information');
        }
    };
    return (
        <div className="p-4 text-white border-2 rounded-lg mt-10 mx-12">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">Admission Prospective</h1>

            <div className="mb-4">
                <label className="block mb-2 text-lg font-semibold">Admission Declaration Notice:</label>
                <textarea
                    className="w-full text-black px-4 py-2 border rounded-md"
                    rows="5"
                    value={notice}
                    onChange={(e) => setNotice(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 mt-8 text-lg font-semibold">Term and Condition:</label>
                <div className="flex">
                    <textarea
                        className="flex-1 text-black px-4 py-2 border rounded-l-md"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 font-semibold bg-green-500 text-white rounded-r-md"
                        onClick={handleAddTerm}
                    >
                        Add Term
                    </button>
                </div>
            </div>

            <div className="mb-4">
                {termsAndConditions.map((item, index) => (
                    <TermCondition
                        key={index}
                        term={item}
                        index={index}
                        onDelete={handleDeleteTerm}
                        onEdit={handleEditTerm}
                    />
                ))}
            </div>

            <div className="mb-4">
                <label className="block mt-8 mb-2 text-lg font-semibold">Fees Type:</label>
                <div className="flex items-center text-lg">
                    <label className="mr-8 ml-2">
                        <input
                            type="radio"
                            value="free"
                            checked={feeType === 'free'}
                            onChange={() => setFeeType('free')}
                        />
                        <span> </span>Free
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="applicationFee"
                            checked={feeType === 'applicationFee'}
                            onChange={() => setFeeType('applicationFee')}
                        />
                        <span> </span> Application Fee
                    </label>
                </div>
            </div>

            {feeType === 'applicationFee' && (
                <div className="mb-4">
                    <label className="block mb-2">Application Fee:</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-md text-black"
                        value={applicationFee}
                        onChange={(e) => setApplicationFee(e.target.value)}
                    />
                </div>
            )}

            <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold my-5" onClick={handleToAddAdmissionInfo}>
                Publish
            </button>

            {showConfirmationModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p>Are you sure you want to delete this term and condition?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold mr-2"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md font-semibold"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdmissionForm;
