import "./Runner.css";
import jpeg from "./assets/treadmillsecond.jpg";
import gif from "./assets/treadmill.gif";
import { useState, useEffect } from "react";

const Runner = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [records, setRecords] = useState([]);
    const [currentImage, setCurrentImage] = useState(jpeg);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 10);
            }, 10); // update every 10 milliseconds
            setCurrentImage(gif);
        } else {
            setCurrentImage(jpeg);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleToggle = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const handleSave = () => {
        setRecords([...records, timer]);
        setTimer(0);
        setIsRunning(false);
    };

    const handleReset = () => {
        setRecords([]);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 1000) / 10;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    return (
        <div className="container">
            <div className="header">RUNNER</div>
            <div className="content">
                <div className="runner-side">
                    <div className="image-side">
                        <img src={currentImage} alt="Treadmill" />
                    </div>
                    <div className="runner-side-record">
                        <div className="stopwatch">
                            <div className="timer">{formatTime(timer)}</div>
                            <button onClick={handleToggle}>
                                {isRunning ? "Durdur" : "Oynat"}
                            </button>
                            <button onClick={handleSave}>Kaydet</button>
                            <button onClick={handleReset} style={{backgroundColor:"red",color:"white"}}>Kayıtları Temizle</button>
                        </div>
                    </div>
                </div>
                <div className="record-side">
                    <div className="record-side-header">
                        KAYITLAR
                    </div>
                    <div className="record-side-content">
                        {records.map((record, index) => (
                            <div key={index} className="record-item">
                                {index + 1}. koşu {formatTime(record)} süre
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Runner;
