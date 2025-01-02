import { useState, useEffect } from "react";
import moment from "moment";
export default function Timer({ text_content, deadline, timeLine, get_capsules_data, capsuleStatus , image }) {


    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [deadTime, setDeadTime] = useState()
    const getTime = () => {
        const utc_time = moment(`${moment(deadline, "YYYY-MM-DD")}`.substring(4, 15) + " " + timeLine + `:00`)
        const local_time = utc_time.local()
        const time = +utc_time - +Date.now()
        console.log(time)
        setDeadTime(time)
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((time / (1000 * 60)) % 60))
        setSeconds(Math.floor((time / 1000) % 60))

    };
    useEffect(() => {
        const interval = setInterval(() => {
            // if (deadTime < 1000) {
            //     console.log("req")
            //     get_capsules_data()
            //     clearInterval(interval);
            // }
            getTime(deadline)
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="timer">
            {
                capsuleStatus ?
                    <div>
                        {
                            image && <img src={`/images/${image}`} className="w-100" alt="" />
                        }
                        <p className="" style={{ fontSize: "25px" }}>{text_content}</p>
                    </div> 
                    :
                    <div className="text-bg-danger d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                        {
                            deadTime > 1000 ?
                                <div>
                                    <h2 className="text-center text-capitalize">remaining time</h2>
                                    <p style={{ fontSize: "25px" }}>{`${+days} days & ${+hours} : ${+minutes} : ${+seconds}`}</p>
                                </div>
                                : <p style={{ fontSize: "25px" }}>Reload this page</p>
                        }
                    </div>
            }
        </div>
    );
}

