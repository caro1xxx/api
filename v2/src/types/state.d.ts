export interface TypesPlanItem {
  model: string;
  pk: string;
  fields: {
    title: string;
    time: number;
    price: string;
    icon: string;
    stock: number;
    flow: number;
    giftStartTime: number;
    giftEndTime: number;
    giftAllowDiscount: boolean;
    giftSumCount: number;
    giftCurrentCount: number;
    giftPrice: string;
  };
}

export type FieldType = {
  username?: string;
  password?: string;
  code?: string;
};

export interface Server {
  model: string;
  pk: number;
  loading: boolean;
  fields: {
    name: string;
    local: string;
    magnification: number;
    delay: string;
    load: number;
    ip: string;
    state: boolean;
    disney: boolean;
    netflix: boolean;
    dazm: boolean;
    openai: boolean;
    nodeTag: number;
  };
}
