import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { URL as baseURL } from '@/consts/api.consts';
import { ApiResponse, APIRoutes } from '@/typings/api.types';

const cancelTokens: { [key: string]: any } = {};

// ====================================
//       Interceptors
// ====================================
axios.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  if (!requestConfig.url) {
    throw new Error('invalid requestConfig.url');
  }

  const { url } = requestConfig;

  if (url && cancelTokens[url]) {
    cancelTokens[url].cancelToken.cancel('USER_INTERACTION');
    cancelTokens[url] = null;
  }

  const cancelToken = axios.CancelToken.source();
  cancelTokens[url] = { cancelToken, time: Date.now() };

  return requestConfig;
}, (error) => Promise.reject(error));

// ====================================
//       AXIOS init
// ====================================
export const HTTP = axios.create({
  baseURL,
  headers: {
    'X-DevTours-Developer': 'Lars Eichler',
  },
});

// ====================================
//       API Class
// ====================================
export function useApi() {
  // async function post(route: string, params?: object): Promise<ApiResponse> {
  //   const res = await HTTP.post(route, params);
  //
  //   return (res as ApiResponse);
  // }

  async function get(route: string, params?: object): Promise<ApiResponse> {
    const res = await HTTP.get(route, params);

    return (res as ApiResponse);
  }

  function fetchApi(route: string, params?: any): AxiosPromise<void> | null {
    let response: AxiosPromise<void> | null = null;

    const errorPromise = () => new Promise((resolve, reject) => {
      reject(Error(`Route '${route}' not found!`));
      resolve(); // only for linter
    });

    switch (route) {
      // ====================================
      //       Product routes
      // ====================================
      case APIRoutes.GET_LOCATIONS:
        response = get('/api/Location', params) as any;
        break;

      case APIRoutes.GET_HOTELS:
        response = get('/api/Hotel', params) as any;
        break;

      case APIRoutes.GET_AVAILABILITIES:
        response = get('/api/Availabilities', params) as any;
        break;

      // ====================================
      //       DEFAULT: Rejected Promise
      // ====================================
      default:
        response = errorPromise() as any;
        break;
    }

    return response;
  }

  return {
    fetchApi,
  };
}
