import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import theme from './materialUiConfig';
import { store } from './store/store';
import { MainLayout } from './layout/MainLayout';
import { TourView } from './tourView/TourView';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainLayout>
            <TourView />
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
