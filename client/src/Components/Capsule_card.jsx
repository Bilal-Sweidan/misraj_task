import { useContext, useEffect, useState } from 'react'
import UserContext from '../Contexts/Context'
// axios
import axios from 'axios'
// react bootstrap components
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Capsule_card({ capsules, get_capsules, setEditWindow, setCapsule_info }) {
    const { user } = useContext(UserContext)
    function delete_capsule(capsule_id) {
        console.log(capsule_id)
        axios.post('http://localhost:3000/capsule/delete', { "capsule_id": capsule_id, "user_id": user._id })
            .then(res => {
                if (res.data.success) {
                    get_capsules()
                }
                console.log(res.data)
            })
    }
    return (
        <>
            {
                capsules.map((capsule, index) => (
                    <div className='card mb-4 p-3' style={{ boxShadow: "0px 0px 10px black" }} key={index}>
                        <label htmlFor="" className='mb-2 text-capitalize'>message :</label>
                        <div className='card p-3 mb-3'>
                            <h3 className='text-capitalize'>{capsule?.title}</h3>
                            {
                                capsule.image &&
                                <img src={`/images/${capsule?.image}`} className='mb-3 rounded' alt="" />
                            }
                            <p>{capsule?.text_content}</p>
                        </div>
                        <p><span className='text-capitalize text-primary'>release date : </span>{`${capsule?.release_day}`.substring(0, 10)} || {capsule?.release_time}</p>
                        <p><span className='text-capitalize text-primary'>status : </span>{capsule?.release_statuse ? 'released' : 'waiting'}</p>
                        <label htmlFor="">Link :</label>
                        <a href={`http://localhost:5173/capsule/${capsule?._id}`} target='__blank'>{`http://localhost:5173/capsule/${capsule?._id}`}</a>
                        <div className='d-flex justify-content-end'>
                            <NavDropdown title="Dropdown" className='text-capitalize' id="collapsible-nav-dropdown">
                                <NavDropdown.Item href={`http://localhost:5173/capsule/${capsule?._id}`} target='__blank'>review</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { setEditWindow(true); setCapsule_info(capsule) }}>
                                    edite
                                </NavDropdown.Item>
                                <NavDropdown.Divider className='' />
                                <NavDropdown.Item className='text-danger' onClick={() => delete_capsule(capsule?._id)} >
                                    delete
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div >
                ))
            }
        </>
    )
}