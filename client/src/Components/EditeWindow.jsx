// axios
import axios from "axios";
// react
import { useEffect, useState, useContext } from "react";
// context
import UserContext from "../Contexts/Context";
// react bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
// react icons
import { MdClose } from "react-icons/md";

export default function Create_Capsule_Window({ get_capsules , setEditWindow , capsule_info}) {

    const currentDate = new Date().toISOString().substring(0, 10)
    const currentTime = new Date().toISOString().substring(11, 16);

    async function fetch_data(e) {
        const form_data = e.target
        const formData = new FormData(form_data)
        formData.append('capsule_id' , capsule_info?._id)
        const jsonForm = Object.fromEntries(formData.entries())
        const { data } = await axios.put('http://localhost:3000/capsule/edit', jsonForm)
        if (data.success) {
            setEditWindow(false)
            get_capsules()
        }
    }
    return (
        <div className='w-100 h-100 position-fixed d-flex align-items-center z-3' style={{ top: "0px", backgroundColor: "#33333360" }}>
            <Card className="position-absolute w-50 bg-light" style={{ left: "25%" }}>
                <MdClose size={"25px"} className='position-absolute' style={{ top: "10px", right: "10px", cursor: "pointer" }} onClick={() => setEditWindow(false)} />
                <Card.Body style={{ boxShadow: "0 0 10px black" }} className='rounded p-3'>
                    <h4 className='text-center text-capitalize'>edit Time capsule</h4>
                    <form action="" method='dialog' onSubmit={fetch_data}>
                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>Title :</label>
                            <input type="text" name="title" id="" style={{ width: "calc( 100% - 24px * 2)" }} className='mx-4 form-control' placeholder='Title' defaultValue={capsule_info?.title} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>Content :</label>
                            <textarea name="text_content" id="" className='mx-4 form-control' style={{ width: "calc( 100% - 24px * 2)" }} placeholder='content' defaultValue={capsule_info?.text_content}></textarea>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>release Date :</label><br />
                            <div className='d-flex'>
                                <input type="date" name="day" min={currentDate} id="" className='mx-4 form-control' />
                                <input type="time" name="time" id="" className='mx-4 form-control' defaultValue={capsule_info?.release_time}/>
                            </div>
                        </div>
                        <div className='mt-4 d-flex justify-content-end px-4'>
                            <button type='submit' className='btn btn-primary text-capitalize'>edit</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    )
}