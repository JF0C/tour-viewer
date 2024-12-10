import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { RouterOutlet } from './components/navigation/RouterOutlet';
import { ApiUrls } from './constants/ApiUrls';
import theme from './materialUiConfig';
import { store } from './store/store';
import { FullSizeImageView } from './components/shared/FullSizeImageView';
import 'leaflet/dist/leaflet.css';
import './App.scss';

function App() {
  if (document.location.href.includes('localhost:3000')) {
    ApiUrls.BaseUrl = 'https://localhost:7271';
  }
  else if (document.location.href.includes('localhost:5173')) {
    ApiUrls.BaseUrl = 'https://localhost:7271';
  }
  else {
    ApiUrls.BaseUrl = '.';
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <MainLayout>
              <FullSizeImageView />
              <RouterOutlet />
            </MainLayout>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
