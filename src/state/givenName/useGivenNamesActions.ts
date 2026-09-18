import { useContext } from 'react';
import { GivenNameActionsContext } from '@/state/givenName/givenNameActions.context';

// Read from the actions-only context, so a component that only calls actions
// does not re-render when name state changes.
export const useGivenNamesActions = () => {
  const actions = useContext(GivenNameActionsContext);
  if (!actions) {
    throw new Error('useGivenNamesActions must be used inside GivenNamesProvider');
  }
  return actions;
};
