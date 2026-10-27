import { useEffect, useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector/ponyfill";

const Scanner = ({onDetect}) => {
    const videoRef = useRef(null);

    const [error, setError] = useState("");

    // useEffect for running camera
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

    // useEffect for checking for barcodes
    useEffect( () => {
        let detected = false;
        const detector = new BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']
        });

        // loops every 300 milliseconds
        const id = setInterval( async () => {
            const video = videoRef.current;
            if(!video || video.readyState < 2) return;

            try {
                const results = await detector.detect(video);
                if (results.length > 0) {
                    const rawValue = results[0].rawValue;
                    console.log("Found: "+rawValue);
                    if(!detected){
                        onDetect(rawValue);
                        detected = true;
                    }
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