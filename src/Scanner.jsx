import { useEffect, useRef, useState } from "react";

const Scanner = () => {
    const videoRef = useRef(null);

    useEffect( () => {
        let stream = null;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {facingMode: 'environment'}
                });

                videoRef.current.srcObject = stream;
            } catch (err) {
                console.error('Camera error:', err);
            }
        }

        startCamera();
    }, [])

    return (
        <video ref={videoRef} autoPlay playsInline muted></video>
    );
}
 
export default Scanner;