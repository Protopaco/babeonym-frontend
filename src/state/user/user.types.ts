import type { User } from '@/api/generated/models/User';

export type UserState = {
  user: User | null;
};

export type UserAction = { type: 'ADD_USER'; payload: User };
