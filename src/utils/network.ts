import { FetchResponseFormat } from "@/constants/network";
import { IRequestConfig } from "@/types/network";

const getApiDomain = () => {
  const env = process.env.NEXT_PUBLIC_ENV || "production";

  switch (env) {
    case "local":
    default: // in future add prod in default
      return "http://localhost:3000/";
  }
};

export async function baseFetch<T>(requestConfig: IRequestConfig): Promise<T> {
  const {
    url,
    method,
    body,
    headers = {},
    domain = getApiDomain(),
    responseType = FetchResponseFormat.JSON,
  } = requestConfig;

  let config = {
    method,
    body,
    headers: {
      ...headers,
    },
  };

  const requestUrl = `${domain}/${url}`;

  const response = await fetch(requestUrl, config);

  switch (responseType) {
    case FetchResponseFormat.TEXT:
      return response.text() as T;

    case FetchResponseFormat.JSON:
    default:
      return response.json() as T;
  }
}
