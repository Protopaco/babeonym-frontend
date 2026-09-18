import { useContext } from 'react';
import { AppLayoutStateContext } from '@/state/appLayoutState/appLayoutState.context';

export const useAppLayoutState = () => {
  const context = useContext(AppLayoutStateContext);
  if (!context) {
    throw new Error('useAppLayoutState must be used inside AppLayoutStateProvider');
  }
  return context;
};
