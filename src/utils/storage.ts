"use client";
type ParamType = {
  fieldName: string;
  value?: unknown;
};
export function setSessionStorage({ fieldName, value }: ParamType) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(fieldName, JSON.stringify(value));
  }
}
export function getSessionStorage({ fieldName }: ParamType) {
  const value = sessionStorage.getItem(fieldName);
  return value ? JSON.parse(value) : null;
}
export function removeSessionStorage({ fieldName }: ParamType) {
  sessionStorage.removeItem(fieldName);
}
