import React from 'react';
// import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import img from "../../../Assets/Images/School.jpg"

const EachStaffIntro = ({ name, designation, email, phone, bloodGroup }) => {
    // const handleToVerify = (user, event) => {
    //     const currentUser = {
    //         verify: true
    //     }
    //     fetch(`https://cricket-lover-server-site-s-m-zubayer.vercel.app/user/${user?.email}`, {
    //         method: "PUT",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(currentUser)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             localStorage.setItem('Cricket-Lover', data.token);
    //             toast.success('User Verified successfully')

    //         })
    // }

    return (
        <tbody>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={img} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>

            <td>{name}</td>
            <td>{designation}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{bloodGroup}</td>
            {/* <td>
                {
                    user.accountType === "Seller" ?
                        <button onClick={() => handleToVerify(user)} className={`px-2 py-1 ${user.verify && 'bg-lime-200'} bg-blue-200 rounded-lg`}>
                            Verify
                        </button> :
                        "No Need"
                }
            </td>
            <td><button onClick={() => handleToDelete(user)} className="px-2 py-1 bg-red-300 rounded-lg">Delete</button> </td> */}
        </tbody>
    );
};

export default EachStaffIntro;