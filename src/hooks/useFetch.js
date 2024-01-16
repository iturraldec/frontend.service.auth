import { useEffect, useState } from "react";

export default function useFetch() {
  const [state,setState]  = useState(null);
  const [data,setData]   = useState(null);
  const [error,setError] = useState(null);

  async function getData(url) {
    setState('loading');

    let response = await fetch(url);
    
    if(response.ok) {
      let dataJson = await response.json();

      setData(dataJson);
      setState('success');
    };
  }

  return {state, data, getData};
}