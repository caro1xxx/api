import { fecther } from "../utils/tools";
import md5 from "md5";
import { setStorage } from "../utils/tools";

export const authRegister = async (
  username: string,
  password: string,
  msg: any,
  close: () => void,
  save: (token: string) => void,
  code?: string
) => {
  let result = await fecther(`register`, { username, password: md5(password), code }, "post");
  if (result.code === 200) {
    save(result.token);
    setStorage("token", result.token);
    msg.success("Zoom注册成功🥳");
    close();
  } else {
    msg.info(result.message);
  }
};

export const authLogin = async (
  username: string,
  password: string,
  msg: any,
  close: () => void,
  save: (token: string) => void
) => {
  let result = await fecther(`login`, { username, password: md5(password) }, "post");
  if (result.code === 200) {
    save(result.token);
    setStorage("token", result.token);
    msg.success("登录成功🎉");
    close();
  } else {
    msg.info(result.message);
  }
};

export const servers = async () => {
  let result = await fecther(`server`, {}, "get");
  return Promise.resolve(result.data);
};

export const Profile = async () => {
  let result = await fecther(`profile`, {}, "get");
  return Promise.resolve(result);
};

export const AdvancedNode = async () => {
  let result = await fecther(`advanced?sub=true`, {}, "get");
  return Promise.resolve(result);
};

export const inviteList = async () => {
  let result = await fecther(`invite`, {}, "get");
  return Promise.resolve(result);
};

export const ping = async (id: number) => {
  let result = await fecther(`ping?node=${id}`, {}, "get");
  return Promise.resolve(result);
};
