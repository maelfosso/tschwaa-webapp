import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosInstanceProvider } from "contexts/AxiosContext";
import CurrentUserContextProvider from "contexts/CurrentUserContext";
import AppContent from "./AppContent";

const AppLayout = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  });

  return (
    <AxiosInstanceProvider config={{ baseURL: process.env.BACKEND_URL || "http://localhost:8080/" }}>
      <QueryClientProvider client={queryClient}>
        <CurrentUserContextProvider>
          <AppContent />
        </CurrentUserContextProvider>
      </QueryClientProvider>
    </AxiosInstanceProvider>
  )
}

export default AppLayout;
