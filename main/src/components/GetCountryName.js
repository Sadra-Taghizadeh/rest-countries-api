import React, { useCallback, useEffect, useState } from "react"; 
const GetCountryName = (url) =>{
    const [data,setData] = useState({})
    const getData = useCallback(async () =>{
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    },[url]);
    useEffect(()=>{
        getData();
    },[getData])

    return data;
}

export default GetCountryName;