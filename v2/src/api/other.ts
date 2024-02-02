import { fecther } from "../utils/tools";

export const getPrizePool = async () => {
  let result = await fecther(`lottery`, {}, "get");
  return Promise.resolve(result.data);
};

export const startLottery = async () => {
  let result = await fecther(`lottery`, {}, "post");
  return Promise.resolve(result);
};

export const checkIsLottry = async () => {
  let result = await fecther(`lottery`, {}, "put");
  return Promise.resolve(result);
};

export const getNoftiy = async () => {
  let result = await fecther(`notify`, {}, "get");
  return Promise.resolve(result.data);
};

export const tickets = async () => {
  let result = await fecther(`ticket`, {}, "get");
  return Promise.resolve(result.data);
};

export const createTicket = async (email: string, content: string, type: string) => {
  let result = await fecther(
    `ticket`,
    {
      email,
      content,
      type,
    },
    "post"
  );
  return Promise.resolve(result);
};
