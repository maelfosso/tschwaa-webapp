import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AxiosContext = createContext<AxiosInstance | null>(null);
export const useAxiosContext = () => useContext(AxiosContext);

interface AxiosInstanceProviderProps {
  config: CreateAxiosDefaults | AxiosRequestConfig,
  children: JSX.Element
}
export const AxiosInstanceProvider = ({
  config = {},
  children,
}: AxiosInstanceProviderProps) => {
  const instanceRef = useRef(
    axios.create({
      ...config,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
  );
  const location = useLocation();
  const navigate = useNavigate();

  const redirectToSignIn = useCallback(() => {
    if (location.pathname.includes("/auth/sign-in")) return;

    navigate(`/auth/sign-in?from=${encodeURIComponent(location.pathname)}`)
  }, [location.pathname, navigate]);

  const onResponse = useCallback((response: AxiosResponse) => {
    return response;
  }, []);

  const onUnauthorizedRequest = useCallback((error: AxiosError) => {
    if (error?.response?.status === 401) {
      redirectToSignIn();
    }

    return Promise.reject(error)
  }, [redirectToSignIn]);


  useEffect(() => {
    instanceRef.current.interceptors.response.use(onResponse, onUnauthorizedRequest);
  }, [instanceRef, onResponse, onUnauthorizedRequest]);


  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
}
