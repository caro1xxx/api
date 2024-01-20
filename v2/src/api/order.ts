import { fecther } from "../utils/tools";
import md5 from "md5";

export const createOrder = async (planId: string) => {
  let result = await fecther(`order`, { planId }, "post");
  return Promise.resolve(result);
};

export const getOrder = async (planId: string) => {
  let result = await fecther(`order?planId=${planId}`, {}, "get");
  return Promise.resolve(result);
};

export const paymentOrder = async (order: string, method: string, username?: string, password?: string) => {
  let result = await fecther(`order`, { order, username, way: method, password: password && md5(password) }, "put");
  return Promise.resolve(result);
};

export const orderDiscount = async (order: string, code: string) => {
  let result = await fecther(`discount`, { order, code }, "post");
  return Promise.resolve(result);
};
