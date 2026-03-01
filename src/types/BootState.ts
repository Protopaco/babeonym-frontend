import type { User } from '@/api/generated';

export type BootState = { status: 'loading' } | { status: 'ready'; user: User } | { status: 'error' };
