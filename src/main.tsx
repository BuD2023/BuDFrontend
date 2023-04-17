import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

export var accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKSG5pMiIsInJvbGUiOiJbUk9MRV9WRVJJRklFRF0iLCJpYXQiOjE2ODEyNjE5MjgsImV4cCI6MTY4MTI2NTUyOH0.rk_AIDCC6Cd3axsc8vWcbLn8J5wEL6BLUTB95TdTDR_70i4p-vXdxnLUqM84_6G9fVIFk3xdwpWx7vvOE6Q6bw';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ScrollToTop />
        <App />
        {/* <ReactQueryDevtools /> */}
      </RecoilRoot>
    </QueryClientProvider>
  </BrowserRouter>
);
