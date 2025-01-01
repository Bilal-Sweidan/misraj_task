import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Timer from '../Components/Timer'
import Loading from '../Components/Loading'

export default function CapsulePage() {
    const { capsule_id } = useParams()

    const [isLoading, setLoading] = useState(false)
    const [capsule, setCapsule] = useState()
    async function get_capsules_data() {
        setLoading(true)
        const { data } = await axios.get(`http://localhost:3000/capsule/${capsule_id}`)
        if (data) {
            setCapsule(data)
            console.log(data)
        }
        setLoading(false)
    }
    useEffect(() => {
        get_capsules_data()
    }, [])
    async function updateStatus() {
        const { data } = await axios.put(`http://localhost:3000/capsule/${capsule_id}`)
        if (data.success) {
            get_capsules_data()
        }
    }
    return (
        <main className='vh-100 d-flex align-items-center'>
            {
                isLoading ? <Loading /> :
                    <div className='w-100 vh-100 text-bg-dark d-flex justify-content-center'>
                        <div className='card w-50 h-75 m-auto p-4'>
                            <h1 className=' text-capitalize'>{capsule?.title}</h1>
                            <div className='text-center'>
                                <Timer updateStatus={updateStatus} deadline={capsule?.release_day} timeLine={capsule?.release_time} get_capsules_data={get_capsules_data} text_content={capsule?.text_content} />
                            </div>
                        </div>
                    </div>
            }
        </main>
    )
}
