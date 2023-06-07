import base from '@/colors/base';
import gray from '@/colors/gray';
import AccountStorageInfo from '@/components/AccountStorageInfo';
import Button from '@/components/Button';
import { AccessTime, Home, RestoreFromTrash, Storage, Upload } from '@mui/icons-material';
import { Box, Divider, InputAdornment, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu, { MenuItem, OnClickItemParams } from './Menu';

export default function AppMenu() {
  const navigate = useNavigate();

  const menus: MenuItem[] = [
    {
      id: '/',
      icon: <Home />,
      title: 'Dashboard',
      onClickItem: (e: OnClickItemParams) => {
        navigate(e.id);
      },
    },
    {
      id: '/drive',
      icon: <Storage />,
      title: 'My Drive',
      onClickItem: (e: OnClickItemParams) => {
        navigate(e.id);
      },
    },
    {
      id: '/recent',
      icon: <AccessTime />,
      title: 'Recent',
      onClickItem: (e: OnClickItemParams) => {
        navigate(e.id);
      },
    },
    {
      id: '/trash',
      icon: <RestoreFromTrash />,
      title: 'Trash',
      onClickItem: (e: OnClickItemParams) => {
        navigate(e.id);
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: base.white,
        height: '100vh',
        padding: '16px',
        maxWidth: '280px',
        minWidth: '280px',
        flexGrow: 1,
        transition: 'all 0.2s ease',
      }}
    >
      <Stack direction="row" alignItems="center">
        <img src="/logo.png" style={{ height: 55 }} />
        <Typography
          sx={{
            marginLeft: '16px',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '20px',
            color: base.black,
          }}
        >
          PermaBox
        </Typography>
      </Stack>
      <Divider sx={{ color: base.white, background: gray[200], margin: '16px 0' }} />
      <Button
        variant="contained"
        sx={{ marginBottom: '16px' }}
        startIcon={
          <InputAdornment position="start">
            <Upload />
          </InputAdornment>
        }
      >
        Upload
      </Button>
      <Box sx={{ flexGrow: 1 }}>
        <Menu items={menus} selectedId="profile" />
      </Box>
      <Divider sx={{ color: base.white, background: gray[200], margin: '16px 0' }} />
      <AccountStorageInfo />
    </Box>
  );
}
