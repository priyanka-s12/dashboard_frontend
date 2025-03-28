import axios from 'axios';
import { useState, useEffect } from 'react';

function useAxios(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error, getData };
}

export default useAxios;
