import { auth } from "@/config/firebase";
import { ApiPromise, ApiResponse, StatusMessageType } from "@/types/network";
import { getBaseApiUrl } from "@/utilities/url";
import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const DEFAULT_API_RESPONSE: ApiResponse<unknown> = Object.freeze({
  code: null,
  payload: { data: {}, meta: {} },
  messages: [
    {
      content: "Request failed. Please check your Internet connection.",
      type: StatusMessageType.ERROR,
    },
  ],
});

const client = axios.create({
  baseURL: getBaseApiUrl(),
});

client.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

class BaseAPI {
  private clientGet<D, M>(
    url: string,
    params?: any,
  ): AxiosPromise<ApiResponse<D, M>> {
    return client.get(url, { params, ...this.getConfig() });
  }

  private clientPost<D, M>(
    url: string,
    data: any = {},
    multipart = false,
  ): AxiosPromise<ApiResponse<D, M>> {
    return client.post(url, data, this.getConfig(multipart));
  }

  private clientPut<D, M>(
    url: string,
    data: any = {},
  ): AxiosPromise<ApiResponse<D, M>> {
    return client.put(url, data, this.getConfig());
  }

  private clientPatch<D, M>(
    url: string,
    data: any = {},
  ): AxiosPromise<ApiResponse<D, M>> {
    return client.patch(url, data, this.getConfig());
  }

  private clientDelete<D, M>(url: string): AxiosPromise<ApiResponse<D, M>> {
    return client.delete(url, this.getConfig());
  }

  /**
   * Performs an asynchronous HTTP GET request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param params The URL parameters to be sent with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected get<D, M>(url: string, params?: any): ApiPromise<D, M> {
    return processRequest(url, this.clientGet(url, params));
  }

  /**
   * Performs an asynchronous HTTP POST request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected post<D, M>(
    url: string,
    data: any = {},
    multipart = false,
  ): ApiPromise<D, M> {
    return processRequest(url, this.clientPost(url, data, multipart));
  }

  /**
   * Performs an asynchronous HTTP PUT request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected put<D, M>(url: string, data: any = {}): ApiPromise<D, M> {
    return processRequest(url, this.clientPut(url, data));
  }

  /**
   * Performs an asynchronous HTTP PATCH request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected patch<D, M>(url: string, data: any = {}): ApiPromise<D, M> {
    return processRequest(url, this.clientPatch(url, data));
  }

  /**
   * Performs an asynchronous HTTP DELETE request to the given URL.
   * @param url The resource upon which to apply the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected delete<D, M>(url: string): ApiPromise<D, M> {
    return processRequest(url, this.clientDelete(url));
  }

  private getConfig(multipart = false) {
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (multipart) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  }
}

function processRequest<D, M>(
  endpoint: string,
  promise: AxiosPromise<ApiResponse<D>>,
): ApiPromise<D, M> {
  return promise
    .then((response: AxiosResponse) => {
      const apiResponse = { code: response.status, ...response.data };
      if (process.env.NODE_ENV === "development") {
        /* tslint:disable-next-line */
        console.info(
          `[API] ${response.status} ${endpoint} : ${getResponseMessages(apiResponse)}`,
        );
      }
      return apiResponse;
    })
    .catch((error: AxiosError) => {
      let apiResponse: ApiResponse<unknown> =
        (error.response?.data as any) ?? DEFAULT_API_RESPONSE;
      const responseCode = error.response?.status ?? null;
      apiResponse = { ...apiResponse, code: responseCode };
      if (process.env.NODE_ENV === "development") {
        /* tslint:disable-next-line */
        console.error(
          `[API] ${responseCode} ${endpoint} : ${getResponseMessages(apiResponse)}`,
        );
      }
      throw apiResponse;
    });
}

function getResponseMessages(response: ApiResponse<any>): string {
  return response.messages?.length > 0
    ? response.messages.map((message) => message.content).join(" : ")
    : "-";
}

export default BaseAPI;
