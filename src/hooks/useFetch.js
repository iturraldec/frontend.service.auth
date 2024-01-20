import { useState } from "react";

export default function useFetch() {
  const [fetchState, setFetchState] = useState({
    lastUrl : '',
    state   : '',
    data    : null,
    error   : null
  });

  //
  async function fetchData(url,options = null) {
    let response;

    try {
      setFetchState(oldValue => ({
        ...oldValue,
        state: 'running'
      }));

      response = await (options === null ? fetch(url) : fetch(url,options));

      if(response.ok) {
        let dataJson = await response.json();

        setFetchState({
          lastUrl: url,
          state:'success',
          data: dataJson,
          error: null
        });
      }
      else {
        setFetchState({
          lastUrl: url,
          state: "error",
          data: null,
          error: new Error(response.statusText)
        });
      }
    }
    catch(_error) {
      setFetchState({
        lastUrl: url,
        state: "error",
        data: null,
        error: _error
      });
    };

    return response;
  };

  return {fetchState, fetchData};
};