import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState( () => {
        try {
            const check = localStorage.getItem(key);
            if(check) return JSON.parse(check);
            else return initialValue;

        } catch(err) {
            console.error("Parsing Error: "+err);
            return initialValue;
        }
    });

    useEffect( () => {
        try {
            localStorage.setItem(key, JSON.stringify( value ))
        } catch(err) {
            console.error("Local Storage Error: "+err);
        }
    }, [key, value])

    return [value, setValue];
}