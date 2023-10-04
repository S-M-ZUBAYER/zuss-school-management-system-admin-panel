import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditPayment = ({ element, closeModal, isEditModalOpen }) => {
    const [updatedPayment, setUpdatedPayment] = useState({}); // Initialize with the payment data

    useEffect(() => {
        setUpdatedPayment(element);
    }, [element]);

    // Handle input changes for allFees array elements' purpose and amount
    const handleFeesInputChange = (event, index, field) => {
        const { value } = event.target;

        // Create a copy of the updatedPayment object to avoid mutating state directly
        const updated = { ...updatedPayment };

        // Check if the allFees array exists in updatedPayment, if not, create it
        if (!updated.allFees) {
            // updated.totalAmount = value;
            updated.allFees = [...element.allFees];
        }

        // Update the specific field within the allFees array
        if (field === "totalAmount") {
            updated.totalAmount = value
        }
        else {

            updated.allFees[index][field] = value;
        }

        // Update the state
        setUpdatedPayment(updated);

        console.log(updated, "updated payment")
    };



    // Handle the update button click
    const handleUpdate = () => {
        // Send a PUT request to update the payment data on the server
        axios.put(`https://zuss-school-management-system-server-site.vercel.app/api/stdPayment/${element._id}`, updatedPayment)
            .then((response) => {
                // Check if the update was successful in the response data
                if (response.data) {
                    // Close the modal
                    closeModal();
                    toast.success("Payment Update Successfully")
                } else {
                    // Handle the case where the API request was successful but the update was not
                    // You might want to show an error message to the user
                    console.error('Update was not successful:', response.data.message);
                    toast.error('Update was not successful:', response.data.message);
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
                    <h3 className="font-bold text-lg">{element?.schoolName}</h3>
                    <p className="py-4">{element?.shiftName}</p>
                    {/* Add input fields for editing */}
                    <div className="form-group">
                        <label>Class Name</label>
                        <input
                            type="text"
                            name="className"
                            value={updatedPayment.className}
                            readOnly // Make this field read-only
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Amount</label>
                        <input
                            type="text"
                            name="totalAmount"
                            value={updatedPayment.totalAmount}
                            onChange={(event) => handleFeesInputChange(event, null, "totalAmount")} // Allow editing for this field
                        />
                    </div>
                    {/* Add input fields for other payment properties */}
                    <div className="form-group">
                        {element &&
                            element.allFees.map((fee, index) => (
                                <div key={index}>
                                    <label>Purpose</label>
                                    <input
                                        type="text"
                                        name={`allFees[${index}].purpose`}
                                        value={fee.purpose}
                                        onChange={(event) => handleFeesInputChange(event, index, "purpose")} // Allow editing for purpose
                                    />
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        name={`allFees[${index}].amount`}
                                        value={fee.amount}
                                        onChange={(event) => handleFeesInputChange(event, index, "amount")} // Allow editing for amount
                                    />
                                </div>
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

export default EditPayment;
