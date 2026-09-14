import { createContext } from 'react';
import type { ContextType } from 'react';
import { GivenNameContext } from '@/state/givenName/givenName.context';

// The actions on their own, in a value that never changes. GivenNameContext is
// rebuilt on every state change, so anything reading actions from it re-rendered
// whenever any name state moved — every chip in the approved list included, when
// all a chip needs is its delete.
export const GivenNameActionsContext = createContext<NonNullable<ContextType<typeof GivenNameContext>>['actions'] | undefined>(undefined);
