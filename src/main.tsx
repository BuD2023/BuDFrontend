import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import GlobalStyles from './style/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    {/* <GlobalStyles /> */}
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
