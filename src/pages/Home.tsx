import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, Typography } from '@mui/material';

import FileStatistics from '@/components/dashborad/FileStatistics';
import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import { FILE_STATISTICS_ITEMS } from '@/utils/mockData';
import CountUp from 'react-countup';
import { Download, Upload } from '@mui/icons-material';

export const mapState = (state: RootState) => ({
  ...state.app,
});

export const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

function Home() {
  const [{ snackbar }, {}] = useRematch(mapState, mapDispatch);
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row">
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Data Points" />
          <CardContent>
            <Typography variant="h4" sx={{ padding: '12px', textAlign: 'center' }}>
              <CountUp end={123456} duration={2} />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Welcome to PermaBox</Typography>
                <Typography>
                  PermaBox is a permanent storage Client example based on the Permastart Protocol, "A permanent storage
                  dropbox for the web3 world".
                </Typography>
                <Button sx={{ alignSelf: 'start', mt: '20px' }}>Read More</Button>
              </Box>
              <Box>
                <img src="/logo.png" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Stack>
      <Stack spacing={2} direction="row">
        <Box sx={{ flex: 7 }}>
          <FileStatistics showHeader items={FILE_STATISTICS_ITEMS} />
        </Box>
        <Card sx={{ flex: 3 }}>
          <CardHeader title="Statistics" />
          <CardContent></CardContent>
          <CardActions>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Box sx={{ mx: '8px' }}>
                <Download />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>Downloads</Typography>
                <CountUp end={12594} duration={2} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Box sx={{ mx: '8px' }}>
                <Upload />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>Uploads</Typography>
                <CountUp end={1458} duration={2} />
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Stack>
    </Stack>
  );
}

export default Home;
