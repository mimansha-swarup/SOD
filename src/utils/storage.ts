"use client";
export function setSessionStorage({ fieldName, value }) {
  console.log(fieldName, value);
  if (window) {
    sessionStorage.setItem(fieldName, JSON.stringify(value));
  }
}
export function getSessionStorage({ fieldName }) {
  const value = sessionStorage.getItem(fieldName);
  return value ? JSON.parse(value) : null;
}
export function removeSessionStorage({ fieldName }) {
  sessionStorage.removeItem(fieldName);
}
