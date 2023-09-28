import { useState } from "react";

function EditSalary({ salary, onSave, onCancel }) {
    const [editedSalary, setEditedSalary] = useState({ ...salary });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedSalary((prevSalary) => ({
            ...prevSalary,
            [name]: name === "basicSalary" || name === "rent" || name === "medicalAllowance" || name === "others" ? parseInt(value) : value
        }));
    };

    const handleSave = () => {
        onSave(editedSalary);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Salary</h2>
                <form>
                    {/* Render input fields for editing salary */}
                    {/* ... */}
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditSalary