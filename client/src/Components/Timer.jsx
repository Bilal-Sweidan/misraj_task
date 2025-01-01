import { useState, useEffect } from "react";
export default function Timer({ text_content, deadline, timeLine, updateStatus }) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [counter, setCounter] = useState(1)
    const getTime = () => {
        const time2 = timeLine.split(':')
        const days = Date.parse(deadline) - Date.now();

        setDays(Math.floor(days / (1000 * 60 * 60 * 24)));

        setHours(+time2[0] - new Date(Date.now()).getHours());
        setMinutes(+time2[1] - new Date(Date.now()).getMinutes());

        // setSeconds(Math.floor((days / 1000) % 60) - counter);
        // setCounter(counter+1)

    };
    useEffect(() => {
        if (days + 1 <= 0 && hours <= 0 && minutes <= 0) {
            console.log("req")
            updateStatus()
        } else {
            const interval = setInterval(() => getTime(deadline), 1000);
            return () => clearInterval(interval);
        }
    }, []);


    return (
        <div className="timer mt-5">
            {
                text_content ? <p className="" style={{fontSize : "25px"}}>{text_content}</p> :
                    <>
                        <p>{`${+days + 1} days`}</p>
                        <p>&</p>
                        <p>{`${+hours} : ${+minutes}`}</p>
                    </>
            }
        </div>
    );
}

