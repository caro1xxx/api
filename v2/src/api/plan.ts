import { fecther } from "../utils/tools";

export const getPlansToCount = async (count: number, type: string) => {
  let result = await fecther(`plans?count=${count}&type=${type}`, {}, "get");
  return Promise.resolve(result.data);
};

export const getAllPlans = async (count: number) => {
  let result = await fecther(`plans`, {}, "get");
  return Promise.resolve(result.data);
};
