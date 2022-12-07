import { useState, useEffect } from "react";

const useFetch = (url, config) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, config)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong.');
    })
    .then((data) => {
    if (!Array.isArray(data.user_results)) {
        throw new Error('Received data is not correct.');
    }
    setData(data)
    })
    .catch((e) => {
        setError(e.message);
    })
    .finally(() => setLoading(false));
  }, [url]);

  return [data, loading, error];
};

export default useFetch;