import base from '@/colors/base';
import { AppBar, AppBarProps, Box, Toolbar } from '@mui/material';
import { ReactNode } from 'react';

export type AppHeaderProps = AppBarProps & {
  actions?: ReactNode;
};

export default function AppHeader({ children, actions, sx }: AppHeaderProps) {
  return (
    <AppBar elevation={0} position="static" sx={{ background: base.white }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Box>{actions}</Box>
      </Toolbar>
    </AppBar>
  );
}
