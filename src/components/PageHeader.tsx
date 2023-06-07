import { Box, BoxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

export type PageHeaderProps = BoxProps & {
  mainTitle?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
};

export default function PageHeader(props: PageHeaderProps) {
  const { mainTitle, subtitle, action, sx } = props;

  return (
    <Box sx={{ display: 'flex', minWidth: '580px', ...sx }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mr: '24px' }}>
        <Typography variant="h4" sx={{ mb: '0.25rem' }}>
          {mainTitle}
        </Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Box>
      {action}
    </Box>
  );
}
