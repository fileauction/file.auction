import { useRematch } from '@/hooks/useRematch';
import { RootDispatch, RootState } from '@/model';
import { useMetaMask } from 'metamask-react';
import { useEffect } from 'react';
import Button from './Button';
import AddressWidget from './AddressWidget';

const mapState = (state: RootState) => ({
  ...state.app,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  ...dispatch.app,
});

export default function WalletConnectButton() {
  const [{ account }, { setFields }] = useRematch(mapState, mapDispatch);

  const metamask = useMetaMask();

  useEffect(() => {
    if (metamask.account) {
      setFields({ account: metamask.account });
    }
  }, [metamask.account]);

  return <AddressWidget variant="button" address={metamask.account || ''} />;
}
