import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export var accessToken =
<<<<<<< HEAD
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc2tpbTk3Iiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MTI4NTk2OSwiZXhwIjoxNjgxMjg5NTY5fQ.Dvrs3GSZWlMgXrq4SgJTswRMiAEv5XOCWKYSy98YMA30Euh9J5Lqnjpwli0D08XHxDXvYEPA7FBp--pFdUyfjw';

=======
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKSG5pMiIsInJvbGUiOiJbUk9MRV9WRVJJRklFRF0iLCJpYXQiOjE2ODEyODUxNzcsImV4cCI6MTY4MTI4ODc3N30.wLlHbYHazL8PHJkO4vRqbCQd6MhA1piYhzYXnYRtAc7SOQz_FK3TIs8VnztrplerzJ4whRqzNB7Kb7g0YiBryA';
>>>>>>> f6bdd26b9a362077520c74001a72108e97c78a8a
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
