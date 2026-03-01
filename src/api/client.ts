// Placeholder API client wrapper
// Replace implementation when OpenAPI client is generated.

// export type ApiClientConfig = {
//   baseUrl: string;
//   withCredentials?: boolean;
// };

// export const createApiClient = (config: ApiClientConfig) => {
//   return {
//     baseUrl: config.baseUrl,
//     withCredentials: config.withCredentials ?? true,
//   };
// };

import { Configuration } from '@/api/generated/runtime';
import { UserApi, AuthApi, ReferenceApi } from '@/api/generated/apis';

const config = new Configuration({
  basePath: import.meta.env.API_BASE_URL, // e.g. http://localhost:3000/
  credentials: 'include',
});

export const userApi = new UserApi(config);
export const authApi = new AuthApi(config);
export const referenceApi = new ReferenceApi(config);
