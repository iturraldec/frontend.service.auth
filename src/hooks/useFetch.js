import { useEffect, useState } from "react";

export default function useFetch() {
  const [state,setState] = useState('');
  const [data,setData]   = useState(null);
  const [error,setError] = useState('');

  //
  async function getData(url){
    let response = await fetch(url);
    
    if(response.ok) {
      let dataJson = await response.json();

      setData(dataJson);
      setState('success');
    };

    return response;
  };

  //
  async function postData(url, options){
    let response = await fetch(url, options);

    if(response.ok) {
      let dataJson = await response.json();

      setData(dataJson);
      setState('success');
    };

    return response;
  };

  //
  async function deleteData(url, options = {
                                  method: 'delete',
                                  headers: {
                                    'Accept': 'application/json'
                                  }}
                            ) {
    let response = await fetch(url, options);
    
    if(response.ok) {
      let dataJson = await response.json();

      setData(dataJson);
      setState('success');
    }

    return response;
  };

  return {state, data, getData, postData, deleteData};
}