import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import { green } from '@cloudinary/url-gen/actions/adjust';
import axios from 'axios';


function PaymentCollection() {

    const [purpose, setPurpose] = useState('');
    const [amount, setAmount] = useState('');






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
    const [allFees, setAllFees] = useState([]);
    const [allPayment, setAllPayment] = useState([]);
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

        const fetchPayment = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/stdPayment/${currentSchoolCode}?year=${new Date().getFullYear()}`);
                console.log(response.data);
                setAllPayment(response.data)


            } catch (error) {
                console.error('Error fetching payment information:', error);
            }
        };



        fetchPayment();

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
        } else if (name === 'purpose') {
            setPurpose(value);
        } else if (name === 'amount') {
            setAmount(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!className) {
            toast.error("Please select class name, section name, and shift name.");
            return;
        }

        if (!purpose || !amount) {
            toast.error("Please enter purpose and amount.");
            return;
        }

        const newFee = { purpose, amount };
        setAllFees((prevFees) => {
            // Create a new classFee object and add it to the existing fees
            const newClassFee = [...prevFees, newFee];
            return newClassFee;
        });

        // Clear the purpose and amount inputs
        setPurpose('');
        setAmount('');
    };
    console.log(allFees)

    const handleAddPayment = (e) => {
        e.preventDefault();

        // Create the final payment object
        const paymentObject = {
            schoolName,
            schoolCode: currentSchoolCode,
            className,
            sectionName,
            shiftName,
            year: new Date().getFullYear(),
            allFees,
            totalAmount: allFees.reduce((total, fee) => total + parseFloat(fee.amount), 0),
        };


        handleToUpload(paymentObject)

    };

    const handleToUpload = async (paymentObject) => {
        try {
            const confirmed = window.confirm('Are you sure you want to upload these student attendance status?');
            if (confirmed) {
                console.log(paymentObject);
                const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/stdPayment', paymentObject);

                toast.success("Upload the payment status successfully");
                setAllPayment([...allPayment, paymentObject])
                console.log(allPayment);
                setClassName('');
                setSectionName("");
                setShiftName("");
                setAllFees([]);
                setPurpose("");
                setAmount('')
            }
        } catch (error) {
            console.error('Failed to upload student attendances:', error);

            // Extract and display the error message
            const errorMessage = error.message || 'An error occurred while uploading student attendances.';
            toast.error(errorMessage);
        }
    };

    console.log(allPayment)
    return (
        <div className="text-white">
            <h1 className="text-orange-300 text-3xl font-bold my-5">Payment System</h1>
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
                        Purpose:
                        <input type="text" className="text-black py-2 rounded ml-7 w-1/3 pl-1" name="purpose" value={purpose} onChange={handleInputChange} />
                    </label>
                </div>
                <div className='my-2 relative'>
                    <label className="text-lg font-semibold">
                        Amount:
                        <input type="number" className="text-black py-2 rounded ml-7 w-1/3 pl-1" name="amount" value={amount} onChange={handleInputChange} />
                        <button onClick={handleSubmit} className="ml-20 absolute right-50 bg-green-400 px-6 rounded py-1">add</button>
                    </label>

                </div>
                <button type="submit" onClick={handleAddPayment} className="bg-lime-200 py-1 px-5 text-black rounded-md mt-5 text-lg font-semibold">Add Payment</button>
            </form>
            <div className="mb-10">
                {
                    allFees.map(fee => {
                        return <div className="text-lg">
                            <label>{fee?.purpose}: </label>
                            <label>{fee?.amount}</label>
                        </div>
                    })
                }
            </div>

            {allPayment.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mt-8 text-green-400 underline">Payment Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-10">
                        {allPayment.map((paymentObject, index) => (
                            <div key={index} className="bg-gradient-to-br from-yellow-800 via-blue-800 to-green-800 border border-gray-300 rounded-lg p-4 m-4 shadow-md ">
                                <h3 className="text-xl font-bold mb-4 text-amber-300">{paymentObject.schoolName}</h3>
                                <h3 className="text-lg font-semibold mb-2">{paymentObject.className}</h3>
                                <div className="flex items-center justify-evenly mb-3">
                                    <p><span className="font-semibold">Section:</span> {paymentObject.sectionName}</p>
                                    <p><span className="font-semibold">Shift:</span> {paymentObject.shiftName}</p>
                                </div>
                                <p><span className="font-semibold">Total Amount:</span> {paymentObject.totalAmount}</p>

                                {/* Display purposes and amounts */}
                                <div className="mt-4">
                                    <h4 className="text-lg underline font-semibold mb-2 text-lime-500">Purposes and Amounts:</h4>
                                    <ul>
                                        {paymentObject.allFees.map((fee, feeIndex) => (
                                            <li key={feeIndex}>
                                                <span className="font-semibold">{fee.purpose}:</span> {fee.amount}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentCollection;



