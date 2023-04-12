import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export var accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc2tpbTk3Iiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MTI2NTExMCwiZXhwIjoxNjgxMjY4NzEwfQ.7n8D82B2DYtUp1mHsuNTIVmcfTaglI1bB0sp2v-0BhdllhL0KNVNVKpNGrKzXFFI2NaJ-7QhIqOKqBV2zVzw6Q';

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
