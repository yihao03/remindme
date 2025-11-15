/** Retrieve the base API URL from the current window */

import { ProcessWithEnv } from "@/types/process";

export const getBaseApiUrl = () => {
  const res = `${(process as ProcessWithEnv).env.EXPO_PUBLIC_BACKEND_PROTOCOL}://${
    (process as ProcessWithEnv).env.EXPO_PUBLIC_BACKEND_URL
  }${(process as ProcessWithEnv).env.EXPO_PUBLIC_API_ROUTE}`;
  return res;
};

/** Retrieve the base frontend URL from the current window */
export const getBaseFrontendUrl = () => window.location.origin;
