import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'get', data = null, headers = null) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data,
        headers,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [data, isLoading, error, fetchData];
};

export default useAxios;