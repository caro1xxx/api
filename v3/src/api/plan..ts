import { fecther } from "../utils/tools";

export const getPlansToCount = async (type: string) => {
  let result = await fecther(`plans?type=${type}`, {}, "get");
  return Promise.resolve(result.data);
};
