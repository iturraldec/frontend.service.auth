import { useEffect, useState } from "react";

export default function useFetch(url, parameters = {}) {
  const [fetchState, setFetchState] = useState({
    state:  '',
    data:   null,
    error:  null
  });

  useEffect(() => {
    let ignore = false;

    async function getData() {
      try {
        setFetchState(oldValue => ({
          ...oldValue, state:"Loading..."
        }));

        let response = await fetch(url, parameters);
  
        if(response.ok) {
          let dataJson = await response.json();
  
          if (!ignore) {
              setFetchState({
                state:'success',
                data: dataJson,
                error: null
              });
          }
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

    return () => ignore = true;

  }, [url]);

  return fetchState;
}