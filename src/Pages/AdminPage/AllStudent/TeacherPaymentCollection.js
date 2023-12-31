import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function TeacherPaymentCollection({ student }) {
    // const { currentSchoolCode, user } = useContext(AuthContext);
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [stdPayment, setStdPayment] = useState(null); // Initialize to null instead of {}
    const [allPayment, setAllPayment] = useState([]); // Initialize as an empty array
    const [payFeeStatus, setPayFeeStatus] = useState({}); // Initialize as an empty array
    const [proposalAmount, setProposalAmount] = useState(""); // Initialize as an empty array


    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState({
        selectedPaymentMethod: '', // To store the selected payment method (bKash, Nagad, Upai)
        phoneNumber: '',
        transactionId: '',
    });

    const handlePaymentSelect = (payment) => {
        if (selectedPayments.includes(payment)) {
            setSelectedPayments((prevSelected) => prevSelected.filter((p) => p !== payment));
        } else {
            setSelectedPayments((prevSelected) => [...prevSelected, payment]);
        }
    };

    const currentDate = new Date();

    // Format the date as needed (e.g., "Month Day, Year")
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    function printPaymentReceipt(paymentInfo) {
        // Create a new window for printing
        const printWindow = window.open('', '', 'width=600,height=600');

        // Create a new array to store the status elements that match the selectedPayments
        const selectedStatus = paymentInfo.status.filter((status) =>
            paymentInfo.selectedPayments.includes(status.purpose)
        );

        // Write the content to be printed into the new window
        printWindow.document.write(`
            <html>
            <head>
                <title>Payment Receipt</title>
            </head>
            <body>
            <h2>Payment Receipt</h2>
            <p><strong>Name:</strong> ${paymentInfo.Name}</p>
            <p><strong>Student ID:</strong> ${paymentInfo.studentId}</p>
                <p><strong>Class Name:</strong> ${paymentInfo.ClassName}</p>
                <p><strong>Section Name:</strong> ${paymentInfo.SectionName}</p>
                <p><strong>Shift Name:</strong> ${paymentInfo.ShiftName}</p>
                <p><strong>Class Roll:</strong> ${paymentInfo.ClassRoll}</p>
                <p><strong>Payment Method:</strong> ${paymentInfo.paymentMethod}</p>
                <p><strong>Agent Number:</strong> ${paymentInfo.agentNumber}</p>
                <p><strong>Transaction ID:</strong> ${paymentInfo.transactionId}</p>
                <p><strong>Paid Amount:</strong> ${paymentInfo.PaidAmount}</p>
                <p><strong>Selected Payments:</strong> ${paymentInfo.selectedPayments.join(', ')}</p>
                <h3>Payment Status:</h3>
                <ul>
                    ${selectedStatus.map((status) => `
                        <li>
                            <strong>${status.purpose}:</strong>
                            Amount: ${status.amount}, Paid: ${status.paid ? 'Yes' : 'No'}
                        </li>
                    `).join('')}
                </ul>
                <p><strong>Unpaid Amount:</strong> ${paymentInfo.unpaidAmount}</p>

                <p style="margin-top: 20px;"><strong>Receiver's Signature</p>
                <p ><strong>Date:</strong> ${formattedDate}</p>

                
            </body>
            </html>
        `);

        // Close the document to ensure it's ready for printing
        printWindow.document.close();

        // Print the content
        printWindow.print();

        // Close the print window
        printWindow.close();
    }




    const calculatePaymentStatus = async (selectedPayments, status, paidAmount, unpaidAmount) => {
        console.log("click the update status")
        const confirmed = window.confirm('Are you sure you want to make this payment?');

        if (confirmed) {
            let totalSelectedAmount = 0;
            // Calculate the total selected amount and update the paid status
            const newStatus = status.map((payment) => {
                if (selectedPayments.includes(payment.purpose)) {
                    totalSelectedAmount += Number(payment.amount);
                    return { ...payment, paid: true };
                }
                return payment;
            });

            // Calculate the unpaid amount
            setProposalAmount(totalSelectedAmount)
            const newUnpaidAmount = Number(unpaidAmount) - totalSelectedAmount;

            const newPaidAmount = Number(paidAmount) + totalSelectedAmount;
            console.log(totalSelectedAmount, newUnpaidAmount, newPaidAmount, newStatus)
            // return { totalSelectedAmount, newPaidAmount, newUnpaidAmount, newStatus };

            const StudentPaymentStatus = {

                teacherStatus: true,
                studentId: student?.studentId,
                schoolCode: student?.schoolCode,
                Name: student?.name,
                ClassName: student?.className,
                SectionName: student?.section,
                ShiftName: student?.shift,
                ClassRoll: student?.classRoll,
                proposalAmount,
                selectedPayments,
                paymentMethod: paymentMethod,
                agentNumber: agentNumber,
                transactionId: transactionId,
                PaidAmount: newPaidAmount,
                unpaidAmount: newUnpaidAmount,
                status: newStatus

            }




            try {
                const response = await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/payFees/payStatus/${payFeeStatus?._id}`);
                if (response.status === 200) {
                    try {
                        const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/payFees', StudentPaymentStatus);
                        console.log('Data stored successfully:', response.data);
                        printPaymentReceipt(StudentPaymentStatus);
                        toast.success("Payment process completed successfully")
                    } catch (error) {
                        console.error('Error storing data:', error);
                        toast.error("Payment process failed")

                    }
                };
            } catch (error) {
                console.error('Error deleting payment status:', error);
                // Handle the error, e.g., show an error message to the user.
            }


            setShowPaymentModal(false);
            setShowModal(true);
            setTransactionId("");
            setAgentNumber("");
            closeModal();
        }

    };


    console.log(payFeeStatus)
    const handlePayment = async () => {
        console.log("click the initial status")
        const confirmed = window.confirm('Are you sure you want to make this payment?');

        if (confirmed) {
            const selectedPaidPayments = stdPayment.allFees.map((payment) => ({
                ...payment,
                paid: selectedPayments.includes(payment.purpose),
            }));

            const selectedUnpaidPayments = stdPayment.allFees.map((payment) => ({
                ...payment,
                paid: !selectedPayments.includes(payment.purpose),
            }));

            const StudentPaymentStatus = {

                teacherStatus: true,
                studentId: student?.studentId,
                schoolCode: student?.schoolCode,
                Name: student?.name,
                ClassName: student?.className,
                SectionName: student?.section,
                Shift: student?.shift,
                ClassRoll: student?.classRoll,
                proposalAmount: calculateTotalSelectedAmount(),
                selectedPayments,
                paymentMethod: paymentMethod,
                agentNumber: agentNumber,
                transactionId: transactionId,
                PaidAmount: calculateTotalSelectedAmount(),
                unpaidAmount: calculateUnpaidAmount(),
                status: selectedPaidPayments

            }

            printPaymentReceipt(StudentPaymentStatus)
            // try {
            //     const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/payFees', StudentPaymentStatus);
            //     console.log('Data stored successfully:', response.data);
            //     toast.success("Payment process completed successfully")
            // } catch (error) {
            //     console.error('Error storing data:', error);
            //     toast.error("Payment process failed")

            // }
            setShowPaymentModal(false);
            setShowModal(true);
            setTransactionId("");
            setAgentNumber("");
            closeModal();
        }
    };

    console.log(selectedPayments)







    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/stdPayment/${student?.schoolCode}?year=${new Date().getFullYear()}`);
                setAllPayment(response.data);
            } catch (error) {
                console.error('Error fetching payment information:', error);
            }
        };

        fetchPayment();

    }, [student?.schoolCode, student?.email]); // Removed 'allPayment' from the dependency array


    // Function to handle the GET request
    const fetchPaymentStatus = async () => {
        try {
            // Make a GET request to your backend route with query parameters
            const response = await axios.get(
                `https://zuss-school-management-system-server-site.vercel.app/api/payFees/payStatus/${student?.schoolCode}?studentId=${student?.studentId}`
            );

            // Update the paymentStatus state with the response data
            // setPayFeeStatus(response.data[0]);
            setPayFeeStatus(response.data[0]);
        } catch (error) {
            console.error('Error fetching payment status:', error);
        }
    };

    useEffect(() => {
        // Fetch payment status when the component mounts
        fetchPaymentStatus();
    }, [student?.schoolCode, student?.email]);


    useEffect(() => {
        // Use a separate effect for setting 'stdPayment' based on 'student' and 'allPayment'
        let filteredPayment = allPayment;

        if (student.shift) {
            filteredPayment = allPayment.filter(pay => pay.shiftName === student.shift && pay.className === student?.className);
        } else if (student?.section) {
            filteredPayment = allPayment.filter(pay => pay.sectionName === student.section && pay.className === student?.className);
        } else {
            filteredPayment = allPayment.filter(pay => pay.className === student?.className);
        }

        setStdPayment(filteredPayment.length > 0 ? filteredPayment[0] : null); // Set to null if no data found

    }, [student, allPayment]);

    const calculateTotalSelectedAmount = () => {
        let totalAmount = "0"; // Initialize as a string

        for (const payment of selectedPayments) {
            const selectedPayment = (stdPayment.allFees).find((data) => data.purpose === payment);
            if (selectedPayment) {
                totalAmount = (Number(totalAmount) + Number(selectedPayment.amount)).toString(); // Convert to numbers and back to a string
            }
        }
        return totalAmount;
    };

    const calculateUnpaidAmount = () => {
        let unpaidAmount = "0"; // Initialize as a string

        for (const payment of stdPayment.allFees) {
            if (!payment.paid && !selectedPayments.includes(payment.purpose)) {
                unpaidAmount = (Number(unpaidAmount) + Number(payment.amount)).toString(); // Convert to numbers and back to a string
            }
        }
        return unpaidAmount;
    };


    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); // Selected payment method
    const [agentNumber, setAgentNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleToTeacherToast = () => {
        toast.error("Teacher need to verify your previous payment proposal first")
    }


    return (
        <div className="text-white mb-20">
            <h2 className="text-3xl font-semibold text-green-400 mt-5 mb-12">Payment System By Teacher</h2>

            {
                Object.keys(payFeeStatus).length !== 0 ?
                    <>
                        <div className="flex justify-around text-lg font-semibold mb-8">
                            <p>Name: {payFeeStatus?.Name}</p>
                            <p>Class Name: {payFeeStatus?.ClassName}</p>
                            <p>Section: {payFeeStatus?.SectionName ? payFeeStatus?.SectionName : ""}</p>
                            <p>Shift: {payFeeStatus?.ShiftName ? payFeeStatus?.ShiftName : ""}</p>
                            <p>Class Roll: {payFeeStatus?.ClassRoll}</p>
                        </div>

                        {payFeeStatus && (
                            <div className="w-11/12 mx-auto">
                                <table className="w-full border-collapse border">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">Check</th>
                                            <th className="border p-2">Name</th>
                                            <th className="border p-2">Amount</th>
                                            <th className="border p-2">Paid/Unpaid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payFeeStatus?.status && (payFeeStatus?.status).map((payment) => (
                                            <tr key={payment.purpose} className={payment.paid ? 'bg-green-500' : 'bg-yellow-500'}>
                                                <td className="border p-2">
                                                    <input
                                                        type={payment.paid ? 'hidden' : 'checkbox'}
                                                        checked={selectedPayments.includes(payment.purpose)}
                                                        onChange={() => handlePaymentSelect(payment.purpose)}
                                                        className="w-6 h-6 rounded-lg"
                                                    />
                                                </td>
                                                <td className="border p-2">{payment.purpose}</td>
                                                <td className="border p-2">{payment.amount}</td>
                                                <td className="border p-2">
                                                    {payment.paid ? 'Paid' : <button onClick={() => handlePaymentSelect(payment.purpose)}>Unpaid</button>}
                                                </td>

                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-end">
                                    <p className="text-end mr-5"><span className="font-bold text-green-400">Paid Amount:</span> {payFeeStatus?.PaidAmount}</p>
                                    <p className="text-end"><span className="font-bold text-red-400">Unpaid Amount:</span> {payFeeStatus?.unpaidAmount}</p>
                                </div>

                            </div>
                        )}
                    </>

                    :

                    <>
                        <div className="flex justify-around text-lg font-semibold mb-8">
                            <p>Name: {student?.name}</p>
                            <p>Class Name: {student?.className}</p>
                            <p>Section: {student?.section ? student?.section : ""}</p>
                            <p>Shift: {student?.shift ? student?.shift : ""}</p>
                            <p>Class Roll: {student?.classRoll}</p>
                        </div>

                        {stdPayment && (
                            <div className="w-11/12 mx-auto">
                                <table className="w-full border-collapse border">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">Check</th>
                                            <th className="border p-2">Name</th>
                                            <th className="border p-2">Amount</th>
                                            <th className="border p-2">Paid/Unpaid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stdPayment?.allFees && (stdPayment?.allFees).map((payment) => (
                                            <tr key={payment.purpose} className={payment.paid ? 'bg-green-500' : 'bg-yellow-500'}>
                                                <td className="border p-2">
                                                    <input
                                                        type={payment.paid ? 'hidden' : 'checkbox'}
                                                        checked={selectedPayments.includes(payment.purpose)}
                                                        onChange={() => handlePaymentSelect(payment.purpose)}
                                                        className="w-6 h-6 rounded-lg"
                                                    />
                                                </td>
                                                <td className="border p-2">{payment.purpose}</td>
                                                <td className="border p-2">{payment.amount}</td>
                                                <td className="border p-2">
                                                    {payment.paid ? 'Paid' : <button onClick={() => handlePaymentSelect(payment.purpose)}>Unpaid</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-end">Total Amount: {stdPayment?.totalAmount}</p>
                            </div>
                        )}
                    </>
            }



            {selectedPayments.length > 0 && (
                <div className="flex mt-12 ml-14 pb-8 text-lg font-semibold items-center">
                    <p className="mr-5">Selected Amount: <span className="text-green-400">{calculateTotalSelectedAmount()}</span></p>
                    <p>Unpaid Amount: <span className="text-yellow-400">{calculateUnpaidAmount()}</span></p>

                    {
                        payFeeStatus?.teacherStatus === true ?
                            <button
                                onClick={handleToTeacherToast}
                                className={`bg-green-400 px-2 py-1 ml-5 rounded-lg`}
                            >
                                Pay Now
                            </button> :
                            <button
                                onClick={openModal}
                                className={`bg-green-400 px-2 py-1 ml-5 rounded-lg`}
                            >
                                Pay Now
                            </button>
                    }


                    {showModal && (
                        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg text-black" >
                                <h2 className="text-2xl font-semibold mb-4">Payment Info</h2>

                                {/* Payment Method Dropdown */}
                                <div className="mb-2">
                                    <label className="block mb-1">Payment Method</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option className="text-black" value="">Select Payment Method</option>
                                        <option className="text-black" value="Upay">Upay</option>
                                        <option className="text-black" value="Bkash">Bkash</option>
                                        <option className="text-black" value="Nagad">Nagad</option>
                                    </select>
                                </div>

                                {/* Agent Number Input */}
                                <input
                                    type="text"
                                    placeholder="Agent Number"
                                    required
                                    value={agentNumber}
                                    onChange={(e) => setAgentNumber(e.target.value)}
                                    className="w-full mb-2 p-2 border rounded-lg text-black"
                                />

                                {/* Transaction ID Input */}
                                <input
                                    type="text"
                                    placeholder="Transaction ID"
                                    required
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="w-full mb-4 p-2 border rounded-lg text-black"
                                />

                                <div className="flex justify-end">
                                    {
                                        Object.keys(payFeeStatus).length !== 0 ?
                                            <button
                                                onClick={() => calculatePaymentStatus(selectedPayments, payFeeStatus?.status, payFeeStatus?.PaidAmount, payFeeStatus?.unpaidAmount)}

                                                className={`bg-green-400 text-white px-4 py-2 rounded-lg mr-2`}
                                            >
                                                Pay Now
                                            </button> :
                                            <button
                                                onClick={handlePayment}
                                                className="bg-green-400 text-white px-4 py-2 rounded-lg mr-2"
                                            >
                                                Pay Now
                                            </button>
                                    }


                                    <button
                                        onClick={closeModal}
                                        className="bg-red-400 text-white px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TeacherPaymentCollection;
