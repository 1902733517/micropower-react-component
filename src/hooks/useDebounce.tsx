import { useEffect, useState } from 'react';


const useDebounce = (val: any, time = 300) => {
    const [debounceVal, setDebounceVal] = useState('');
    useEffect(()=>{
        const timer = window.setTimeout(()=>{
            setDebounceVal(val)
        }, time)
        return () => {
            clearTimeout(timer)
        }
    }, [val, time])
    return debounceVal
}

export default useDebounce