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
    type: string;
    idx: number;
    nodes: number;
    unlock: boolean;
    systemCount: boolean;
    reset: boolean;
    panel: boolean;
    account: boolean;
    record: boolean;
    welfare: boolean;
  };
}
