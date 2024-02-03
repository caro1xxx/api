import { HOST } from "./env";
export const fecther = async (path: string, params: any, method: string) => {
  let headers = {
    Authorization: `Bearer ${getStorage("token") ? getStorage("token") : ""}`,
    "Content-Type": "application/json",
  };
  if (method === "get") {
    return fetch(`${HOST}/api/v1/zoommm/` + path, {
      method: method,
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch(`${HOST}/api/v1/zoommm/` + path, {
      method: method,
      body: JSON.stringify(params),
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => data);
  }
};

export const getStorage = (item: string): any => {
  return localStorage.getItem(item);
};

export const setStorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};
