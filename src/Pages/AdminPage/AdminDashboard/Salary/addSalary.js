import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";

function AddSalary() {
    const [staffs, setStaffs] = useState([]);
    const [staffName, setStaffName] = useState("");
    const [staffEmail, setStaffEmail] = useState("");
    const [staffId, setStaffId] = useState("");
    const [designation, setDesignation] = useState("");
    const [staffSalaryList, setStaffSalaryList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { currentSchoolCode } = useContext(AuthContext);


    const filteredStaffSalaryList = staffSalaryList.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        const fetchStaffSalary = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/staffSalary/${currentSchoolCode}`);
                const staffSalaryData = response.data; // Assuming the API response provides the salary data
                setStaffSalaryList(staffSalaryData);
                // Do something with the staffSalaryData, such as updating state
            } catch (error) {
                console.error('Error fetching staff salary:', error);
            }
        };

        fetchStaffSalary();
    }, [currentSchoolCode]);


    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/staffs/${currentSchoolCode}`);
                setStaffs(response.data);
            } catch (error) {
                console.error('Error fetching staffs:', error);
            }
        };

        fetchStaffs();
    }, [currentSchoolCode]);

    const handleToSelectStaff = (staff) => {
        setStaffName(staff.name);
        setStaffEmail(staff.email);
        setStaffId(staff.teacherId);
        setDesignation(staff.designation);
    }

    const handleAddSalary = async (e) => {
        e.preventDefault();

        if (!staffName || !staffEmail || !staffId || !designation) {
            toast.error("Please fill in all staff details.");
            return;
        }

        const newStaff = {
            name: staffName,
            schoolCode: currentSchoolCode,
            staffEmail: staffEmail,
            staffId: staffId,
            designation: designation,
            basicSalary: newTeacher.basicSalary || 0,
            rent: newTeacher.rent || 0,
            medicalAllowance: newTeacher.medicalAllowance || 0,
            others: newTeacher.others || 0,
            totalSalary: (newTeacher.basicSalary || 0) + (newTeacher.rent || 0) + (newTeacher.medicalAllowance || 0) + (newTeacher.others || 0)
        };


        try {
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/staffSalary', newStaff);
            const totalSalary = newStaff.basicSalary + newStaff.rent + newStaff.medicalAllowance + newStaff.others;
            newStaff.totalSalary = totalSalary;

            setStaffSalaryList([...staffSalaryList, newStaff]);

            setStaffName("");
            setStaffEmail("");
            setStaffId("");
            setDesignation("");

            toast.success("Salary status added successfully");
            // Reset newTeacher and other states
        } catch (error) {
            console.error('Error adding staff:', error);
            toast.error('Error adding staff:', error);
        }


    };

    const [newTeacher, setNewTeacher] = useState({
        basicSalary: 0,
        rent: 0,
        medicalAllowance: 0,
        others: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: name === "basicSalary" || name === "rent" || name === "medicalAllowance" || name === "others" ? parseInt(value) : value
        }));
    };
    const handleToDelete = async (id) => {
        try {
            await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/staffSalary/delete/${id}`);
            const updatedList = staffSalaryList.filter(staff => staff._id !== id);
            setStaffSalaryList(updatedList);
            toast.success("Salary status deleted successfully");
        } catch (error) {
            console.error('Error deleting salary status:', error);
            toast.error("An error occurred while deleting salary status");
        }
    };



    return (
        <div className="container my-5 mx-3">
            <h1 className="text-white text-3xl font-bold mt-10 mb-5">Staff Salary Input field</h1>
            <form onSubmit={handleAddSalary} className="mx-8 mt-10 border-4">
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <select
                            className="w-full px-2 py-1"
                            id="name"
                            name="name"
                            value={staffName}

                            onChange={handleInputChange}
                        >
                            <option value="">Select a name</option>
                            {staffs.map((staff, index) => (
                                <option key={index} onClick={() => handleToSelectStaff(staff)} value={staff.name}>
                                    {staff.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-2 py-1"
                            id="email"
                            name="email"
                            value={staffEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="id">
                            Teacher ID
                        </label>
                        <input
                            type="text"
                            className="w-full px-2 py-1"
                            id="id"
                            name="id"
                            value={staffId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="designation">
                            Designation
                        </label>
                        <input
                            type="text"
                            className="w-full px-2 py-1"
                            id="designation"
                            name="designation"
                            value={designation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="basicSalary">
                            Basic Salary
                        </label>
                        <input
                            type="number"
                            className="w-full px-2 py-1"
                            id="basicSalary"
                            name="basicSalary"
                            value={newTeacher.basicSalary}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="rent">
                            Rent
                        </label>
                        <input
                            type="number"
                            className="w-full px-2 py-1"
                            id="rent"
                            name="rent"
                            value={newTeacher.rent}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="medicalAllowance">
                            Medical Allowance
                        </label>
                        <input
                            type="number"
                            className="w-full px-2 py-1"
                            id="medicalAllowance"
                            name="medicalAllowance"
                            value={newTeacher.medicalAllowance}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-bold mb-2" htmlFor="medicalAllowance">
                            Others
                        </label>
                        <input
                            type="number"
                            className="w-full px-2 py-1"
                            id="others"
                            name="others"
                            value={newTeacher?.others}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2 mx-8">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline mt-10 mb-10"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <div className="mt-20 mb-10 mx-5">
                <h1 className="text-white text-3xl font-bold mt-10 mb-5">All Staff Salary Status</h1>
                <div className="mb-4 w-7/12 mx-auto">
                    <input
                        type="text"
                        className="w-full px-2 py-1"
                        placeholder="Search by name, staff ID, or designation"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className="table-auto w-full text-white">
                    <thead>
                        <tr className=" bg-amber-300 text-black">
                            <th className="px-4 py-2">Teacher Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Staff ID</th>
                            <th className="px-4 py-2">Designation</th>
                            <th className="px-4 py-2">Basic Salary</th>
                            <th className="px-4 py-2">Rent</th>
                            <th className="px-4 py-2">Medical Allowance</th>
                            <th className="px-4 py-2">Others</th>
                            <th className="px-4 py-2">Total Salary</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaffSalaryList.map((staff, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{staff.name}</td>
                                <td className="border px-4 py-2">{staff.staffEmail}</td>
                                <td className="border px-4 py-2">{staff.staffId}</td>
                                <td className="border px-4 py-2">{staff.designation}</td>
                                <td className="border px-4 py-2">{staff.basicSalary}</td>
                                <td className="border px-4 py-2">{staff.rent}</td>
                                <td className="border px-4 py-2">{staff.medicalAllowance}</td>
                                <td className="border px-4 py-2">{staff?.others}</td>
                                <td className="border px-4 py-2">{staff.totalSalary}</td>
                                <td className="border px-4 py-2 hover:cursor-pointer" onClick={() => handleToDelete(staff?._id)} >delete</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-100 text-black">
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2 font-bold">Total:</td>
                            <td className="border px-4 py-2 font-bold">
                                {staffSalaryList.reduce((total, teacher) => total + Number(teacher.totalSalary), 0)}
                            </td>
                            <td className="border px-4 py-2 font-bold"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default AddSalary;


