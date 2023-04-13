import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export var accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc2tpbTk3Iiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MTM4NjcyMywiZXhwIjoxNjgxMzkwMzIzfQ.e7S-7lNJYyFBkVsFIyvK8JTGNYE2DNKqczqacVQPfjmA6pMPqKfBppLi7UIuR4uGQ36T8lbYrJtpMXXS4th1jg';
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
      <ScrollToTop />
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
);
