import { useEffect, useState } from "react";

export default function useFetch(url, parameters = {}) {
  const [fetchState, setFetchState] = useState({
    state:  '',
    data:   null,
    error:  null
  });

  useEffect(() => {
    async function getData() {
      try {
        setFetchState(oldValue => ({
          ...oldValue, state:"Loading..."
        }));

        let response = await fetch(url, parameters);
  
        if(response.ok) {
          let dataJson = await response.json();
  
          setFetchState({
            state:'success',
            data: dataJson,
            error: null
          });
        }
        else {
          setFetchState({
            state: "error",
            data: null,
            error: new Error(response.statusText)
          });
        }
      }
      catch(error) {
        setFetchState({
          state: "error",
          data: null,
          error: error
        });
      }
    };

    getData();
  }, [url]);

  return fetchState;
}