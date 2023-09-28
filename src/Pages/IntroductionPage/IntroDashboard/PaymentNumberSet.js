import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteSweep } from 'react-icons/md';
import { AuthContext } from '../../../context/UserContext';

const PaymentNumberSet = () => {
    const [numbers, setNumbers] = useState({
        bkash: '',
        nagad: '',
        upay: '',
    });

    const { currentSchoolCode } = useContext(AuthContext);

    useEffect(() => {
        const fetchPaymentNumbers = async () => {
            try {
                // Send a GET request to retrieve payment numbers for the school
                const response = await axios.get(
                    `https://zuss-school-management-system-server-site.vercel.app/api/PaymentNumbers/${currentSchoolCode}`
                );
                setNumbers((response.data[0].numbers[0]));
            } catch (error) {
                console.error(error);
                // Handle the error as needed
            }
        };

        fetchPaymentNumbers();
    }, [currentSchoolCode]);

    const handleAddNumbers = async () => {
        const confirmed = window.confirm('Are you sure you want to add these payment numbers?');

        if (confirmed) {
            try {
                console.log(numbers)
                const response = await axios.patch(
                    `https://zuss-school-management-system-server-site.vercel.app/api/PaymentNumbers/${currentSchoolCode}`,
                    { schoolCode: currentSchoolCode, numbers }
                );
                toast.success('Payment numbers updated successfully');

            } catch (error) {
                console.error(error);
                // Handle the error as needed
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNumbers({
            ...numbers,
            [name]: value,
        });
    };
    console.log(numbers, "numbers")
    return (
        <div className="text-white mt-20">
            <h2 className="text-3xl font-bold my-10 text-green-400">Set Payment Collection Numbers</h2>
            <div className="md:flex justify-between items-center mx-10">
                <div className="mt-3 md:mt-0">
                    <label htmlFor="bkash" className="text-lg text-white mr-2">
                        Bkash Number:
                    </label>
                    <input
                        type="text"
                        id="bkash"
                        name="bkash"
                        value={numbers.bkash}
                        onChange={handleInputChange}
                        placeholder="Enter Bkash Number"
                        className="md:w-[200px] text-black px-2"
                    />
                </div>
                <div className="mt-3 md:mt-0">
                    <label htmlFor="nagad" className="text-lg text-white mr-2">
                        Nagad Number:
                    </label>
                    <input
                        type="text"
                        id="nagad"
                        name="nagad"
                        value={numbers.nagad}
                        onChange={handleInputChange}
                        placeholder="Enter Nagad Number"
                        className="md:w-[200px] text-black px-2"
                    />
                </div>
                <div className="mt-3 md:mt-0">
                    <label htmlFor="upay" className="text-lg text-white mr-2">
                        Upay Number:
                    </label>
                    <input
                        type="text"
                        id="upay"
                        name="upay"
                        value={numbers.upay}
                        onChange={handleInputChange}
                        placeholder="Enter Upay Number"
                        className="md:w-[200px] text-black px-2"
                    />
                </div>
                <button
                    className="mt-3 md:mt-0 text-lg bg-lime-300 px-5 py-1 rounded-lg ml-5 text-black"
                    onClick={handleAddNumbers}
                >
                    Update
                </button>
            </div>
            <h2 className="mt-10 mb-5 text-2xl font-semibold underline">Current Payment Numbers</h2>
            {
                numbers && Object.keys(numbers).length !== 0 && <>
                    <p className="pt-2  text-lg">Bkash: {numbers.bkash}</p>
                    <p className="pt-2 text-lg">Nagad: {numbers.nagad}</p>
                    <p className="pt-2 text-lg">Upay: {numbers.upay}</p>

                </>
            }

        </div>
    );
};

export default PaymentNumberSet;
