import gray from '@/colors/gray';
import Button from '@/components/Button';
import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import { Box, Divider, Typography, styled } from '@mui/material';
import { useMetaMask } from 'metamask-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '28px',
  lineHeight: '40px',
}));

const Desc = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '25px',
  color: gray[500],
}));

const mapState = (state: RootState) => ({
  ...state.app,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

export default function Welcome() {
  const [{ account }, { setFields }] = useRematch(mapState, mapDispatch);

  const navigate = useNavigate();
  const metamask = useMetaMask();

  useEffect(() => {
    if (metamask.account) {
      setFields({ account: metamask.account });
    }
  }, [metamask.account]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Header sx={{ marginBottom: '20px' }}>Connect your wallet</Header>
      <Desc>Connect PermaBox to get free storage space and earn Data Points!</Desc>
      <Button
        disabled={metamask.status === 'unavailable'}
        onClick={async () => {
          await metamask.connect();
          navigate('/claim');
        }}
        variant="contained"
        sx={{ width: 320, margin: '48px 0' }}
      >
        Connect MetaMask
      </Button>
      <Divider sx={{ background: gray[500], color: gray[500], marginBottom: '40px' }} />
      <Desc>
        Don&apos;t have a wallet? Get started with{' '}
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">
          Metamask
        </a>
      </Desc>
    </Box>
  );
}
