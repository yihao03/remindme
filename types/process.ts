// NOTE: Make sure types are synced and consistent across frontend and backend projects

type HttpProtocol = "http" | "https";

export type Env = {
  BACKEND_PROTOCOL: HttpProtocol;
  EXPO_PUBLIC_BACKEND_URL: string;
  EXPO_PUBLIC_VOLUNTEER_FRONTEND_PROTOCOL: HttpProtocol;
  EXPO_PUBLIC_VOLUNTEER_FRONTEND_URL: string;
  EXPO_PUBLIC_API_ROUTE: string;
  EXPO_PUBLIC_GOOGLE_ANALYTICS_ID: string;
};

declare global {
  interface Process {
    env: Env;
  }
}

export type ProcessWithEnv = NodeJS.Process & {
  env: Env;
};
