import PageHeader from '@/components/PageHeader';
import { Box, Button, Stack, Typography } from '@mui/material';

import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import { useNavigate } from 'react-router-dom';

export const mapState = (state: RootState) => ({
  ...state.app,
});

export const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

export default function Cliam() {
  const [{ snackbar }, {}] = useRematch(mapState, mapDispatch);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <PageHeader mainTitle="Claim Free Space" />
      <Stack spacing={2}>
        <Typography>
          PermaBox is a cloud disk based on Permastar Protocol&apos;s permanent storage space, which will start testing
          on June 15, 2023. During the testing period, each account can claim 128GB of free permanent storage space.
          During the testing network, user data will be stored on the IPFS node for quick retrieval, and 540 day storage
          orders will be created with the cooperating Filecoin node, as well as multiple duplicate orders.{' '}
        </Typography>
        <Typography>
          PermaBox performs continuous validity verification on the stored data. During the testing network, sustainable
          access to the data is not guaranteed, but after the data is stored in the Filecoin node, the Filecoin network
          ensures the security of the data.
        </Typography>
        <Typography>
          During the Permastar Protocol testing network, users using PermaBox will receive data points, which can be
          exchanged for Permastar tokens in a certain proportion after the Permastar Protocol is launched. The Permastar
          Protocol main network is planned to be launched in the fourth quarter of 2024. After the main network is
          launched, PermaBox will provide users with stable and reliable commercial services.
        </Typography>
        <Typography>Data integration rules:</Typography>
        <Typography>1024 Data Points can be obtained for every 1G of data stored;</Typography>
        <Typography>1024 Data Points will be deducted for every 1G of data deleted;</Typography>
        <Typography>
          Daily UTC+00 points, integral expansion, integral expansion increase integral=integral before expansion *
          0.5%.
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{ marginTop: '180px', width: 240 }}
        onClick={() => {
          snackbar('You have got 128GB free storage space!');
          navigate('/');
        }}
      >
        Claim
      </Button>
    </Box>
  );
}
