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

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const formattedDate = `20${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const getCurrentTimeStamp = () => {
  return parseInt(new Date().getTime() / 1000 + "");
};

export const getCurrentState = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  return `${currentYear}年0${currentMonth}月`;
};

export const checkData = (
  max: number,
  min: number,
  value: string,
  title: string,
  callback: (msg: string, state: boolean) => void
): boolean => {
  if (value.trim() === "") {
    callback(`请输入${title}`, false);
    return false;
  } else if (value.trim().length < min) {
    callback(`${title}最短${min}位`, false);
    return false;
  } else if (value.trim().length > max) {
    callback(`${title}最长${max}位`, false);
    return false;
  } else return true;
};

export const getTsToYYMMDD = (ts: number) => {
  const date = new Date(ts * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

export const getDateTs = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return Math.floor(new Date(dateStr).getTime() / 1000);
};

export function convertDateToTimestamp(dateString: string) {
  const dateObject = new Date(dateString);
  const timestamp = dateObject.getTime();
  const elevenDigitTimestamp = Math.floor(timestamp / 1000);
  return elevenDigitTimestamp;
}

export const generateRandomNumber = (length: number) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const formatBytes = (bytes: number) => {
  const gigabyte = 1024 * 1024 * 1024;
  const megabyte = 1024 * 1024;
  if (bytes >= gigabyte) {
    return (bytes / gigabyte).toFixed(2) + " GB";
  } else if (bytes >= megabyte) {
    return (bytes / megabyte).toFixed(2) + " MB";
  } else {
    return bytes + " Bytes";
  }
};
