"use client";

import { useEffect, useState } from "react";

type AsyncFunction<T> = () => Promise<T>;

export const useFetch = <T>(fn: AsyncFunction<T> , initValue : any) => {
  const [data, setData] = useState<T>(initValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(!data) fetchData();
  }, []);

  const refresh = () => fetchData();

  return { data, isLoading, error, refresh };
};
