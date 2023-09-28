import { useContext, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { toast } from "react-hot-toast";
import { AiOutlineDownload } from 'react-icons/ai';
import html2pdf from "html2pdf.js";
import { AuthContext } from "../../../context/UserContext";
// import { saveAs } from 'file-saver';


function LeaveApplication({ name, color }) {

    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("sans-serif");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const { schoolName } = useContext(AuthContext);
    const [ein, setEIN] = useState('');
    const [address, setAddress] = useState('');

    const handleEINChange = (e) => {
        setEIN(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };


    // get the date ....
    const currentDate = new Date();

    // Get the individual date components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear()
    const formattedDate = `${month}/${day}/${year}`;
    // part for upload img

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');


    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('key', process.env.REACT_APP_imgbbKey);

            const response = await axios.post('https://api.imgbb.com/1/upload', formData);
            toast.success("Img Load successfully. Please press Upload button to set img as background")

            setImageUrl(response.data.data.url);
        } catch (error) {
            console.error(error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
    });


    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const handleFontFamilyChange = (event) => {
        setFontFamily(event.target.value);
    };

    const handleBoldClick = () => {
        setIsBold(!isBold);
    };

    const handleItalicClick = () => {
        setIsItalic(!isItalic);
    };

    const handleUnderlineClick = () => {
        setIsUnderline(!isUnderline);
    };
    function generatePDF(divId) {
        const element = document.getElementById(divId);

        const opt = {
            margin: 0.5,
            filename: "result.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();

    }


    return (
        <div className="h-screen bg-gray-100 flex flex-col pt-10 pb-10">
            <div className="mb-4 flex items-center justify-center ">
                <label htmlFor="ein" className="block text-gray-600 font-semibold">EIN: </label>
                <input
                    type="text"
                    id="ein"
                    name="ein"
                    value={ein}
                    onChange={handleEINChange}
                    className="ml-10 w-7/12 border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />
            </div>
            <div className="mb-4 flex items-center justify-center">
                <label htmlFor="address" className="block text-gray-600 font-semibold">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                    className="ml-2 w-7/12 border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />
            </div>

            <div>
                <div {...getRootProps()} className="border-dashed border-2 p-4 cursor-pointer bg-yellow-100 w-2/6 mx-auto my-3">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag and drop an image file here, or click to select a file</p>
                    )}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={uploadImage}
                    disabled={!file}
                >
                    Upload
                </button>
            </div>




            <div className="flex bg-white border-b border-gray-300 p-4">
                <div className="flex items-center mr-4">
                    <button
                        className={`mr-2 ${isBold ? "text-blue-600 font-bold" : "font-normal"
                            }`}
                        onClick={handleBoldClick}
                    >
                        B
                    </button>
                    <button
                        className={`mr-2 ${isItalic ? "text-blue-600 italic" : "not-italic"
                            }`}
                        onClick={handleItalicClick}
                    >
                        I
                    </button>
                    <button
                        className={`mr-2 ${isUnderline ? "text-blue-600 underline" : "no-underline"
                            }`}
                        onClick={handleUnderlineClick}
                    >
                        U
                    </button>
                </div>
                <div className="flex items-center mr-4">
                    <label htmlFor="font-size" className="mr-2">
                        Font Size:
                    </label>
                    <select
                        id="font-size"
                        className="border border-gray-400 rounded-md py-1 px-2"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                    >
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                    </select>

                </div>
                <div className="flex items-center">
                    <label htmlFor="font-family" className="mr-2">
                        Font Family:
                    </label>
                    <select
                        id="font-family"
                        className="border border-gray-400 rounded-md py-1 px-2"
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                    >
                        <option value="sans-serif">Sans-serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </div>
                <div className="flex items-center w-1/2  md:ml-20">
                    <AiOutlineDownload className="ml-auto text-3xl font-bold" onClick={() => generatePDF("leaveForm")} ></AiOutlineDownload>
                </div>

            </div>
            <div className="my-5 bg-white" id="leaveForm">
                <div className={`relative z-10 border-blue-500 border-dashed border-4 ${color} rounded-lg p-4 m-10`}>
                    <span class="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 opacity-10 text-4xl font-bold">
                        {/* <img z-10 src="https://tse4.mm.bing.net/th?id=OIP.IhMJ0rAv6sBTVr5doQJHgAHaHa&pid=Api&P=0"></img> */}
                        <img z-10 src={imageUrl}></img>
                    </span>
                    <h1 className="font-bold text-3xl text-lime-800">
                        {schoolName}
                    </h1>
                    <h1 className=" text-xl z-40 font-bold text-lime-800">{name}</h1>

                    <p className=" absolute right-8 top-4"><span className="font-semibold">EIIN:</span>{ein}</p>
                    <p className=" absolute left-0 bottom-[-30px]"><span className="font-semibold">Address:</span>{address}</p>


                    <p className="absolute font-semibold text-lg left-4 bottom-2">Date: {formattedDate}</p>
                    <p className=" absolute font-semibold text-lg right-20 bottom-8">Principle</p>
                    <p className=" absolute font-semibold text-lg right-4 bottom-2">{schoolName}</p>

                    <div
                        contentEditable
                        className={`flex-1 h-screen z-40 text-start p-4 text-${fontFamily} ${isBold ? "font-bold" : "font-normal"
                            } ${isItalic ? "italic" : "not-italic"} ${isUnderline ? "underline" : "not-underline"
                            }`}
                        style={{ fontSize: `${fontSize}px` }}
                    />
                </div>
            </div>
        </div>

    );
}

export default LeaveApplication;
