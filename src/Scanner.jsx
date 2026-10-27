import { useEffect, useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector/ponyfill";

const Scanner = () => {
    const videoRef = useRef(null);

    const [error, setError] = useState("");

    useEffect( () => {
        let stream = null;
        let cancelled = false;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {facingMode: 'environment'}
                });

                if( cancelled ) {
                    if (stream) stream.getTracks().forEach(track => track.stop());
                    return;
                }

                videoRef.current.srcObject = stream;
                setError("");

            } catch (err) {
                setError("Allow camera use to start scanning");
                console.error('Camera error:', err);
            }
        }

        startCamera();

        return () => {
            cancelled = true;
            if(stream) stream.getTracks().forEach(track => track.stop());
        }
    }, []);

    useEffect( () => {
        const detector = new BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']
        });

        const id = setInterval( async () => {
            const video = videoRef.current;
            if(!video || video.readyState < 2) return;

            try {
                console.log("Detecting...");
                const results = await detector.detect(video);
                if (results.length > 0) {
                    console.log("Found!");
                    console.log(results[0].rawValue);
                }
            } catch(err) {
                console.error("Detect error:", err);
            }

        }, 300)

        return ( () => {
            clearInterval(id);
        })
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted></video>
            <div>{error}</div>
        </div>
    );
}
 
export default Scanner;