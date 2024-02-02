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
  if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
};

export const secondsTotimer = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const isIPv6Enabled = () => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 1500);
  });
  const fetchPromise = fetch("https://v6.ip.zxinc.org/getip")
    .then((res) => res.text())
    .then((ipv6) => ipv6);
  return Promise.race([fetchPromise, timeoutPromise]);
};

// export const ipTolocation = () => {
//   return fetch("https://api.bigdatacloud.net/data/client-ip")
//     .then((res) => res.text())
//     .then((value) => {
//       console.log(value);
//       return value;
//     });
// };

export const ping = () => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    var start = new Date().getTime();
    var hasFinish = false;
    img.onload = function () {
      if (!hasFinish) {
        hasFinish = true;
        resolve("proxy");
      }
    };
    img.onerror = function () {
      hasFinish = false;
      isIPv6Enabled()
        .then((ipv6) => {
          resolve("local");
        })
        .catch((err) => {
          resolve("denyIpv6");
        });
    };
    img.src = "https://developers.facebook.com/favicon.ico/?" + start;
    setTimeout(() => {
      if (!hasFinish) {
        isIPv6Enabled()
          .then((ipv6) => {
            resolve("local");
          })
          .catch((err) => {
            resolve("denyIpv6");
          });
      }
    }, 1500);
  });
};

export const timeAgo = (timestamp: number) => {
  const now = new Date().getTime();
  const seconds = Math.floor((now - timestamp) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;

  if (seconds < minute) {
    return "刚刚";
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return `${minutes}分钟之前`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return `${hours}小时之前`;
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return `${days}天之前`;
  } else if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return `${weeks}周之前`;
  } else {
    const months = Math.floor(seconds / month);
    return `${months}月之前`;
  }
};

export const parseJwt = (token: string) => {
  let strings = token.split(".");
  return JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
};
