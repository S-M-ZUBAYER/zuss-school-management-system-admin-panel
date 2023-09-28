import React from 'react';
// import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import img from "../../../Assets/Images/School.jpg"

const EachStaff = ({ name, image, designation, teacherId, phone, bloodGroup, key, handleToDelete, handleMakeAdmin, handleOpenModal }) => {


    return (
        <tbody className="border-2" key={key}>
            <td>

                <div className="avatar">
                    <div className="mask mask-squircle w-9 h-9">
                        {
                            image ? <img src={image} alt="img" /> : <img src={img} alt="img" />
                        }

                    </div>
                </div>

            </td>

            <td>{name}</td>
            <td>{designation}</td>
            <td>{teacherId}</td>
            <td>{phone}</td>
            <td>{bloodGroup}</td>
            <td onClick={handleOpenModal} ><FaEdit></FaEdit></td>
            <td onClick={handleToDelete}><MdDelete></MdDelete></td>

        </tbody>
    );
};

export default EachStaff;