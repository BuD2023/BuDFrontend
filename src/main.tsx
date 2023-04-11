import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export var accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc2tpbTk3Iiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MTIyMjI1NCwiZXhwIjoxNjgxMjI1ODU0fQ.X41_SB9mHS4g0DBNdmZEJVzEFqdcn29iTgrCDiLRMNlj-a0an_r5AJeimN6SwKmDKlsxuXzBKG3gNr-BEQWwsw';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
// console.log(queryClient);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
);
