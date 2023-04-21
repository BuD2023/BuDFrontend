import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { lazy } from 'react'; // React.lazy와 Suspense를 import

export var accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJHZ3l1bWFsYW5nIiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MDg2NzE4MCwiZXhwIjoxNjgwODcwNzgwfQ.oXaVHcoEobBh4AaE8K4DtsnEngDHwSDeeSXa7BT6cANWxtT9ENHGx4QnoQrhxa6gWg0aJd7jR47GSJ6_RigkKg';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

// App 컴포넌트를 동적으로 로드
const App = lazy(() => import('./App'));

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
