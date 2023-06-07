import { AccountStorage } from '@/types';
import { createModel } from '@rematch/core';
import { EnqueueSnackbar } from 'notistack';
import { RootModel } from '.';

export type AppState = {
  account: string;
  accountStorage: AccountStorage;
  snackbar: EnqueueSnackbar;
};

const initAppState: AppState = {
  account: '',
  accountStorage: {
    totalSpace: 21474836480,
    usedSpace: 13636521164,
  },
  snackbar: () => '',
};

export const app = createModel<RootModel>()({
  state: initAppState,
  reducers: {
    setFields(state, fields: Partial<AppState>): AppState {
      return {
        ...state,
        ...fields,
      };
    },
    setSnackbar(state, snackbar: EnqueueSnackbar) {
      return {
        ...state,
        snackbar,
      };
    },
  },
  effects: (dispatch) => ({}),
});
