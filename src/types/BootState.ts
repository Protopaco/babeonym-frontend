import type { User } from '@/api/generated/models/User';

export type BootState = { status: 'loading' } | { status: 'ready'; user: User } | { status: 'error'; message: string };
