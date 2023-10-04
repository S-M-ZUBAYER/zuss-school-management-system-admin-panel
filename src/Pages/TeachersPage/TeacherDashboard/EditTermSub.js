import React, { useState } from 'react';
import toast from 'react-hot-toast';

const EditTermSub = ({ element, closeModal }) => {
    const [updatedElement, setUpdatedElement] = useState(element); // Initialize with the element data
    console.log(element)
    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Create a copy of the updatedElement object to avoid mutating state directly
        const updated = { ...updatedElement };

        // Update the specific field if it's 'term' or in the 'allSubjects' array
        if (name === 'term') {
            updated.term = value;
        } else if (name.startsWith('allSubjects')) {
            const [index] = name.match(/\d+/g);
            updated.allSubjects[index] = value;
        }

        // Update the state
        setUpdatedElement(updated);
    };

    // Handle the update button click
    const handleUpdate = () => {
        const updateInfo = { term: updatedElement?.term, allSubjects: updatedElement?.allSubjects }
        // Send a PUT request to update the element data on the server
        // Replace 'api/updateElement/' with your actual API endpoint
        fetch(`https://zuss-school-management-system-server-site.vercel.app/api/termSubject/${updatedElement._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    // Close the modal
                    console.log(data)
                    closeModal();
                    toast.success("update successfully")
                } else {
                    // Handle the case where the update was not successful
                    console.error('Update was not successful:', data.message);
                    toast.error('Update was not successful:', data.message);
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the API request
                console.error('Error while updating:', error);
                toast.error('Error while updating:', error);
            });
    };

    return (
        <div className="text-black">
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{updatedElement?.schoolName}</h3>
                    <p className="py-4">{updatedElement?.term}</p>
                    {/* Add input fields for editing */}
                    <div className="form-group">
                        <label>Term:</label>
                        <input
                            type="text"
                            name="term"
                            className="ml-2 border-2 my-1"
                            value={updatedElement.term}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <h2 className="my-2 font-bold">All Subjects</h2>
                        {updatedElement.allSubjects.map((subject, index) => (
                            <input
                                key={index}
                                type="text"
                                className="border-2 my-2 mr-2 px-1"
                                name={`allSubjects[${index}]`}
                                value={subject}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                    {/* End of input fields */}
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close</label>
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTermSub;

