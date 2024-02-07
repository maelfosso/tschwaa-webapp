import { useRef, useMemo, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useAxiosContext } from 'contexts/AxiosContext';
import { fromJson, toJson } from 'lib/json';

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class TError {
  error: string;

  constructor(message: string) {
    this.error = message;
  }
}

export const processError = (error: Error) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.log("fetch api response - error 1:", error.response.data);
      return new TError(error.response.data as string)
    } else if (error.request) {
      console.log("fetch api response - error 2:", error.request);
      return new TError(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("fetch api response - error 1:", error.message);
      return new TError(error.message)
    }
  } else {
    return new TError((error as Error).message)
  }
}

const useAxios = () => {
  const abortControllerRef = useRef(new AbortController());
  const contextAxiosInstance = useAxiosContext();
  const instance = useMemo(() => {
    return contextAxiosInstance || axios
  }, [contextAxiosInstance])
  const cancel = () => {
    abortControllerRef.current.abort();
  }

  const fetchApiResponse = useCallback(
    async <T,S = Record<string, never>>(url: string, method: RequestMethod, payload?: S) => {
      const { data } = await instance<T>({
        method,
        url,
        data: toJson(payload)
      })

      return fromJson(data) as T;
    },
    [instance]
  )

  return useMemo(() => ({
    cancel,
    fetchApiResponse,
  }), [fetchApiResponse]);

};

export default useAxios;