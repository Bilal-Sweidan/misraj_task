import React, { useContext, useState, useEffect } from 'react'

// react bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
// context 
import UserContext from '../Contexts/Context';
// axios
import axios from 'axios';
// react icons
import { MdClose } from "react-icons/md";
import { GiHealthCapsule } from "react-icons/gi";
// component
import Capsule_card from '../Components/Capsule_card';
import EditeWindow from '../Components/EditeWindow'


function Create_Capsule_Window({ setWindow, get_capsules }) {

    const currentDate = new Date().toISOString().substring(0, 10)
    const currentTime = new Date().toISOString().substring(11, 16);

    const { user } = useContext(UserContext)
    async function fetch_data(e) {
        const form_data = e.target
        const formData = new FormData(form_data)
        formData.append("userId", user._id)
        const jsonForm = Object.fromEntries(formData.entries())
        console.log(jsonForm)
        const { data } = await axios.post('http://localhost:3000/capsule/create', formData)
        if (data.success) {
            setWindow(false)
            get_capsules()
        }
    }
    return (
        <div className='w-100 h-100 position-fixed d-flex align-items-center z-3' style={{ top: "0px", backgroundColor: "#33333360" }}>
            <Card className="position-absolute w-50 bg-light" style={{ left: "25%" }}>
                <MdClose size={"25px"} className='position-absolute' style={{ top: "10px", right: "10px", cursor: "pointer" }} onClick={() => setWindow(false)} />
                <Card.Body style={{ boxShadow: "0 0 10px black" }} className='rounded p-3'>
                    <h4 className='text-center text-capitalize'>create Time capsule</h4>
                    <form action="" method='dialog' onSubmit={fetch_data}>
                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>Title :</label>
                            <input type="text" name="title" id="" style={{ width: "calc( 100% - 24px * 2)" }} className='mx-4 form-control' placeholder='Title' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>Content :</label>
                            <textarea name="text_content" id="" className='mx-4 form-control' style={{ width: "calc( 100% - 24px * 2)" }} placeholder='content'></textarea>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>upload an image :</label>
                            <input type="file" name="image" id="" style={{ width: "calc( 100% - 24px * 2)" }} className='mx-4 form-control' placeholder='upload image' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='mb-2 text-capitalize'>release Date :</label><br />
                            <div className='d-flex'>
                                <input type="date" name="day" min={currentDate} id="" className='mx-4 form-control' />
                                <input type="time" name="time" id="" className='mx-4 form-control' />
                            </div>
                        </div>
                        <div className='mt-4 d-flex justify-content-end px-4'>
                            <button type='submit' className='btn btn-primary text-capitalize'>create</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    )
}


export default function Home() {
    const { logout, user } = useContext(UserContext)
    const [window, setWindow] = useState()
    const [editWindow, setEditWindow] = useState()
    const [capsule_info, setCapsule_info] = useState()

    const [isLoading, setLoading] = useState(false)
    const [capsules, setCapsules] = useState([])
    function get_capsules() {
        setLoading(true)
        axios.post('http://localhost:3000/API/capsules', { user_id: user._id })
            .then((res) => {
                if (res.data) {
                    setCapsules(res.data.reverse())
                    console.log(res.data)
                }
                setLoading(false)
            })
    }
    useEffect(() => {
        get_capsules()
    }, [])
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary position-relative" data-bs-theme="dark" >
                <Container>
                    <Navbar.Brand href="#home"><GiHealthCapsule size={"30px"} /> Time Capsule Platform </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='d-flex justify-content-end'>
                        <Nav>
                            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                            <Nav.Link eventKey={2} onClick={logout} >
                                log out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className='home-body'>
                {/* <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary w-75 m-auto" data-bs-theme="light">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link eventKey={2} onClick={(e) => setWindow(!window)} className='text-capitalize btn btn-primary'>
                                    create capsule
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
                <button onClick={(e) => setWindow(!window)} className='text-capitalize btn btn-primary position-fixed d-flex align-items-center gap-2' style={{ right: "20px", bottom: "20px" }}>
                    <GiHealthCapsule size={"30px"} /> create capsule
                </button>
                {
                    window && <Create_Capsule_Window setWindow={setWindow} get_capsules={get_capsules} />
                }
                {
                    editWindow && <EditeWindow setEditWindow={setEditWindow} get_capsules={get_capsules} capsule_info={capsule_info} />
                }
                <div className='w-50 mx-auto my-4'>
                    <Capsule_card capsules={capsules} get_capsules={get_capsules} setEditWindow={setEditWindow} setCapsule_info={setCapsule_info} />
                </div>
            </section>
        </>
    )
}
