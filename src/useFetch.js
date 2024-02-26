import { useState,useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const abortCon = new AbortController();

        fetch(url, { signal: abortCon.signal })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for the resource')
            }
            return res.json()})
        .then(data => {
            setData(data)
            setisPending(false)
            setError(null)})
        .catch(err => {
            if (err.name === 'AbortError'){
                console.log('fetch aborted')
            } else{
                setisPending(false)
                setError(err.message)
            }
        });

        return () => abortCon.abort();
    }, [url]);
    return {data, isPending, error}
}
export default useFetch;