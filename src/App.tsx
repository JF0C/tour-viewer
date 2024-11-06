import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { MainLayout } from './components/layout/MainLayout';
import { RouterOutlet } from './components/navigation/RouterOutlet';
import { CustomizedSnackbar } from './components/shared/CustomizedSnackbar';
import { ApiUrls } from './constants/ApiUrls';
import theme from './materialUiConfig';
import { store } from './store/store';

function App() {
  if (document.location.href.includes('localhost:3000')) {
    ApiUrls.BaseUrl = 'https://localhost:7271';
  }
  else if (document.location.href.includes('192.168.1.226:3000')) {
    ApiUrls.BaseUrl = 'https://192.168.1.226:7271';
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
              <RouterOutlet />
            </MainLayout>
            <CustomizedSnackbar />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
