import axios from "axios";
import { useCallback, useState } from "react";

export default function useLazyFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(endpoint);
      setData(res.data.products || []);
    } catch (error) {
      console.error(`Fetch error: ${endpoint}`, error);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, fetchData, loading };
}
