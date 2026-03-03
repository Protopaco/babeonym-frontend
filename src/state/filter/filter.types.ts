import type { Decade } from '@/api/generated';

export type FilterState = {
  decades: Decade[];
};

export type FilterAction = { type: 'ADD_DECADES'; payload: Decade[] };
