
import { useState } from 'react';
import { format } from 'date-fns';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import noticeBanner from "../../../Assets/Images/notice.jpg"
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { useEffect } from 'react';
import DisplaySpinner from '../../Shared/Spinners/DisplaySpinner';

function Notice() {
    const [notices, setNotices] = useState([]);
    const { schoolName, currentSchoolCode } = useContext(AuthContext);
    const [editingNotice, setEditingNotice] = useState(null);
    const [editedHeading, setEditedHeading] = useState('');
    const [editedMessage, setEditedMessage] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(currentSchoolCode);

    const fetchNotices = () => {
        setLoading(true);
        fetch(`https://zuss-school-management-system-server-site.vercel.app/api/notices/?schoolCode=${encodeURIComponent(currentSchoolCode)}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch notices');
                }
            })
            .then(notices => {
                setNotices(notices);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });
    };

    // useEffect(() => {
    //     fetchNotices();
    // }, []);


    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/notices/?schoolCode=${currentSchoolCode}`);
                if (response.ok) {
                    const noticesData = await response.json();
                    setNotices(noticesData);
                    setLoading(false)
                    console.log(noticesData)
                } else {
                    setLoading(false);
                    throw new Error('Failed to fetch notices');
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchNotices();
    }, [currentSchoolCode]);


    const handleToDeleteNotice = (id) => {
        const confirmed = window.confirm(`Are you sure to delete this notice?`);
        if (!confirmed) {
            return;
        } else {
            fetch(`https://zuss-school-management-system-server-site.vercel.app/api/notices/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        toast.success('Notice deleted successfully');
                        setNotices(notices.filter(notice => notice?._id !== id));
                    } else {
                        throw new Error('Failed to delete notice');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const openEditModal = (notice) => {
        setEditingNotice(notice);
        setEditedHeading(notice.heading);
        setEditedMessage(notice.message);
        setIsEditModalOpen(true);
    };

    const handleUpdateNotice = () => {
        if (editingNotice) {
            const updatedNotice = {
                ...editingNotice,
                heading: editedHeading,
                message: editedMessage,
            };

            fetch(`https://zuss-school-management-system-server-site.vercel.app/api/notices/${editingNotice._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNotice),
            })
                .then(response => {
                    if (response.ok) {
                        setIsEditModalOpen(false);
                        fetchNotices(); // Fetch notices again to reflect the updated data
                    } else {
                        throw new Error('Failed to update notice');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className="w-3/5 md:w-4/5 mx-auto">
            <div className="mx-auto my-20">
                <div className="flex justify-center mb-20">
                    <img className='rounded-lg' src={noticeBanner} alt="" />
                </div>
                {
                    notices.length === 0 ?
                        <h2 className="font-bold text-2xl my-10 mx-auto text-amber-300">No Notice Available!!!</h2>
                        :

                        notices.map((notice, index) => (
                            <div key={index} className="shadow-md text-start rounded md:px-8 py-5 mb-4">
                                <div className="grid grid-cols-12">
                                    <div className="flex items-center justify-start col-span-9">
                                        <p className="text-base mt-2 mr-5 text-teal-600 font-semibold">{notice?.time.split("T")[0]}</p>
                                        <p className="text-base mt-2 text-teal-600 font-semibold">{notice?.date.split("T")[0]}</p>
                                    </div>
                                    <div className="col-span-3 flex items-center justify-end">
                                        <button className="mr-3" onClick={() => openEditModal(notice)}>
                                            <BiEditAlt className="w-6 h-6 text-green-500"></BiEditAlt>
                                        </button>
                                        <button className="mr-3">
                                            <MdDelete onClick={() => handleToDeleteNotice(notice?._id)} className="w-6 h-6 text-red-500"></MdDelete>
                                        </button>
                                    </div>
                                </div>
                                <h2 className="font-bold text-lg mb-2 text-lime-400">{notice.heading}</h2>
                                <p className="text-gray-200 text-base">{notice.message}</p>
                            </div>
                        ))}
            </div>

            {isEditModalOpen && (
                <div className="edit-modal rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-3/6 h-84">
                    <div>
                        <label className="block text-start  mb-1 font-bold" htmlFor="">Heading</label>
                        <input
                            type="text"
                            className="border-2 text-start w-full mb-2 px-1"
                            value={editedHeading}
                            onChange={(e) => setEditedHeading(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="block text-start mb-1 font-bold">Notice</label>
                        <textarea
                            type="text"
                            className="border-2 text-start w-full mb-5 px-1"
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                        />
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-yellow-200 mr-3" onClick={handleUpdateNotice}>Update</button>
                    <button className="px-3 py-1 rounded-lg bg-green-200" onClick={closeEditModal}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Notice;



// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf'; // Using the 'react-pdf' library

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const Notice = () => {
//     const [pdfFile, setPdfFile] = useState(null);
//     const [numPages, setNumPages] = useState(null);
//     const [peopleInfo, setPeopleInfo] = useState([]);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setPdfFile(file);
//     };

//     const handlePDFLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//         extractPeopleInfo();
//     };

//     const extractPeopleInfo = async () => {
//         try {
//             const pdfData = new Uint8Array(await pdfFile.arrayBuffer());
//             const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
//             const extractedInfo = [];

//             for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//                 const page = await pdf.getPage(pageNum);
//                 const textContent = await page.getTextContent();
//                 const pageText = textContent.items.map((item) => item.str).join('\n');

//                 const personRegex = /name:\s*(.*?)\s*id:\s*(.*?)\s*village:\s*(.*?)\s*district:\s*(.*?)\s*country:\s*(.*?)\s*/gi;
//                 let match;
//                 while ((match = personRegex.exec(pageText)) !== null) {
//                     const name = match[1];
//                     const id = match[2];
//                     const village = match[3];
//                     const district = match[4];
//                     const country = match[5];

//                     const personInfo = {
//                         name,
//                         id,
//                         village,
//                         district,
//                         country,
//                     };

//                     extractedInfo.push(personInfo);
//                 }
//             }

//             console.log(extractedInfo, "extr")

//             setPeopleInfo(extractedInfo);
//             console.log(peopleInfo)
//         } catch (error) {
//             console.error('Error extracting people information from PDF:', error);
//         }
//     };

//     console.log(peopleInfo)



//     return (
//         <div>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             {pdfFile && (
//                 <div>
//                     <Document file={pdfFile} onLoadSuccess={handlePDFLoadSuccess}>
//                         {Array.from(new Array(numPages), (el, index) => (
//                             <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                         ))}
//                     </Document>
//                 </div>
//             )}

//             {peopleInfo.length > 0 && (
//                 <div>
//                     <h3>People Information:</h3>
//                     <ul className="mb-10">
//                         {peopleInfo.map((person, index) => (
//                             <li className="pb-10" key={`person_${index}`}>
//                                 <strong>Name:</strong> {person.name}<br />
//                                 <strong>ID:</strong> {person.id}<br />
//                                 <strong>Village:</strong> {person.village}<br />
//                                 <strong>District:</strong> {person.district}<br />
//                                 <strong>Country:</strong> {person.country}<br />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Notice;
