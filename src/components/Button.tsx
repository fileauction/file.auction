import base from '@/colors/base';
import error from '@/colors/error';
import gray from '@/colors/gray';
import success from '@/colors/success';
import { LoadingButton } from '@mui/lab';
import { ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ForwardedRef, forwardRef, HTMLAttributeAnchorTarget, ReactNode } from 'react';

const OutlinedButtonPalette: {
  [keyof: string]: {
    background: string;
    border?: string;
    color?: string;
  };
} = {
  error: {
    background: error[50],
  },
  success: {
    background: success[50],
  },
  secondary: {
    background: base.white,
    border: gray[300],
    color: gray[800],
  },
};

type ButtonType = Omit<ButtonProps, keyof ButtonProps['color']> & {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  target?: HTMLAttributeAnchorTarget;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  loadingPosition?: 'start' | 'end' | 'center';
};

const ButtonComponent = styled(LoadingButton)<ButtonType>(({ theme, color = 'primary', variant }) => ({
  color: variant === 'outlined' ? OutlinedButtonPalette[color]?.color ?? theme.palette[color].main : undefined,
  boxSizing: 'border-box',
  background: variant === 'outlined' ? OutlinedButtonPalette[color]?.background : undefined,
  borderColor: OutlinedButtonPalette[color]?.border ?? theme.palette[color].main,
  fontWeight: 600,
  '&:hover': {
    borderWidth: '1px',
    borderColor: OutlinedButtonPalette[color]?.border,
  },
}));

const Button = forwardRef((props: ButtonType, forwardRef: ForwardedRef<any>) => {
  if (props.variant === 'contained') {
    return <LoadingButton {...props} ref={forwardRef} />;
  }
  return <ButtonComponent {...props} ref={forwardRef} />;
});

export default Button;
