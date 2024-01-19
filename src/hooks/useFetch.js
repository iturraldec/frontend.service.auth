import { useEffect, useState } from "react";

export default function useFetch(url,options={method: 'get'}) {
  const [state,setState] = useState(null);
  const [data,setData]   = useState(null);
  const [error,setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      switch(options.method){
        case 'get':
          setState('loading');
          break;
        case 'post':
          setState('adding');
          break;
        case 'put':
          setState('updating');
          break;
        case 'delete':
          setState('removing');
          break;
      };
  
      let response = await fetch(url,options);
      
      if(response.ok) {
        let dataJson = await response.json();
  
        setData(dataJson);
        setState('success');
        console.log(options.method, 'success');
      }
    };

    fetchData();

  }, [url, options]);

  return {state, data};
}