import { useEffect, useRef, useState } from "react";

const Scanner = () => {
    const videoRef = useRef(null);

    const [error, setError] = useState("");

    useEffect( () => {
        let stream = null;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {facingMode: 'environment'}
                });

                videoRef.current.srcObject = stream;
                setError("");
            } catch (err) {
                setError("Allow camera use to start scanning");
                console.error('Camera error:', err);
            }
        }

        startCamera();
    }, [])

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted></video>
            <div>{error}</div>
        </div>
    );
}
 
export default Scanner;