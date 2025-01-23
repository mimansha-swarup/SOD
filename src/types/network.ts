import { FetchResponseFormat } from "@/constants/network";
import { HTTP_METHOD } from "next/dist/server/web/http";

export interface IRequestConfig extends RequestInit {
  url: string;
  method: `${HTTP_METHOD}`;
  // body: Record<string, unknown>;
  // headers: Record<string, unknown>;
  domain?: string;
  responseType?: `${FetchResponseFormat}`;
}

export interface IBaseFetch {}
