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

function App() {
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
