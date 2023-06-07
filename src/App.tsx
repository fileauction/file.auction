import AppHeader from '@/components/AppHeader';
import AppLayout from '@/components/AppLayout';
import AppMenu from '@/components/AppMenu';
import Button from '@/components/Button';
import WalletConnectButton from '@/components/WalletConnectButton';
import Welcome from '@/components/Welcome';
import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import Home from '@/pages/Home';
import { Box } from '@mui/material';
import { useMetaMask } from 'metamask-react';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cliam from './pages/Claim';
import Drive from './pages/Drive';
import Trash from './pages/Trash';

export const mapState = (state: RootState) => ({
  ...state.app,
});

export const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

function App() {
  const [{}, { setSnackbar }] = useRematch(mapState, mapDispatch);

  const metamask = useMetaMask();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbar(enqueueSnackbar);
  }, []);

  const connected = useMemo(() => {
    return metamask.status === 'connected';
  }, [metamask.status]);

  return (
    <AppLayout
      sidebar={connected && <AppMenu />}
      appBar={
        connected && (
          <AppHeader actions={<WalletConnectButton />}>
            <Button variant="outlined" color="secondary">
              {metamask.chainId === '0x1' ? 'Mainnet' : 'Testnet'}
            </Button>
          </AppHeader>
        )
      }
    >
      {connected ? (
        <Box sx={{ margin: '24px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/claim" element={<Cliam />} />
            <Route path="/drive" element={<Drive />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </Box>
      ) : (
        <Welcome />
      )}
    </AppLayout>
  );
}

export default App;
