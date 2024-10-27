import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import theme from './materialUiConfig';
import { store } from './store/store';
import { MainLayout } from './components/layout/MainLayout';
import { RouterOutlet } from './components/navigation/RouterOutlet';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ApiUrls } from './constants/ApiUrls';

function App() {
  if (document.location.href.includes('localhost:3000')) {
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
              <RouterOutlet />
            </MainLayout>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
