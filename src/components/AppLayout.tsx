import gray from '@/colors/gray';
import { Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

export type AppLayoutProps = {
  sidebar: ReactNode;
  appBar?: ReactNode;
  mobileDrawer?: ReactNode;
  mobileBar?: ReactNode;
  children: ReactNode;
  fab?: ReactNode;
};

const AppLayoutContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  '& .content': {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflowY: 'scroll',
    minWidth: '780px',
    background: gray[50],
  },
}));

export default function AppLayout({ sidebar, appBar, mobileBar, fab, children }: AppLayoutProps) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppLayoutContainer sx={{ display: 'flex' }}>
      {!mobile && <Box>{sidebar}</Box>}
      <Box className="content">
        {mobile ? mobileBar : appBar}
        <Box>{children}</Box>
      </Box>
      {fab}
    </AppLayoutContainer>
  );
}
