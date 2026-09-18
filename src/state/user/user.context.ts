import { createContext } from 'react';

import type { UserAction } from '@/models/UserAction';
import type { UserState } from '@/models/UserState';

export const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);
