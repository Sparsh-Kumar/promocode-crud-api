export enum PromocodeStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
}

export enum PromotionType {
  PARTY_SHARE = 'PARTY_SHARE',
  GIFT_CARD = 'GIFT_CARD',
}

export interface LooseObject {
  [key: string]: any
}

export type PageDetail = {
  page: number;
  limit: number;
};

export type PaginationDetails = {
  previous?: PageDetail,
  current?: PageDetail,
  next?: PageDetail,
  totalDocs?: number,
};
