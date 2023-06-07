import gray from '@/colors/gray';
import { shortAddress } from '@/utils/address';
import { ErrorOutlined } from '@mui/icons-material';
import { Box, BoxProps, MenuItem, SxProps, Theme, Tooltip, Typography, styled } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import Button from './Button';

export interface DropdownItem {
  icon: ReactNode;
  text: ReactNode;
  onClick: (address: string) => boolean | Promise<boolean>;
}

export type AddressWidgetProps = BoxProps & {
  address?: string;
  name?: string;
  showTooltip?: boolean;
  showCopyButton?: boolean;
  start?: number;
  end?: number;
  monoFont?: boolean;
  startIcon?: ReactNode;
  dropdown?: DropdownItem[];
  variant?: 'button' | 'text';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  textSx?: SxProps<Theme>;
  extra?: ReactNode;
  validator?: (address: string) => boolean;
  onCopy?: (address: string) => void;
};

const DropdownItemContainer = styled(MenuItem)((theme) => ({
  borderRadius: '4px',
  '& .MuiListItemIcon-root': {
    color: gray[700],
    fontSize: '1rem',
  },
  '& .MuiListItemText-root .MuiTypography-root': {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '20px',
    color: gray[700],
  },
}));

export default function AddressWidget(props: AddressWidgetProps) {
  const {
    address,
    name,
    showTooltip = false,
    showCopyButton = false,
    start = 6,
    end = 4,
    monoFont,
    startIcon,
    dropdown,
    variant = 'text',
    disabled = false,
    loading,
    fullWidth,
    extra,
    sx,
    textSx,
    validator = () => {
      return true;
    },
    onCopy,
  } = props;

  const displayText = useMemo(() => {
    return shortAddress(address, start, end);
  }, [address, name, start, end]);

  if (!address || !validator(address)) {
    return <Button startIcon={<ErrorOutlined color="error" />}>Invalid Address</Button>;
  }

  return (
    <>
      <Tooltip title={showTooltip ? address : ''} arrow placement="top">
        {variant === 'button' ? (
          <Button
            startIcon={startIcon}
            sx={{
              fontFamily: monoFont ? "'Noto Sans Mono', monospace" : 'inherit',
              background: disabled ? '#F0F2F3' : 'inherit',
              justifyContent: 'start',
              ...sx,
            }}
            color="secondary"
            variant="outlined"
            loading={loading}
            fullWidth={fullWidth}
          >
            {displayText}
          </Button>
        ) : (
          <Box
            sx={{
              ...sx,
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
            }}
          >
            <Typography
              sx={{
                fontFamily: monoFont ? "'Noto Sans Mono', monospace" : 'inherit',
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: '20px',
                ...textSx,
              }}
            >
              {displayText}
            </Typography>
            {extra}
          </Box>
        )}
      </Tooltip>
    </>
  );
}
