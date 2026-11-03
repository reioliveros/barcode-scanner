import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState( () => {
        try {
            if(key) {
                return JSON.parse(localStorage.getItem(key));
            } else {
                return initialValue;
            }
        } catch(err) {
            console.error("Parsing Error: "+err);
            return initialValue;
        }
    });

    useEffect( () => {
        try {

        } catch(err) {

        }
    }, [key, value])

    return [value, setValue];
}