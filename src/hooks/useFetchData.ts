import { useEffect, useState } from 'react';

import http from '../services/httpService';

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await http.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
}
