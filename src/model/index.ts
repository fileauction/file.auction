import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { app } from './app';

type FullModel = ExtraModelsFromLoading<RootModel, { type: 'full' }>;

export interface RootModel extends Models<RootModel> {
  app: typeof app;
}

export const models: RootModel = {
  app,
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin({ type: 'full' })],
});

export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel & FullModel>;
