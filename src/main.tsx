import App from '@/App';
import Toast from '@/components/Toast';
import { store } from '@/model';
import { CssBaseline } from '@mui/material';
import { MetaMaskProvider } from 'metamask-react';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);

function Main() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={4}
          autoHideDuration={5000}
          Components={{
            default: Toast,
            error: Toast,
            success: Toast,
            warning: Toast,
            info: Toast,
          }}
        >
          <CssBaseline />
          <MetaMaskProvider>
            <App />
          </MetaMaskProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
}
