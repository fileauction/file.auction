import gray from '@/colors/gray';
import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import { Cloud, CloudOutlined } from '@mui/icons-material';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { filesize } from 'filesize';
import { useMemo } from 'react';
import Button from './Button';

const mapState = (state: RootState) => ({
  ...state.app,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

export default function AccountStorageInfo() {
  const [{ accountStorage }, { setFields }] = useRematch(mapState, mapDispatch);

  const usedSize = useMemo(() => {
    return filesize(accountStorage.usedSpace, { base: 2 }).toString();
  }, [accountStorage.usedSpace]);

  const totalSize = useMemo(() => {
    return filesize(accountStorage.totalSpace, { base: 2 }).toString();
  }, [accountStorage.totalSpace]);

  const [remainSpace, percentage] = useMemo(() => {
    const remainSpace = filesize(accountStorage.totalSpace - accountStorage.usedSpace, { base: 2 }).toString();
    const percentage = (accountStorage.usedSpace / accountStorage.totalSpace) * 100;
    return [remainSpace, percentage];
  }, [accountStorage.totalSpace, accountStorage.usedSpace]);

  console.log('🚀 ~ file: AccountStorageInfo.tsx:25 ~ totalSize ~ totalSize:', remainSpace, percentage);
  return (
    <Box sx={{ margin: '24px 12px' }}>
      <Stack spacing={1} direction="row" alignItems="center">
        <CloudOutlined />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Storage
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          color: gray[500],
          margin: '12px 0',
        }}
      >
        {usedSize} / {totalSize} Used
      </Typography>
      <LinearProgress value={percentage} variant="determinate" />
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          color: gray[500],
          margin: '12px 0',
        }}
      >
        {percentage.toFixed(1)}% Full - {remainSpace} Free
      </Typography>
      <Button variant="outlined" color="secondary" sx={{ marginTop: '24px' }}>
        Claim More
      </Button>
    </Box>
  );
}
